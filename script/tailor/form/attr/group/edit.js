import React from "react"

export default (props) => (
  <div className={`form-horizontal ${props.designInfo}`}>
    {props.children}
  </div>
)