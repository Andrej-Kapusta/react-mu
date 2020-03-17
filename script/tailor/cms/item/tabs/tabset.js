import React, { PureComponent } from "react"
import Tab from "./tab"
import "./style.sass"

export default class Tabset extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            scrolled: false
        }
    }
    handleScroll(event) {
        event.stopPropagation()
        const scrollTop = event.target.scrollTop
        if (this.state.scrolled) {
            if (scrollTop <= 0) {
                this.setState({ scrolled: false })
            }
        } else {
            if (scrollTop > 0) {
                this.setState({ scrolled: true })
            }
        }
    }
    render() {
        const props = this.props

        const tabs = props.children.map((tab, i) => (<Tab key={i} {...tab.props} />))
        const scrolled = this.state.scrolled ? " scrolled" : ""

        return (
            <section className={`panel panel-default tabset ${props.info.tabsPosition} ${props.designInfo}`}>
                <header className={`panel-heading bx_header ${scrolled}`}>
                    <nav>
                        {tabs}
                    </nav>
                </header>
                <article className="panel-body" onScroll={this.handleScroll.bind(this)}>
                    {props.children}
                </article>
            </section>
        )
    }
} 