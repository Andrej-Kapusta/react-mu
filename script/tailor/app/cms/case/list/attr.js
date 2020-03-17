import React, { Component } from "react"
import Icon from "tailor/cms/item/icon"
import moment from "moment"
import "moment/locale/sk"
import "./style.sass"

export default class CaseListAttribute extends Component {
    render() {
        return (
            <div className={`${this.props.state}`}>
                <section className="image">
                    <img src={ this.props.companyLogoURL } alt={"Logo – " + this.props.company}/>
                </section>
                <section className="details">
                    <div className="company">{ this.props.company }</div>
                    <div className="subject">{ this.props.subject }</div>
                    <div className="number">
                        <span className="hash">#</span> <span>{ this.props.caseNumber }</span>
                    </div>
                    <div className="issueDate">
                        <Icon name="while" /> <span>{ moment(this.props.createdAt).fromNow() }</span>
                    </div>
                    <div className="status">{ this.props.stateLabel }</div>
                </section>
            </div>
        )
    }
}