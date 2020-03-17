import React from "react"
import Icon from "tailor/cms/item/icon"

export default (props) => {
  const messageTypes = ["success", "info", "warning", "error"]
  const alertTypes = ["success", "info", "warning", "danger"]
  const icons = ["ok-circ", "info", "alert", "close-circ"]

  const index = messageTypes.indexOf(props.type)
  const alertType = alertTypes[index]
  const iconName = icons[index]

  const reasons = props.reasons || []

  return (
    <section className={`notification alert alert-${alertType}`}>
      <Icon name={iconName} />
      <span>{props.message}</span>
      {
        <ul>
          { reasons.map((r, i) => <li key={i}>{r}</li>) }
        </ul>
      }
    </section>
  )
}