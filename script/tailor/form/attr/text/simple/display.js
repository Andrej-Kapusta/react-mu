import React from "react"
import Label from 'tailor/form/attr/label/display'

export default (props) => (
  <Label {...props}>
    <div>{props.value}</div>
  </Label>
)