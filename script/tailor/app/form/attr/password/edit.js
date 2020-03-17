import React, {Component} from "react"
import Label from "tailor/form/attr/label/edit"
import { Password } from "tailor/form/attr/password/edit"
import Icon from "tailor/cms/item/icon"

export default (props) => (
    <Label {...props} messages={props.children}>
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
            <Icon name="lock" />
        </span>
        <Password {...props} />
      </div>
    </Label>
  )