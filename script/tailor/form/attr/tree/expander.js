import React, {Component} from "react"
import Action from 'tailor/cms/action'
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'

export default class Expander extends Component{
  shouldComponentUpdate(nextProps, nextState) {
    let su = false
    su |= this.props.expandable !== nextProps.expandable
    su |= this.props.expanded !== nextProps.expanded
    return su
  }
  
  render() {
    const props = this.props

    const events = {
      openAll: ["_event", "open_all"],
      closeAll: ["_event", "close_all"]
    }
    
    if (!props.expandable) {
      return <Icon name="expander empty" />
    }
    
    let action
    let iconName
    
    if (!props.expanded) {
      action = events.openAll
      iconName = "expander collapsed"
    } else {
      action = events.closeAll
      iconName = "expander expanded"
    }
    
    return (
      <Action urlContext={props.urlContext} action={action} before={props.beforeAction} tabIndex="-1" className="expander">
        <Icon name={iconName} />
      </Action>
    )
  }
}