import React, {Component} from "react"
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'

export default class LinkButton extends Component{
  render() {
    let link = this.props.link.replace("%%urlPortal%%", window.blox.ideUrl)
    let title = this.props.link.replace("/%%urlPortal%%/__link", "")
    return (
      <Link url={link} title={title}>
        <Icon name={this.props.iconName} highlight="true" />
      </Link>
    )
  }
}
