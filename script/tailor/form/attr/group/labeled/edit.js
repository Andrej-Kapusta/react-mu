import React from "react"

export default (props) => (
    <fieldset>
        <legend>{props.label}</legend>
        {props.children}
    </fieldset>
)