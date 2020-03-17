import React, { Component } from "react"

export default class CaseListRow extends Component {
    
    // constructor(props) {
    //     super(props)

    //     console.log("CaseListRow", this.props)
    // }

    render() {
        return (
            <div className="case-list-row">
                { this.props.children }
            </div>
        )
    }
}