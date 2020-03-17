import React, {PureComponent} from "react"
import Action from 'tailor/cms/action'
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'
import ActivityIndicator from 'tailor/cms/item/activityIndicator'

export default class NodeLine extends PureComponent{
  constructor(props) {
    super(props)
    this.events = {
      select: ["_event", "select"],
      open: ["_event", "open"],
      openAll: ["_event", "open_all"],
      close: ["_event", "close"],
      closeAll: ["_event", "close_all"]
    }

    this.doubleClickActionSelector = "button[title='Edit']"
    this.contextMenuActionSelector = "button[title='Tools']"
  }

  handleDoubleClick(event) {
    event.stopPropagation()

    if (event.currentTarget) {
      let button = event.currentTarget.querySelector(this.doubleClickActionSelector)
      if (button) {
        button.click()
      }
    }
  }

  handleContextMenu(event) {
    event.stopPropagation()
    event.preventDefault()

    if (event.currentTarget) {
      let button = event.currentTarget.querySelector(this.contextMenuActionSelector)
      if (button) {
        button.click()
      }
    }
  }
  
  render () {

    const props = this.props
    const events = this.events
    
    let iconAction = props.isOpen ? events.close : events.open
    iconAction = props.hasChildren ? iconAction : events.select
      
    const iconName = props.isOpen ? props.iconName : (props.iconName + " closed")
    const icon = <Icon className="tree-node-icon" name={iconName} highlight="true" />

    const treeLineClassNames = ["tree-node-header-label", props.designInfo, (props.isSelected ? "bx_selected selected" : "")].join(" ")

    const id = props.id || ""
    const label = props.label || ""
    const separator = (props.id && props.label) ? "|" : ""

    
    return (
      <span className={treeLineClassNames} tabIndex="0"
        onDoubleClick={this.handleDoubleClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        <Action urlContext={props.urlContext} action={iconAction} tabIndex="-1" className="icon">
          {icon}
        </Action>
        <Action urlContext={props.urlContext} action={events.select} tabIndex="-1">
          <span className="key" dangerouslySetInnerHTML={{__html: id}}></span>
          <span className="separator">{separator}</span>
          <span className="name" dangerouslySetInnerHTML={{__html: label}}></span>
        </Action>
        {props.children}
      </span>
    )
  }
}
