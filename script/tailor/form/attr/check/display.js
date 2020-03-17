import React from "react"
import Label from 'tailor/form/attr/label/display'

export default (props) => (
  <Label {...props}>
    <div>
      <input type="checkbox" checked={(props.value === true || props.value === 1 || props.value === "1")} />
    </div>
  </Label>
)