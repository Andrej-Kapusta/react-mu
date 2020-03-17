import React, {Component} from "react"
import {buildComponentHierarchy} from "core/proto"

export default class ButtonRoot extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      children: []
    }
    
    this.init(props)
  }
  
  async init(props) {
    this.setState({
      children: await this.convertItems(props)
    })
  }
  
  async convertItems(props) {
    const items = props.buttons
    
    let children
    
    if (items) {
      children = await Promise.all(Object.keys(items).map(async (key) => {
        return await buildComponentHierarchy(items[key], key)
      }))
    } else {
      children = []
    }
    
    return children
  }
  
  componentWillReceiveProps(newProps) {
    this.init(newProps)
  }
  
  render() {
    return (
      <span className="tree-node-button-root">
        {this.state.children}
      </span>
    )
  }
  
}