import React from "react"
import Action from "tailor/cms/action"

export default ({ urlContext }) => {
    return (
        <div style={{textAlign: "center"}}>
            <span>Nemáte účet? </span>
            <Action urlContext={urlContext} action={["signUp"]} className="btn-link">Zaregistrujte sa</Action>
            <br />
            <Action urlContext={urlContext} action={["reset"]} className="btn-link">Zabudli ste heslo?</Action>
        </div>
    )
}