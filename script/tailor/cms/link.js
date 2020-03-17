import React, { PureComponent } from "react"

export default class Link extends PureComponent {
  componentWillReceiveProps() {
    this.submitButton.blur()
  }
  constructor(props) {
    super(props)
    this.submitButton = null
  }

  handleClick(event) {
    // is this a hack?
    this.submitButton.form.action = this.submitButton.formAction

    if (this.props.before) {
      this.props.before.call()
    }
  }

  render() {
    const url = this.props.url

    return (
      <button
        {...this.props}
        className={this.props.className}
        tabIndex="-1"
        tabIndex={this.props.tabIndex}
        type="submit"
        formAction={url}
        ref={el => this.submitButton = el}
        onClick={this.handleClick.bind(this)}
        title={this.props.title}
      >
        {this.props.children}
      </button>
    )
  }
}
