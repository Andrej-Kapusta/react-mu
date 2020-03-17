import React, { Component } from "react"
import GoogleLogin from "react-google-login"
import InlineSVG from "svg-inline-react"
import logo from "./google.svg"

export default class GoogleAuth extends Component {
    constructor(props) {
        super(props)
        this.c = null
        this.state = {
            token: ""
        }
    }
    onResponse(response) {
        console.log("Google auth response:", response)
        this.setState({ token: response.tokenId })

        // bleh
        const form = document.forms[0]
        form.action = ["", ...this.props.urlContext, "button", "google", "event"].join("/")
        const e = new Event("submit", { bubbles: true, cancelable: true })
        form.dispatchEvent(e)
    }
    render() {
        return (
            <div>
                <input type="hidden" name={[...this.props.urlContext, "attr", "token"].join("/")} value={this.state.token} />
                <GoogleLogin
                    clientId={this.props.appID}
                    className="btn btn-default btn-block btn-lg google-login-button"
                    onSuccess={this.onResponse.bind(this)}
                    onFailure={this.onResponse.bind(this)}
                >
                    <InlineSVG src={logo} />
                    <span>Prihlásiť sa cez Google</span>
                </GoogleLogin>
            </div>

        )
    }
}