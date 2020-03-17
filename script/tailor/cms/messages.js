import React, {Component} from "react"
import Icon from 'tailor/cms/item/icon'
import Message from 'tailor/cms/message'
// import CSSTransition from 'react-transition-group/CSSTransition'

export default class Messages extends Component{
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages
    }
    this.dismiss = this.dismiss.bind(this)
  }
  componentWillReceiveProps({ messages }) {
    this.setState({ messages })
  }
  dismiss(e) {
    window.blox.messages = []
    this.setState({
      messages: window.blox.messages
    })
  }
  render() {
    const props = this.props

    if (this.state.messages === undefined) {
      return null
    }

    let messages = this.state.messages.map((m, i) => (
        <Message key={i} type={m.type} message={m.message} reasons={m.reasons} />
    ))

    return (
      <div className="message-area" onClick={this.dismiss}>
        {messages}
      </div>
    )
  }
}