import React, {Component} from "react"

export default class SimpleListHeader extends Component {
    render() {
        return <tr>{this.props.children}</tr>
    }    
}