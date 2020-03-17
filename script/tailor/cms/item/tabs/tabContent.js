import React from "react"

export default ({ designInfo, info, children }) => {

    let classNames = [designInfo]
    if (info.type && info.type.selected === null) {
        classNames.push("tab-active")
    }

    return (
        <div className={classNames.join(" ")}>
            {children}
        </div>
    )
}