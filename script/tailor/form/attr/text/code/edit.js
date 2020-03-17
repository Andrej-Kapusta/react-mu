import React from "react"
import Label from "tailor/form/attr/label/edit"
import Editor from "./editor"

export default (props) => (
  <Label {...props}>
    <Editor {...props} />
  </Label>
)