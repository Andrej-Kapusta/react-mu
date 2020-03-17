import React, { Component, PureComponent } from "react"
import Logs from "tailor/logs/logs"
import LoadingScreen from "tailor/loadingScreen"
import { collectFormData, makeRequest, applyPatch, buildComponentHierarchy, setDocumentTitle } from "core/proto"
import Store from "core/Store"
import Messages from 'tailor/cms/messages'

import "./bigBrother"

import "../../style/sass/themeLight.css"
import "../../style/sass/icon.css"
import "../../style/sass/main.sass"

export default class Application extends Component {
  constructor(props) {
    super(props)

    this.formElement = null
    this.overlay = null

    this.state = {
      tailorTree: this.props.initialTailorTree,
      componentHierarchy: <LoadingScreen />,
      logs: "",
      forceShowLogs: false
    }

    this.lastHistoryState = null
    this.scrollTimeout = null

    this.init()
  }

  async init() {
    const componentHierarchy = await buildComponentHierarchy(this.props.initialTailorTree)
    this.setState({ componentHierarchy })
  }

  componentDidMount() {
    window.history.scrollRestoration = "manual"

    const url = document.location.pathname
    window.history.replaceState({ url, title: null }, "", url)

    window.addEventListener("popstate", this.handlePopState.bind(this))

    window.addEventListener("scroll", (e) => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }
      this.scrollTimeout = setTimeout(() => {
        if (window.history.state) {
          window.history.replaceState({ ...window.history.state, scrollPosition: [window.scrollX, window.scrollY] }, "", window.history.state.url)
        }
      }, 750)
    })
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    RSoD(error)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("! App updated")
    if (!this.lastHistoryState) {
      return
    }

    const scrollPosition = this.lastHistoryState.scrollPosition
    if (scrollPosition) {
      window.scroll(...scrollPosition)
    }
  }

  showOverlay() {
    if (this.overlay) {
      this.overlay.show()
    }
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.hide()
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const url = event.target.action
    this.makeRequest(url)
  }

  handlePopState(event) {
    if (event.state) {
      // console.log("pop state", event.state)
      const url = event.state.url
      this.makeRequest(url, event.state)
    }
  }

  // this should be merged with makeRequest from "core/proto"
  async makeRequest(url, state = undefined) {
    // fuj!
    window.blox.messages = []

    this.showOverlay()

    const data = collectFormData()
    data.append("ajaxRequest", "true")
    data.append("sessionId", window.blox.sessionId)

    Store.getEntries().forEach(([key, value]) => {
      // console.log(key, value)
      data.append(key, value)
    })

    Store.clear()

    // makeRequest(url, data) // but with additional params

    let response
    try {
      response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        body: data
      })
    } catch (e) {
      this.hideOverlay()
      console.error(e)
      window.location.reload(true)
      return
    }

    this.handleResponse(response, state)
  }

  async handleResponse(response, state) {
    const separator = window.blox.responseSeparator

    const document = this.processHeaders(response.headers)
    this.handleDocumentProperties(document, state)

    const textResponse = await response.text()
    let [payload, logs] = textResponse.split(separator)

    try {
      payload = JSON.parse(payload)
    } catch (e) {
      console.warn(e)
      this.setState({
        logs: payload,
        forceShowLogs: true
      })
      this.hideOverlay()
      // RSoD(e)
      return
    }

    let tailorTree

    // payload is either array of diff operations or whole tailorTree
    if (Array.isArray(payload)) {
      tailorTree = applyPatch(this.state.tailorTree, payload)
    } else {
      tailorTree = payload
    }

    let componentHierarchy = await buildComponentHierarchy(tailorTree)

    this.setState({
      tailorTree,
      componentHierarchy,
      logs,
      forceShowLogs: false
    })

    this.hideOverlay()
  }

  processHeaders(responseHeaders) {
    let title = responseHeaders.get("documentTitle")
    let url = responseHeaders.get("documentUrl")

    return { title, url }
  }

  handleDocumentProperties(newState, stateFromPopEvent) {
    const oldState = this.lastHistoryState

    // console.log("newState", newState)
    // console.log("oldState", oldState)
    // console.log("currentState", window.history.state)
    // console.log("state from popEvent", stateFromPopEvent)
    // console.log("lastHistoryState", this.lastHistoryState)

    // nemám novú URL -> nerobiť nič
    if (!newState.url) {
      // console.log("nemám novú URL -> nerobiť nič")
      return
    }

    // nemám starý stav -> nový stav
    if (!oldState) {
      // console.log("nemám starý stav -> nový stav")
      window.history.pushState(newState, "", newState.url)
      this.lastHistoryState = {
        ...window.history.state,
        ...newState,
        //scrollPosition: [0, 0]
      }
      return
    }

    // rovnaká URL -> vymením stav
    if (newState.url === oldState.url) {
      // console.log("rovnaká URL -> vymením stav")
      window.history.replaceState(newState, "", newState.url)
      this.lastHistoryState = newState
      return
    }

    // navigácia cez históriu -> vymením stav
    if (stateFromPopEvent) {
      // console.log("navigácia cez históriu -> vymením stav")
      window.history.replaceState(newState, "", newState.url)
      this.lastHistoryState = {
        ...stateFromPopEvent,
        ...newState
      }
      // console.log(this.lastHistoryState)
      return
    }

    // iná URL -> nový stav
    // console.log("iná URL -> nový stav")
    window.history.pushState(newState, "", newState.url)
    window.scroll(0, 0)
    this.lastHistoryState = newState
    return
  }

  render() {
    return (
      <div>
        <Overlay ref={(component) => this.overlay = component} />
        <form className="main" method="post" ref={el => this.formElement = el} onSubmit={this.handleSubmit.bind(this)}>
          {this.state.componentHierarchy}
        </form>
        <Messages messages={window.blox.messages} />
        <Logs data={this.state.logs} forceShow={this.state.forceShowLogs} />
      </div>
    )
  }
}

class Overlay extends PureComponent {
  constructor(props) {
    super(props)
    this.element = null
  }
  componentDidMount() {
    const s = this.element.style
    s.display = "none"
    s.position = "fixed"
    s.top = 0
    s.left = 0
    s.right = 0
    s.bottom = 0
    s.cursor = "wait"
    s.zIndex = 100
  }
  show() {
    this.element.style.display = "block"
  }
  hide() {
    this.element.style.display = "none"
  }
  render() {
    return (
      <div className="overlay" ref={(el) => { this.element = el }} />
    )
  }
}