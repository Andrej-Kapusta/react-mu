import React, { Component } from "react"
import classNames from "classnames"
import InlineSVG from "svg-inline-react"

import { submitForm } from "core/proto"
import Link from "tailor/cms/link"

import icon from "./icon.svg"

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.navbar = null
        this.state = {
            collapsed: true
        }
    }
    toggleNavbar(event) {
        this.setState(previousState => ({
            collapsed: !previousState.collapsed
        }))
    }
    render() {
        const children = this.props.children

        const items = children.map((p, i) => {
            const subPages = p.props.children.filter(sp => sameTailorPaths(sp.props.tailorPath, p.props.tailorPath))
            let subitems = []

            if (subPages.length !== 0) {
                subitems = (
                    <DropDownMenu>
                        {
                            subPages.map((sp, j) => (
                                <MenuItem key={j} {...sp.props} onSelect={this.toggleNavbar.bind(this)} children={[]} />
                            ))
                        }
                    </DropDownMenu>
                )
            }

            return (<MenuItem key={i} {...p.props} onSelect={this.toggleNavbar.bind(this)}>{subitems}</MenuItem>)
        })

        let urlContext = this.props.urlContext || []
        let brandLink = (urlContext.length > 0)
            ? ["", ...this.props.urlContext].join("/")
            : "/"

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" onClick={this.toggleNavbar.bind(this)} data-toggle="collapse" data-target="#mainNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="navbar-brand">
                            <InternalLink urlContext={urlContext} url={brandLink} onClick={this.toggleNavbar.bind(this)}>
                                <InlineSVG src={icon} /> Sťažovateľ
                            </InternalLink>
                        </div>
                    </div>
                    <div className={`navbar-collapse ${this.state.collapsed ? "collapse" : ""}`}>
                        <ul className="nav navbar-nav">
                            {items}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


class DropDownMenu extends Component {
    render() {
        return (
            <ul className="dropdown-menu">
                {this.props.children}
            </ul>
        )
    }
}

class MenuItem extends Component {
    constructor(props) {
        super(props)
        this.node = null
        this.timeoutLock = null
        this.state = {
            open: false,
            hasChildren: (props.children.length !== 0),
            selected: props.info.selected === null
        }
        this.onClickOutside = this.onClickOutside.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            hasChildren: (nextProps.children.length !== 0),
            selected: nextProps.info.selected === null
        })
    }
    componentWillMount() {
        if (this.state.hasChildren === true) {
            document.addEventListener("click", this.onClickOutside, false)
        }
    }
    componentWillUnmount() {
        if (this.state.hasChildren === true) {
            document.removeEventListener("click", this.onClickOutside, false)
            if (this.timeoutLock) {
                clearTimeout(this.timeoutLock)
            }
        }
    }
    onClickOutside(event) {
        if (this.state.open && !this.node.contains(event.target)) {
            this.timeoutLock = setTimeout(() => {
                this.setState({
                    open: false
                })
            }, 100)
        }
    }
    onClick(event) {
        if (this.state.hasChildren) {
            this.setState({ open: !this.state.open })
        }
    }
    render() {
        const props = this.props

        const classes = classNames({
            "dropdown": this.state.hasChildren,
            "open": this.state.hasChildren && this.state.open,
            "active": this.state.selected
        })

        let linkUrl = ["", ...props.urlContext].join("/")
        linkUrl = props.linkUrl ? props.linkUrl : linkUrl

        return (
            <li className={classes}>
                {
                    this.state.hasChildren
                        ?
                        <a ref={el => this.node = el} onClick={this.onClick.bind(this)}>
                            {props.label}
                            <span className="caret" />
                        </a>
                        :
                        <InternalLink
                            urlContext={props.urlContext}
                            url={linkUrl}
                            onClick={this.props.onSelect}
                        >
                            {props.label}
                        </InternalLink>
                }
                {props.children}
            </li>
        )
    }
}

function sameTailorPaths(a1, a2) {
    return (a1.length === a2.length && a1.every((v, i) => v === a2[i]))
}

class InternalLink extends Component {
    onClick(event) {
        event.preventDefault()

        if (typeof this.props.onClick === "function") {
            this.props.onClick()
        }

        const urlContext = this.props.urlContext || []
        submitForm(urlContext)
    }
    render() {
        return (
            <a href={this.props.url} onClick={this.onClick.bind(this)}>{this.props.children}</a>
        )
    }
}