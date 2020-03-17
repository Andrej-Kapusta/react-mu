import React from "react"

export default (props) => (
  <option selected={props.selected === null} value={props.id}>
    {props.name}
  </option>
)