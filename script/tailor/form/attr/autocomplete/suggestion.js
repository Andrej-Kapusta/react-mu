import React, { Component } from "react"
import Icon from "tailor/cms/item/icon"
import { remove as removeDiacritics } from "diacritics"
import "./style.sass"

export default class Suggestion extends Component {
    constructor(props) {
        super(props)
        this.isNullValue = (props.value === "__null__")
    }
    renderLabel() {
        if (this.props.searchedValue && !this.isNullValue) {
            let {searchedValue, label } = this.props
            searchedValue = removeDiacritics(searchedValue).toLowerCase()
            label = removeDiacritics(label).toLowerCase()

            let index = label.indexOf(searchedValue)
            if (index !== -1) {
                const before = this.props.label.substring(0, index)
                const middle = this.props.label.substring(index, index + searchedValue.length)
                const after = this.props.label.substring(index + searchedValue.length)
                return [before, <span key="highlight" className="highlight">{middle}</span>, after]
            } else {
                return this.props.label
            }
        } else {
            return this.props.label
        }
    }
    render() {
        const { props } = this
        return (
            <div className={"autocomplete-item " + (props.selected ? "selected" : "")} onMouseDown={props.onSelect}>
                {
                    props.iconUrlPrefix && !this.isNullValue
                        ? <img src={props.iconUrlPrefix + "/" + props.value} />
                        : null
                }
                <div className="autocomplete-item-label">
                    {this.renderLabel()}
                </div>
            </div>
        )
    }
}