import React, {PureComponent} from "react"

export default class Icon extends PureComponent{
  render() {
    let name = this.props.name || ""
    let highlight = this.props.highlight

    if (name === "") {
      return null
    }

    if (name && !name.startsWith("bx_")) {
      name = "bx_" + name
    }
    
    let classnames = "bx_icon " + name + (highlight ? " hl":"") + " " + (this.props.className || "")
    
    if (highlight) {
      return <i className={classnames}><i></i></i>
    } else {
      return <i className={classnames}></i>
    }
  }
}