import React, {Component} from "react"
import Action from 'tailor/cms/action'
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'
import ActivityIndicator from 'tailor/cms/item/activityIndicator'
import LinkButton from 'tailor/form/attr/tree/nodes/button/link'

export default class NodeButton extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentWillReceiveProps(props) {
    this.setState({loading: false})
    clearTimeout(this.timeoutLock)
  }
  handleAction() {
    this.timeoutLock = setTimeout(() => {
      this.setState({loading: true})
    }, 100)
  }
  render() {
    const icon = this.state.loading ? <ActivityIndicator /> : <Icon name={this.props.iconName} highlight="true" />

    if (typeof this.props.eventUrl === "string") {
      let action = this.props.eventUrl.split("/")
      action.shift() // why is there a key..?
      
      return (
        <Action
          urlContext={this.props.urlContext}
          action={action}
          before={this.handleAction.bind(this)}
          title={this.props.label}
        >
          {icon}
        </Action>
      )

    } if (typeof this.props.link === "string") {
      return (
        <Link url={this.props.link}>
          {icon}
        </Link>
      )
    } else {
      return icon
    }
  }
}
