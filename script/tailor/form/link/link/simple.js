import React from "react"
import Icon from "tailor/cms/item/icon"
import Action from "tailor/cms/action"

export default (props) => (
    <Action urlContext={props.urlContext} action={["event"]}>
        <Icon name={props.iconName} highlight="true" />
    </Action>
)