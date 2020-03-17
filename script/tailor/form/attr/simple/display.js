/*

  Issues:
    * urlContext is missing or as a string

*/

import React from "react"
import Label from 'tailor/form/attr/label/display'

export default (props) => {
  return (<Label {...props}>
    <div>{props.value}</div>
  </Label>)
}