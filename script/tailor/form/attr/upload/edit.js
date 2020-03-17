import React from "react"
import Label from 'tailor/form/attr/label/edit'

export default (props) => {
  let id = props.urlContext.join("/")
  return (
    <Label {...props}>
      <div>
        <input type="file" name={id} id={id} className="form-control" />
      </div>
    </Label>
  )
}