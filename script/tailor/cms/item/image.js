import React from "react"

export default (props) => {
    return <img src={"/" + props.imgSrc} className={props.designInfo} alt={props.label} title={props.imageTitle} />
}