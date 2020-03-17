import React, {Component} from "react"

export default class Checkbox extends Component{
  constructor(props) {
    super(props)
    this.state = {
      value: (this.props.value === true || this.props.value === 1 || this.props.value === "1") ? 1 : 0
    }
  }
  
  handleChange(event) {
    const values = {
      false: 0,
      true: 1
    }
    
    this.setState({
      value: values[event.target.checked]
    })
    
    if (this.props.info.onChangeSubmit === true || this.props.info.onChangeSubmit === "1") { // fuck me, still 0/1
      const event = new Event("submit", { bubbles: true })
      this.element.form.action = "/" + this.props.urlContext.join("/")
      
      setTimeout(() => {
        this.element.form.dispatchEvent(event)
      }, 0)
    }
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({
      value: (newProps.value === true || newProps.value === 1 || newProps.value === "1") ? 1 : 0
    }) 
  }
  
  render() {
    let id = this.props.urlContext.join("/")

    return (
        <td>
          <input type="hidden" name={id} value={this.state.value} />
          <input type="checkbox" checked={this.state.value === 1} onChange={this.handleChange.bind(this)} id={id} ref={(el) => { this.element = el } } />
        </td>
    )
  }
}