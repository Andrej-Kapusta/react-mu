import React from "react"
import Button from "tailor/form/button/simple"

export default ({ urlContext, message, state, text }) => {
    urlContext = urlContext || ["nie", "je", "urlContext"]
    message = message || "Nechajte nám svoj e-mail a budeme Vás informovať o novinkách"
    const verificationEmailSent = (state === "verification")
    
    if (verificationEmailSent) {
        message = text
    }

    const form = (
        <form className="form-inline col-md-8 col-md-offset-2">
            <div className="input-group">
                <input name={[...urlContext, "email"].join("/")} type="email" className="your-email form-control" placeholder="email@kontakt.sk" />
                <span className="input-group-btn">
                    <Button urlContext={urlContext} action={["send"]} label="Odoslať" />
                </span>
            </div>
        </form>
    )

    return (
        <section className="medium row text-center newsletter">
            <h3>{message}</h3>
            { !verificationEmailSent && form }
        </section>
    )
}