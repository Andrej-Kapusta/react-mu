import React, { Component } from "react"
import FacebookLogin from "react-facebook-login"
import Icon from "tailor/cms/item/icon"
import Action from "tailor/cms/action"
import "./style.sass"
import InlineSVG from "svg-inline-react"
import logo from "./facebook.svg"

export default class FacebookAuth extends Component {
    constructor(props) {
        super(props)
        this.c = null
        this.state = {
            token: ""
        }
    }
    onResponse(response) {
        console.log("FB auth response:", response)
        this.setState({ token: response.accessToken })

        // bleh
        const form = document.forms[0]
        form.action = ["", ...this.props.urlContext, "button", "facebook", "event"].join("/")
        const e = new Event("submit", { bubbles: true, cancelable: true })
        form.dispatchEvent(e)
    }
    render() {
        return (
            <div>
                <input type="hidden" name={[...this.props.urlContext, "attr", "token"].join("/")} value={this.state.token} />
                <FacebookLogin
                    ref={c => this.c = c}
                    appId={this.props.appID}
                    autoLoad={false}
                    textButton={<span>Prihlásiť sa cez Facebook</span>}
                    fields="email"
                    fields="name,email"
                    cssClass="btn btn-default btn-block btn-lg fb-login-button"
                    containerStyle={{display: "block"}}
                    icon={<InlineSVG src={logo} />}
                    onClick={(e) => { }}
                    disableMobileRedirect={true}
                    callback={this.onResponse.bind(this)}
                />
            </div>
        )
    }
}