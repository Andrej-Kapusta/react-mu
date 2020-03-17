import React, {Component} from "react"
import Icon from 'tailor/cms/item/icon'

export default class Tab extends Component{
  onClick(event) {
    event.preventDefault()
    const tabContent = this.getAssociatedTabContent(this.props.urlContext)
    tabContent.scrollIntoView({
      block: "start",
      behavior: "smooth"
    })
  }

  getAssociatedTabContent(urlContext) {
    const query = `[data-url-context="${this.props.urlContext.join("/")}"]`
    const tabContent = document.querySelector(query)
    if (tabContent) {
      return tabContent
    } else {
      console.log(":(")
    }
  }

  render() {
    let designInfo = this.props.designInfo || ""
    designInfo += this.props.selected ? " active" : ""
    let className = "tab " + designInfo
    const icon = this.props.iconName ? <Icon name={this.props.iconName} highlight="true" /> : null
    
    return (
      <a className={className}>
        <button type="submit" onClick={this.onClick.bind(this)}>
            {icon}
            <span>{this.props.name}</span>
        </button>
      </a>
    )
  }
}