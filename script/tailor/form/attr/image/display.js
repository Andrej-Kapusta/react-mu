import React from "react"
import Label from "tailor/form/attr/label/display"

export default (props) => {

  let source = ""

  if (props.sourceUrl) {
    // source = "/" + props.sourceUrl
    source = ["", ...props.urlContext, "_image"].join("/")
  } else if (props.inlineData) {
    source = `data:${props.mimeType};base64,${props.inlineData}`
  }

  return (
    <Label {...props}>
      <div>
      <img class="img-responsive" alt="No image" src={source} />
      </div>
    </Label>
  )
}