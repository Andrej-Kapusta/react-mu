import React, { Component, PureComponent } from "react"
import Label from "tailor/form/attr/label/edit"
import { submitForm } from "core/proto"
import Option from "./option"
import "./style.sass"

import { buildComponentHierarchy } from "core/proto"

export default class Radio extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    async componentWillReceiveProps(nextProps) {
        const message = await buildComponentHierarchy(nextProps.info.error)
        const messages = message ? [message] : []
        this.setState({ messages })
    }
    render() {
        return (
            <Label {...this.props} messages={this.state.messages}>
                {
                    this.props.designInfo.includes("mini")
                        ? <Dropdown {...this.props} />
                        : <RadioButtonGroup {...this.props} />
                }
            </Label>
        )
    }
}

class RadioButtonGroup extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
        this.element = null
    }
    onSelect(id, value) {
        this.setState({ value })

        if (this.props.info.onChangeSubmit === true) {
            submitForm(this.props.urlContext, this.props.refreshEvent, this.element.form)
        }
    }
    render() {
        const children = this.props.children.map((option, i) => (
            <Option
                key={option.props.id}
                {...option.props}
                selected={this.state.value === option.props.id}
                onSelect={this.onSelect.bind(this, i, option.props.id)}
            />
        ))
        return (
            <div>
                <input ref={el => this.element = el} type="hidden" name={this.props.urlContext.join("/")} value={this.state.value} />
                <div className="btn-group">
                    {children}
                </div>
            </div>
        )
    }
}

class Dropdown extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            value: props.value,
            valueLabel: props.valueLabel
        }
    }
    onSelect(id, value, props, event) {
        event.preventDefault()

        this.setState({
            value,
            valueLabel: props.name,
            open: false
        })

        if (this.props.info.onChangeSubmit === true) {
            submitForm(this.props.urlContext, this.props.refreshEvent, this.element.form)
        }
    }
    toggle(event) {
        event.preventDefault()

        this.setState((prevState, props) => ({
            open: !prevState.open
        }))
    }
    render() {
        const open = this.state.open

        const children = this.props.children.map((option, i) => (
            <DropdownItem
                key={option.props.id}
                {...option.props}
                selected={this.state.value === option.props.id}
                onSelect={this.onSelect.bind(this, i, option.props.id, option.props)}
            />
        ))

        const label = this.state.value ? this.state.valueLabel : <EmotionPickerLabel />

        return (
            <div className={`dropdown ${open ? "show" : ""}`}>
                <button
                    className="btn btn-default dropdown-toggle"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={`${open ? "true" : "false"}`}
                    onClick={this.toggle.bind(this)}
                >
                    {label}
                </button>
                <input ref={el => this.element = el} type="hidden" name={this.props.urlContext.join("/")} value={this.state.value} />
                <ul className={`dropdown-menu ${open ? "show" : ""}`}>
                    <li className="dropdown-header">{this.props.label}</li>
                    { children }
                </ul>
            </div>
        )
    }
}

const EmotionPickerLabel = (props) => (
    <div className="emotion-picker-label">
        <span className="plus">+</span>
        <span className="smiley">😀</span>
    </div>
)

class DropdownItem extends PureComponent {
    render() {
        return (
            <li className={this.props.selected ? "active" : ""}>
                <a className="dropdown-item" href="" onClick={this.props.onSelect}>{this.props.name}</a>
            </li>
        )
    }
}