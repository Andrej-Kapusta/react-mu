import React, {Component} from "react"
import Label from "tailor/form/attr/label/edit"
import {collectFormData, makeRequest} from "core/proto"
import Suggestion from "./suggestion"

export default (props) => (
    <Label {...props} messages={props.children}>
        <Autocomplete {...props} />
    </Label>
)

class Autocomplete extends Component{
    constructor(props) {
        super(props)
        this.url = ["", ...props.urlContext, "_ajax", "_event", "getProposals"].join("/")
        this.searchUrlContext = [...this.props.urlContext, "search"].join("/")
        this.valueUrlContext = [...this.props.urlContext, "value"].join("/")
        this.element = null
        this.containerElement = null
        this.noResultsText = props.noResultsText || "Žiadne výsledky" // should come from server
        this.initialState = {
            searchedValue: this.props.valueText,
            selectedOption: {
                label: this.props.valueText,
                value: this.props.value
            },
            suggestions: [],
            loading: false,
            hasFocus: false,
            cursorAtIndex: -1
        }
        this.state = {...this.initialState}
    }
    onFocus(event) {
        this.setState({ hasFocus: true })
        this.getSuggestions(this.state.searchedValue)
        if (this.props.designInfo.includes("scrollOnFocus")) {
            this.containerElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
        
    }
    onBlur(event) {
        this.setState({ hasFocus: false })
    }
    onKeyDown(event) {
        const count = this.state.suggestions.length
        const cursor = this.state.cursorAtIndex

        switch (event.key) {
            case "Enter":
                if (!this.state.selectedOption) {
                    event.preventDefault()
                    this.selectSuggestion(cursor)
                }
                break
            case "Escape":
                event.preventDefault()
                this.reset()
                break
            case "Delete":
            case "Backspace":
                if (this.state.selectedOption) {
                    event.preventDefault()
                    this.reset({
                        searchedValue: "",
                        selectedOption: null,
                        hasFocus: true
                    })
                }
                break
            case "ArrowDown":
                this.setCursor((cursor + 1) % count)
                break
            case "ArrowUp":
                this.setCursor((cursor + count - 1) % count)
                break
            default:
                break
        }
    }
    async onChange(event) {
        const value = event.target.value
        this.getSuggestions(value)
    }
    async getSuggestions(value) {
        this.setState({
            loading: true,
            searchedValue: value,
            selectedOption: null
        })

        const params = collectFormData()
        const data = JSON.parse(await makeRequest(this.url, params))

        var suggestions = data

        // handle ugly tailorTree response
        if (!Array.isArray(data)) {
            suggestions = data.i.map(s => ({
                label: s.p.label,
                value: s.p.value
            }))
        }

        this.setState({
            suggestions,
            loading: false,
            cursorAtIndex: -1
        })
    }
    selectSuggestion(index) {
        index = this.state.suggestions.length === 1 ? 0 : index
        const candidate = this.state.suggestions[index]
        const selectedOption = candidate ? candidate : null

        if (selectedOption) {
            this.setState({
                selectedOption,
                searchedValue: selectedOption.label,
                hasFocus: false
            })

            if (this.props.refreshOnChange === "1") { // fuck me, still 0/1

                const event = new Event("submit", { bubbles: true, cancelable: true })
                const url = ["", ...this.props.urlContext, this.props.refreshEvent].join("/")
                this.element.form.action = url
                setTimeout(() => {
                   this.element.form.dispatchEvent(event)
                }, 0)
            }
        }

    }
    setCursor(cursorAtIndex) {
        this.setState({cursorAtIndex})
    }
    reset(additionalState) {
        this.setState({...this.initialState, ...additionalState})
    }
    render() {
        const selectedOption = this.state.selectedOption
        const suggestions = this.state.suggestions

        const displayedValue = selectedOption ? selectedOption.label : this.state.searchedValue
        const currentValue = selectedOption ? selectedOption.value : "__null__"

        const suggestionList = suggestions.map((s, i) => (
            <Suggestion
                key={s.value}
                {...s}
                selected={i === this.state.cursorAtIndex}
                onSelect={this.selectSuggestion.bind(this, i)}
                iconUrlPrefix={this.props.iconURLPrefix}
                searchedValue={this.state.searchedValue}
            />)
        )

        let content = null

        if (this.state.hasFocus) {
            if (this.state.searchedValue !== "" && suggestions.length === 0) {
                content = <div className="text-muted text-center">{this.props.noResultsText}</div>
            } else if (suggestions.length > 0) {
                content = suggestionList
            }
        }

        let children = content ? <div className="autocomplete-list">{content}</div> : null

        return (
            <div className="autocomplete-container" ref={el => this.containerElement = el}>
                <input
                    ref={el => this.element = el}
                    type="text"
                    placeholder={this.props.placeholder}
                    name={this.searchUrlContext}
                    value={displayedValue}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
                    onChange={this.onChange.bind(this)}
                    className="form-control"
                    autoComplete="off"
                    spellCheck="false"
                />
                <input
                    type="hidden"
                    name={this.valueUrlContext}
                    value={currentValue}
                />
                <div className="autocomplete-suggestions">
                    {children}
                </div>
            </div>
        )
    }
}