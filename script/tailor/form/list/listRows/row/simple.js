import React, { Component } from "react"

export default class SimpleListRow extends Component {
    render() {
        return (
            <tr>{this.props.children}</tr>
        )
    }
}