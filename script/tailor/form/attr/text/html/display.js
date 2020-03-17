import React from "react"
import Label from 'tailor/form/attr/label/display'
import Text from 'tailor/cms/item/text'

export default (props) => (
  <Label {...props}>
    <Text text={props.value} />
  </Label>
)