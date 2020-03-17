import React, { PureComponent } from "react"
import { setDocumentTitle } from "core/proto"

export default class Page extends PureComponent {

    handleTitleChange(props) {
        const info = props.info || {}
        if (info.selected === null) {
            const title = info.title || props.label
            setDocumentTitle(title)
        }
    }

    componentDidMount() {
        this.handleTitleChange(this.props)
    }
    
    componentWillReceiveProps(nextProps) {
        this.handleTitleChange(nextProps)
    }

    render() {
        if (this.props.info.selected === null) {
            return (
                <div className={`${this.props.designInfo}`}>
                    {this.props.children}
                </div>
            )
        } else {
            return null
        }
    }
}