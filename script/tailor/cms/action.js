import React, {PureComponent} from "react"
import Link from "tailor/cms/link"

export default class Action extends PureComponent{
  render() {
    const props = this.props
    // if (!props.urlContext || props.urlContext.length === 0 || !props.action || props.action.length === 0) {
    //   console.error(`Action needs "urlContext" and "action". Props:`, props)
    //   return (
    //     <div style={{backgroundColor: "red"}}>
    //       {props.children}
    //     </div>
    //   )
    // }

    const urlPath = ["", ...props.urlContext, ...props.action]

    return (
      <Link
        {...props}
        className={props.className}
        tabIndex={props.tabIndex}
        url={urlPath.join("/")}
        before={props.before}
        title={props.title}
      >
        {props.children}
      </Link>
    )
  }
}
