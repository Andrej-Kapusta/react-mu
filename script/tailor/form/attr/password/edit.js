import React, { Component } from "react"
import Label from "tailor/form/attr/label/edit"

export default (props) => (
	<Label {...props}>
		<Password {...props} />
	</Label>
)

export class Password extends Component {
	render() {
		const urlContext = this.props.urlContext.join("/")
		const required = (this.props.info.isRequired === null)
		return (
			<input
				type="password"
				className="form-control"
				placeholder={this.props.placeholder}
				name={urlContext}
				id={urlContext}
			/>
		)
	}
}