import React from "react"
import Link from 'tailor/cms/link'
import Icon from 'tailor/cms/item/icon'

export default (props) => {
  let children = React.Children.map(props.children, child => {
    const isPartOfPath = child.props.info && (child.props.info.isSubNodeSelected === null || child.props.info.isSelected === null)
    return (isPartOfPath ? React.cloneElement(child, {mode: props.mode}) : null)
  })
  
  if (props.info.isRoot === null) {
    return (
      <li className="path-segmennt">
        <ol className="path-succesors">
          {children}
        </ol>
      </li>
    )
  }
  
  return (
    <li className="path-segmennt">
      <div className="path-node">
        <span className="path-separator">/</span>
        <span className="path-key">{props.params.key || ""}</span>
        {props.nodeLink
          ? (
              <span className="path-link">
                <Link url={props.nodeLink}>
                  <Icon name="arrow1_right" />
                </Link>
              </span>
            )
          : null}
      </div>
      <ol className="path-succesors">
        {children}
      </ol>
    </li>
  )
}