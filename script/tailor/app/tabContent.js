import React, {Component} from "react"
import Icon from 'tailor/cms/item/icon'

export default class TabContent extends Component{
  render() {
    const icon = this.props.iconName ? <Icon name={this.props.iconName} highlight="true" /> : null

    let style = {
      flex: 1,
    }

    const refFn = this.props.refFn || (() => null)
    
    return (
      <div style={style} ref={refFn} data-url-context={this.props.urlContext.join("/")}>
          {icon} <span>{this.props.name}</span>
          <div style={{paddingLeft: "2em", borderTop: "1px solid lightgray"}}>
            {this.props.children}
          </div>
      </div>
    )
  }
}