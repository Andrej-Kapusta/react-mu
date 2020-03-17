import React, {Component} from "react"

export default class Link extends Component{
  render() {
    return <td><span  className="btn-group">{this.props.children}</span></td>
  }
}