import React from "react"
import Button from "tailor/form/button/ajaxDisplay"

export default (props) => {
    if (props.children.length === 0) {
        return <Button {...props} action={["modal"]} />
    } else {
        return props.children
    }
}