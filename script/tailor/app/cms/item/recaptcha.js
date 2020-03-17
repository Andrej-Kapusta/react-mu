import React, { PureComponent } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default class ReCaptcha extends PureComponent {
    static defaultProps = {
        sitekey: ""
    }
    state = {
        token: ""
    }
    onChange = (token) => {
        this.setState({ token })
    }
    render() {
        const style = {
            display: "flex",
            justifyContent: "center"
        }

        return (
            <div style={style}>
                <ReCAPTCHA
                    sitekey={this.props.sitekey}
                    onChange={this.onChange}
                />
                <input type="hidden" name={[...this.props.urlContext, "token"].join("/")} value={this.state.token} />
            </div>
        )
    }
}