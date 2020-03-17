import React, { Component } from "react"

export default class Unknown extends Component {
  render() {
    const tailorPath = this.props.tailorPath.join("/")
    console.warn(`Tailor "${tailorPath}" not found. Props:`, this.props)

    return (
      <div className="alert alert-danger">
        <div className="text-danger">Tailor "{tailorPath}" not found!</div>
        <pre>
          {
            JSON.stringify({
              params: this.props.params,
              info: this.props.info
            }, null, 2)
          }
        </pre>
        <div>{this.props.children}</div>
      </div>
    )
  }
}