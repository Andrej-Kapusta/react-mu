import React from "react"
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'

export default (props) => {
    let primary = (props.info && (props.info.selected === null)) ? "btn-primary" : ""
    const icon = props.iconName ? <Icon name={props.iconName} highlight="true" /> : null
    
    return (
      <Link className={`btn btn-default ${primary} ${props.designInfo}`} url={props.link}>
          {icon}
          {props.label}
      </Link>
    )
}