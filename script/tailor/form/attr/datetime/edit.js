import React, {Component, PureComponent} from "react"
import Label from "tailor/form/attr/label/edit"
import DateTime from "react-datetime"
import moment from "moment"
import "moment/locale/sk"
import "./style.sass"

export default class DateTimePicker extends Component{
    constructor(props) {
        super(props)

        this.state = {
            value: moment(props.value),
            min: moment(props.min),
            max: moment(props.max)
        }

        this.onChange = this.onChange.bind(this)
        this.isValidDate = this.isValidDate.bind(this)
    }
    onChange(value) {
        if (value instanceof moment) {
            this.setState({ value })
        }
    }
    componentWillReceiveProps(props) {
        const value = moment(props.value)
        this.setState({ value })
    }
    isValidDate(current) {
        let valid = true

        if (this.props.min) {
            valid &= current.isSameOrAfter(this.state.min)
        }

        if (this.props.max) {
            valid &= current.isSameOrBefore(this.state.max)
        }

        return valid
    }
    render() {
        const messages = this.props.children
        const placeholder = this.props.placeholder || this.props.label
        return (
            <Label {...this.props} messages={messages}>
                <DateTime
                    renderInput={DatetimeInputField}
                    defaultValue={this.state.value}
                    dateFormat={this.props.format}
                    timeFormat={false}
                    locale={this.props.locale}
                    onChange={this.onChange}
                    closeOnSelect={true}
                    isValidDate={this.isValidDate}
                />
                <input type="hidden" name={this.props.urlContext.join("/")} value={this.state.value.format()} />
            </Label>
        )
    }
}

const DatetimeInputField = (props, openCalendar) => {
    return (
        <div className={props.className} onClick={openCalendar}>{props.value}</div>
    )
}