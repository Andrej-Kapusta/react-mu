import React, { Component } from "react"
import Statistics from "./stats"
import "./style.sass"

export default class Logs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      transformedData: this.transform(props.data),
      minimal: true
    }

    this.regex = /@((?:\/[_a-zA-Z0-9]+)+)(?:\[((?:\/[_a-zA-Z0-9]+)+)\])?\.([_a-zA-Z0-9]+)((?:\/[_a-zA-Z0-9]+)+)?(?:.{5,15}?line:.{6}(\d+).{6}column:.{6}(\d+))?/g;
  }

  clickableReferences(logs) {
    if (logs === undefined) {
      return ""
    }

    const alteredLogs = logs.replace(this.regex, function (match, module, parent, operation, constraint, line, column) {
      let url = "/"
      let link = ""
      url += window.blox.ideUrl || "blox-platform/ide/app"
      url += "/__link/code"
      url += parent ? parent : (module ? module : "")
      url += operation ? ("/__/oper/" + operation) : ""
      url += constraint ? constraint : ""
      url += (line && column) ? ("/code/" + line + "/" + column) : ""

      link += module ? module : ""
      link += parent ? "[" + parent + "]" : ""
      link += operation ? ("." + operation) : ""
      link += constraint ? constraint : ""
      link += (line && column) ? (" on line: " + line + " column: " + column) : ""

      return "<a href=\"" + url + "\" target=\"_blank\">" + link + "</a>"
    });

    return alteredLogs
  }

  componentDidMount() {
    const el = document.querySelector("body > #bloxPageLog")
    if (el) {
      const logs = el.outerHTML
      this.setState({
        data: logs,
        transformedData: this.transform(logs)
      })
      el.outerHTML = ""
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data !== "") {
      this.setState({
        data: newProps.data,
        transformedData: this.transform(newProps.data)
      })
    }

    if (newProps.forceShow === true) {
      if (this.state.minimal === true) {
        this.setState({
          minimal: false
        })
      }
    }
  }

  transform(data) {
    let transformedData = data
    transformedData = this.clickableReferences(data)
    return transformedData
  }

  handleClick(event) {
    this.setState({
      minimal: !this.state.minimal
    })
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.setState({
        minimal: true
      })
    }
  }

  /*
   
   Ako by to malo fungovať:
    * kým si používateľ nevyžiada logy, tak nie sú ani v DOM-e
    * keď si ich vyžiada, tak sa vyrenderujú a "prídu" zospodu
    * keď ich skryje, tak ostávajú v DOM-e, t.j. scroll position ostáva (všetok stav ostáva)
    * keď si ich znovu vyžiada, dostane to čo mal
    * keď ich znovu skryje a spraví nový request, cyklus sa opakuje
   
  */

  render() {
    // console.log("Render logs...", this.state.data && this.state.data.substring(0, 20))

    let logs
    if (this.state.minimal) {
      logs = <div id="logs" />
    } else {
      logs = <div id="logs" className="visible" dangerouslySetInnerHTML={{ __html: this.state.transformedData }} />
    }

    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown.bind(this)}>
        {logs}
        <div onClick={this.handleClick.bind(this)}>
          <Statistics logs={this.state.data} />
        </div>
      </div>
    )
  }
}