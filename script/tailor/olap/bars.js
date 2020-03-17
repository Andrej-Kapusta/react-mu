import React, {Component} from "react"

export default class Bars extends Component{
	render() {
	  const fillColor = this.props.fillColor || "lightgray"
	  
		const unitWidth = (this.props.values.length > 0) ? (this.props.width / this.props.values.length) : this.props.width
		const minValue = Math.min(...this.props.values)
		const maxValue = Math.max(...this.props.values, 0.000001)
		
		const rects = this.props.values.map((v, i) => {
		  console.log(v, maxValue)
		  const props = {
		    x: i * unitWidth,
		    y: 0,
			  height: (v / maxValue) * this.props.height,
			  width: 2,
			  rx: 2,
			  ry: 2,
			  fill: fillColor
		  }
			
		  return (
		    <rect {...props} />
		  )
		})

		return (
			<svg height={this.props.height} width={this.props.width}>
				{rects}
			</svg>
		)
	}
}