/*

Improvements:
  * possibly rewrite buildComponentHierarchy to be iterative
    * recursion is slower 
    * possibility of stack-overflow because of missing tail-call optimization
      * that would be one motherfucking tailorTree giant! :D

*/

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import patch from "json-touch-patch"
import SmoothScroll from "smoothscroll-polyfill"

import Application from "tailor/application"
import FormDataPolyfill from "./FormData"

SmoothScroll.polyfill()

// This should be the main (and only) way of communicating with the server.
// Currently <Application /> rolls own implementation.
export async function makeRequest(url, data) {
  data.append("ajaxRequest", "true")

  let response
  try{
    response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      body: data
    })
  } catch (e) {
    RSoD(e)
  }

  const separator = window.blox.responseSeparator
  const textResponse = await response.text()
  let [payload, logs] = textResponse.split(separator)

  // what to do with logs?
  // also <Application/> needs access to headers

  return payload
}

export function collectFormData() {
  let data = new FormData()
  document.querySelectorAll("form").forEach(form => {
    let formData = new FormDataPolyfill(form)
    for(const pair of formData.entries()) {
      data.append(pair[0], pair[1])
    }
  })
  return data
}

export async function buildComponentHierarchy(tailorTree, key) {
  if (!tailorTree) {
    return
  }
  // tailor tree is minified by following translation table:
  let urlContext  = tailorTree.u || []
  let tailorPath  = tailorTree.t || ["unknown"]
  let params      = tailorTree.p || {}
  let info        = tailorTree.f || {}
  let items       = tailorTree.i || []

  // messages are accumulated into stack outside
  if (tailorTree.m) {
    if (window.blox.messages) {
      window.blox.messages = [...window.blox.messages, ...tailorTree.m]
    } else {
      window.blox.messages = tailorTree.m
    }
  }

  // sometimes the tailorTree protocol is broken (items are wrapped), so handle it
  if (!tailorTree.hasOwnProperty("t") && !tailorTree.hasOwnProperty("i")) {
    tailorPath = ["uselessWrapper"]
    items = Object.keys(tailorTree).map(key => tailorTree[key])
  }

  let module
  
  try {
    module = await import("tailor/" + tailorPath.join("/"))
  } catch (e) {
    console.error(e)
    module = await import("tailor/unknown")
    // RSoD(e)
  }
  
  const Type = module.default
  const children = await Promise.all(items.map(buildComponentHierarchy))
  
  const component =  (
    <Type
      {...params}
      key={key}
      urlContext={urlContext}
      tailorPath={tailorPath}
      info={info}
      params={params}
      
      __originalTailorTree__={tailorTree}
    >
      {children}
    </Type>
  )
  
  // This could be probably done via loader, so _all_ component instances
  // can have proper path as a name, not only those loaded through buildComponentHierarchy function.
  // Learn more: https://github.com/ModuleLoader/es-module-loader/blob/0.17/docs/loader-extensions.md

  try{
    component.type.displayName = tailorPath.join(".")
  } catch(e) { /* pass */ }
  
  return component
}

export function applyPatch(object, patches) {
  try {
    return patch(object, patches, { strict: true })
  } catch (e) {
    RSoD(e)
  }
}

export function start() {
  const element = document.getElementById("FlatCircle")
  const component = (
    <AppContainer>
      <Application initialTailorTree={window.blox.initialTailorTree} />
    </AppContainer>
  )

  ReactDOM.render(component, element)

  if (module.hot) {
    module.hot.addStatusHandler(status => {
      if (status === "idle") {
        const Application = require("../tailor/application").default;
        const element = document.getElementById("FlatCircle");
        ReactDOM.render(
          <AppContainer>
            <Application />
          </AppContainer>,
          element
        );
      }
    })
  }
}

export function setDocumentTitle(title) {
  window.document.title = title
}

export function submitForm(urlContext, event = [], form = document.forms[0]) {
  const e = new Event("submit", { bubbles: true, cancelable: true })
  const url = ["", ...urlContext, event].join("/")
  form.action = url

  setTimeout(() => {
      form.dispatchEvent(e)
  }, 0)
}