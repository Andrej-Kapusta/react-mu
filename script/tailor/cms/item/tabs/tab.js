import React, { Component } from "react"
import Icon from "tailor/cms/item/icon"
import Action from "tailor/cms/action"
import ActivityIndicator from "tailor/cms/item/activityIndicator"

export default class Tab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }

        this.events = {
            select: ["_event", "select"]
        }
    }

    handleAction(event) {
        this.timeoutLock = setTimeout(() => {
            this.setState({ loading: true })
        }, 100)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ loading: false })
        clearTimeout(this.timeoutLock)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let su = false
        su |= (nextState.loading !== this.state.loading)
        su |= (nextProps.__originalTailorTree__ !== this.props.__originalTailorTree__)
        return su
    }

    render() {
        let className = this.props.designInfo
        className += (this.props.info.type.selected === null ? " active tab" : " tab")
        const icon = this.props.iconName ? (this.state.loading ? <ActivityIndicator /> : <Icon name={this.props.iconName} highlight="true" />) : null

        return (
            <a className={className}>
                <Action urlContext={this.props.urlContext} action={this.events.select} before={this.handleAction.bind(this)}>
                    {icon}
                    <span>{this.props.label}</span>
                </Action>
            </a>
        )
    }
}

