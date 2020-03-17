import React from "react"

export default (props) => (
  <div className={`form-vertical ${props.designInfo}`}>
    {props.children}
  </div>
)