import React from "react"

export default ({urlContext, value}) => (
  <input type="hidden" name={urlContext.join("/")} value={value} />
)