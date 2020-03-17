import React from "react"
import Label from 'tailor/form/attr/label/display'
import Editor from './editor.js'

export default (props) => {
  return (
    <Label {...props} info={{...props.info, hideLabel: false}}>
      <Editor {...props} readOnly={true} />
    </Label>
  )
}