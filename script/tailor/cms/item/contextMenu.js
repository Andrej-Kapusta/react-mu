import React, {Component} from "react"
import Action from 'tailor/cms/action'
import Icon from 'tailor/cms/item/icon'

export default class ContextMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
      visible: this.props.visible
    }
    this.element = null
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }
  
  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick)
  }
  
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick)
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({
      visible: newProps.visible
    })
  }
  
  hide() {
    this.setState({ visible: false })
  }
  
  show() {
    this.setState({ visible: true })
  }
  
  handleOutsideClick(e) {
    if (!this.element.contains(e.target)) {
      this.hide()
    }
  }
  
  render() {
    const content = (
      <ul className="dropdown-menu" style={{display: "block"}}>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "copy"]}>
            <Icon name="btn-copy" highlight="true" /> Copy
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "copy_all"]}>
            <Icon name="btn-copy public" highlight="true" /> Copy all
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "duplicate"]}>
            <Icon name="pages" highlight="true" /> Duplicate
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "paste_into"]}>
            <Icon name="arrow2_down" highlight="true" /> Paste into
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "paste_over"]}>
            <Icon name="cut" highlight="true" /> Paste over
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "paste_subnodes"]}>
            <Icon name="a_tree_root" highlight="true" /> Paste subnodes
          </Action>
        </a></li>
        <li><a>
          <Action urlContext={this.props.urlContext} action={["event", "delete_subnodes"]}>
            <Icon name="no-entry" highlight="true" /> Delete subnodes
          </Action>
        </a></li>
      </ul>
    )
    
    return (
      <div ref={ el => { this.element = el }}>
        {this.state.visible ? content : null}
      </div>
    )
  }
}