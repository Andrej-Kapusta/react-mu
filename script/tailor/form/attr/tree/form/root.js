import React, {Component} from "react"
import {buildComponentHierarchy} from "core/proto"
import ActivityIndicator from 'tailor/cms/item/activityIndicator'

export default class FormRoot extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      children: []
    }
    
    this.init(props)
  }
  
  async init(props) {
    this.setState({
      children: await this.convertItem(props)
    })
  }
  
  async convertItem(props) {
    const item = props.form
    let child
    if (item) {
      child = await buildComponentHierarchy(item, "mu")
      return [child]
    } else {
      return []
    }
  }
  
  componentWillReceiveProps(newProps) {
    this.init(newProps)
  }
  
  render() {
    if (this.state.children.length === 0) {
      return null 
    } else {
      return (
        <div className="tree-node-form-root">
          {this.state.children}
        </div>
      )  
    }
  }
  
}