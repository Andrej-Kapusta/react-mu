import React, {Component} from "react"

export default class ReplyForm extends Component{
    render() {
        return (
            <div className="ReplyForm">
                {this.props.children}
            </div>
        )
    }
}