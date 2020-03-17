import React, { Component } from "react"

export default class CaseList extends Component {

    // constructor(props) {
    //     super(props)

    //     console.log("CaseList", this.props)
    // }

    render() {
        return (
            <div className="case-list">
                { this.props.children }
            </div>
        )
    }
}