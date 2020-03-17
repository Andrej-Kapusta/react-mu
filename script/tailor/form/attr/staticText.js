import React from "react"

export default (props) => (
	<p className={`well alert-info ${props.designInfo}`}>{props.message}</p>
)
