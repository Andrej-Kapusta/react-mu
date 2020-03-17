import React, {Component} from "react"
import Label from "tailor/form/attr/label/edit"

export default class Select extends Component{
  handleChange() {
    if (this.props.info.onChangeSubmit === true || this.props.info.onChangeSubmit === "1") { // fuck me, still 0/1
      const event = new Event("submit", { bubbles: true })
      this.element.form.action = "/" + this.props.urlContext.join("/")
      
      setTimeout(() => {
        this.element.form.dispatchEvent(event)
      }, 0)
    }
  }
  
  render() {
    let urlContext = this.props.urlContext.join("/")
    return (
      <Label {...this.props}>
        <div>
          <select name={urlContext} className="form-control" onChange={this.handleChange.bind(this)} ref={(el) => { this.element = el } } id={urlContext}>
            {this.props.children}
          </select>
        </div>
      </Label>
    )
  }
}