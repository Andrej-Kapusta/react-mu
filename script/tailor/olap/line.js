import React, {Component} from "react"

export default class Line extends Component{
	render() {
	  let fillColor = this.props.fillColor || "lightgray"
	  let strokeColor = this.props.strokeColor || "darkgray"
	  
		const unitWidth = (this.props.values.length > 0) ? (this.props.width / this.props.values.length) : this.props.width;
		const minValue = Math.min(...this.props.values);
		const maxValue = Math.max(...this.props.values, 0.000001);

		let pointsArray = [];

		pointsArray.push(0 + "," + this.props.height);

		for (let i = 0; i < this.props.values.length; i++) {
			const x = i * unitWidth;
			const y = (1 - (this.props.values[i] / maxValue)) * this.props.height;
			pointsArray.push(x + "," + y);
		}
		
		pointsArray.push((this.props.values.length - 1) * unitWidth + "," + this.props.height);

		const points = pointsArray.join(" ");

		return (
			<svg height={this.props.height} width={this.props.width}>
				<polyline fill={fillColor} stroke={strokeColor} points={points} />
			</svg>
		)
	}
}