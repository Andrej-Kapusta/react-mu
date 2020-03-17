import React, {Component} from "react"

export default class Link extends Component{
  render() {
    return <th>{this.props.children}</th>
  }
}