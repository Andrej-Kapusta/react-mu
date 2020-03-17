import React, {Component} from "react"
import Link from 'tailor/cms/link'

export default class Form extends Component{
  render() {
    const props = this.props

    let action = (props.info && props.info.defaultFormAction) || null
    action = action ? ("/" + action) : null
    
    return (
      <form action={action} className={props.designInfo}>
        {action ? <Link url={action} /> : null}
        {props.children}
      </form>  
    )
  }
}