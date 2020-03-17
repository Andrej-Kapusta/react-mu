import React, {Component} from "react"
import Icon from "tailor/cms/item/icon"
import moment from "moment"
import "moment/locale/sk"

export default class Message extends Component{
    render() {
        const props = this.props

        // Name <email@server.org> || email@server.org || Name
        const name = props.sender

        // plain-text
        const subject = props.subject

        // HTML
        const content = props.text

        // mohol by chodiť radšej ako ISO8601
        const timestamp = moment(props.dateTime, "DD.MM.YYYY HH:mm")

        // Possible states:
        //  new, sent, accepted, delivered
        //  rejected, failed, complained
        const state = props.state
    
        // incoming, outgoing 
        const type = props.info.type
    
        // [{name, contentType, content_id, id}]
        const attachments = Object.keys(props.attachments ? props.attachments : {}).map(k => ({...props.attachments[k], id: k}))

        let header = (
            <header>
                <div className="info">
                    <div className="sender">
                    {props.children}<span className="text">{name}</span></div>
                    <div className="timestamp">
                        <div className="relative">{timestamp.fromNow()}</div>
                        <div className="absolute">{timestamp.format("DD.MM.YYYY HH:mm")}</div>
                    </div>
                </div>
            </header>
        )
    
        const footer = (attachments.length > 0) ? (
            <footer>
                <ul>
                    {attachments.map(v => {
                        const filename = v.name
                        return (
                            <li key={filename}>
                                <a href={v.url} target="_blank"><Icon name="a_file" /> {filename}</a>
                            </li>
                        )
                    })}
                </ul>
            </footer>
        ) : null
    
        return (
            <section className={`message ${type}`}>
                {header}
                <div className="content" dangerouslySetInnerHTML={{__html: content}} />
                {footer}
            </section>
        )
    }
}