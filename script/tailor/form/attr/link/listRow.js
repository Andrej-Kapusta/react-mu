import React, {PureComponent} from "react"

export default class Link extends PureComponent{
  render() {
    return (
      <td>
        {this.props.value}
      </td>
    )
  }
}