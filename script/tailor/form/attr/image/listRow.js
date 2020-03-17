import React from "react"

export default (props) => (
  <td>
    <img class="img-thumbnail" alt="No image" src={["", ...props.urlContext, "_image"].join("/")} />
  </td>
)