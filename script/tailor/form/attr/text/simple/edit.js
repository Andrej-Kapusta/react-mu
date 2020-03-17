import React, { Component } from "react"
import Label from "tailor/form/attr/label/edit"
import Store from "core/Store"

export default (props) => (
  <Label {...props} messages={props.children}>
    <TextEdit {...props} />
  </Label>
)

class TextEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }
  update(value) {
    this.setState({ value })
    Store.update(this.props.urlContext, value)
  }
  handleChange(event) {
    this.update(event.target.value)
  }
  componentWillReceiveProps(newProps) {
    this.update(newProps.value)
  }
  render() {
    const urlContext = this.props.urlContext.join("/")
    const required = (this.props.info.isRequired === null)
    return (
      <textarea
        name={urlContext}
        value={this.state.value}
        placeholder={this.props.label}
        onChange={this.handleChange}
        className="form-control"
        id={urlContext}
      />
    )
  }
}