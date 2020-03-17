import React from "react"
import Icon from 'tailor/cms/item/icon'
import Action from 'tailor/cms/action'

export default ({urlContext, label, info, iconName, designInfo, children}) => {
  
  let labelElement
  if (info && info.hideLabel && info.hideLabel === true) {
    return (
      <div className="form-group">
        {children}
      </div>
    )
  } else {
    labelElement = <label>{label}</label>
  }
  
  let icon = iconName ? <Icon name={iconName} /> : null

  return (
    <div className={`form-group ${designInfo}`}>
      <div className="form-label">
        <Action urlContext={urlContext} action={["_event", "clickLabel"]}>
          {icon}
          {labelElement}
        </Action>
      </div>
      {children}
    </div>
  )
}