import React, { PureComponent } from "react"
import Icon from "tailor/cms/item/icon"
import Action from "tailor/cms/action"
import "./style.sass"

export default class Button extends PureComponent {
    render() {
        const isPrimary = (this.props.info && (this.props.info.selected === null))
        let primaryClass = isPrimary ? "btn-primary" : ""
        const icon = this.props.iconName ? <Icon key="icon" name={this.props.iconName} highlight="true" /> : null
        const label = <span key="label">{this.props.label}</span>
        let event = this.props.action || ["event"]
        const designInfo = this.props.designInfo || ""

        let content = [
            icon,
            label
        ]

        // možno radšej cez flexbox order?
        if (designInfo.includes("icon-right")) {
            content.reverse()
        }

        return (
            <Action urlContext={this.props.urlContext} action={event} className={`btn btn-default ${primaryClass} ${designInfo}`}>
                {content}
            </Action>
        )
    }
}