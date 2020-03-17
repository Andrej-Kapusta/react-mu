import React, { Component } from "react"

export default class Option extends Component {
    render() {
        return (
            <div className={`btn btn-default ${this.props.selected ? "active" : ""}`} onClick={this.props.onSelect}>
                {this.props.name}
            </div>
        )
    }
}