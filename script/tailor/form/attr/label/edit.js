import React, { PureComponent } from "react"

export default class Label extends PureComponent {
  constructor(props) {
    super(props)
    this.element = null
  }
  componentWillReceiveProps(nextProps) {
    const hasMessages = nextProps.messages && (nextProps.messages.length > 0)
    if (hasMessages) {
      this.element.parentNode.scrollIntoView({ behavior: "smooth" })
    }
  }
  render() {
    const props = this.props

    const hideLabel = props.info && (props.info.hideLabel === null || props.info.hideLabel === true)
    const required = props.info && (props.info.isRequired === null || props.info.isRequired === true)

    const designInfo = props.designInfo || ""
    const hasMessages = (props.messages && props.messages.length !== 0)

    const urlContext = props.urlContext.join("/")
    const requiredClass = required ? "required" : ""

    const label = <label className={requiredClass} htmlFor={urlContext}>{props.label}</label>
    const icon = props.iconName ? <Icon name={props.iconName} /> : null

    return (
      <div ref={el => this.element = el} className={`form-group ${hideLabel ? "noLabel" : ""} ${designInfo}` + (hasMessages ? " has-error" : "")}>
        <div className="form-label control-label">
          { label }
        </div>
        <div>
          {props.children}
          <div className="control-label form-message">
            {props.messages || null}
          </div>
        </div>
      </div>
    )
  }
}