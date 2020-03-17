import React from "react"
import Label from 'tailor/form/attr/label/edit'
import Button from 'tailor/form/button/ajaxDisplay'
import Action from 'tailor/cms/action'

export default (props) => {
  const fileName = props.linkUrl.split("'")[1].split("/").pop() // ugh
  const url = ["", ...props.urlContext, "preview", fileName].join("/")
  return (
    <Label {...props}>
      <div>
        <a href={url}>{props.linkLabel}</a>
        <Button urlContext={props.urlContext} action={["change"]} iconName="" label={props.buttonLabel} />
      </div>
    </Label>
  )
}
