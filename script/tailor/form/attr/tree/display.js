import React, {Component} from "react"
import Label from 'tailor/form/attr/label/display'
import "./style.sass"

export default class DisplayTree extends Component{
  render() {
    return (
      <Label {...this.props}>
        <div>
          <ol className="path">
            {React.Children.map(this.props.children, child => (
              React.cloneElement(child, {mode: "display"})
            ))}
          </ol>
        </div>
      </Label>
    )
  }  
}