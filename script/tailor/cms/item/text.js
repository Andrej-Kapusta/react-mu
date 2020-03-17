import React from "react"

export default ({text, designInfo}) => (
  <div className={designInfo} dangerouslySetInnerHTML={{__html: text}}></div>
)