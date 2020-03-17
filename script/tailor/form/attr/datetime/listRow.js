import React from "react"
import moment from "moment"
import "moment/locale/sk"

export default (props) => (
    <td>{moment(props.value).format(props.format)}</td>
)