import React, {Component} from "react"

export default class PickerLine extends Component{
  render() {
    // return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>{this.props.children}</div>
    return <div className="picker-line">{this.props.children}</div>
  }
}