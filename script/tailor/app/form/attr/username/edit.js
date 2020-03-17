import React, {Component} from "react"
import Label from "tailor/form/attr/label/edit"
import { TextInput } from "tailor/form/attr/simple/edit"
import Icon from "tailor/cms/item/icon"

export default (props) => (
    <Label {...props} messages={props.children}>
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
            <Icon name="user" />
        </span>
        <TextInput {...props} />
      </div>
    </Label>
  )