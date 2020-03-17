import React, { Component } from "react"
import "./style.sass"

export class Item extends Component {
    constructor(props) {
        super(props)
        this.element = null
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            this.focus(0)
        }
    }
    componentDidMount() {
        this.focus(0)
    }
    focus(delay = 100) {
        setTimeout(() => {
            //this.element.parentNode.scrollIntoView({behavior: "smooth", block: "start"})
            window.scroll({ top: 0 /*, behavior: "smooth" */ })
        }, delay)
    }
    render() {
        const selected = (this.props.selected === "1" ? "active" : "")

        return (
            <div ref={(el) => { this.element = el }} className={`step ${selected}`}>
                {this.props.name}
            </div>
        )
    }
}

export const Container = ({ children }) => (
    <div className="steps container">{children}</div>
)