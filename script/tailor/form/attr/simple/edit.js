import React, { PureComponent } from "react"
import Label from "tailor/form/attr/label/edit"
import Store from "core/Store"

export default (props) => (
  <Label {...props} messages={props.children}>
    <TextInput {...props} />
  </Label>
)

export class TextInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ""
    }
    Store.update(props.urlContext, this.state.value)
  }
  update(value) {
    this.setState({ value })
    Store.update(this.props.urlContext, value)
  }
  handleChange(event) {
    this.update(event.target.value)
  }
  componentWillReceiveProps(newProps) {
    this.update(newProps.value || "")
  }
  render() {
    const urlContext = this.props.urlContext.join("/")
    const required = (this.props.info.isRequired === null)
    return (
      <input
        type="text"
        name={urlContext}
        value={this.state.value}
        placeholder={this.props.label}
        onChange={this.handleChange.bind(this)}
        className="form-control"
        id={urlContext}
      />
    )
  }
}