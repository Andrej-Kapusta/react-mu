import React, {Component} from "react"
import ReactDOM from "react-dom"

export default class Modal extends Component{
    constructor(props) {
        super(props)
        this.el = document.createElement("div")
    }
    componentDidMount() {
        document.body.appendChild(this.el)
    }
    componentWillUnmount() {
        document.body.removeChild(this.el)
    }
    render() {
        const backdropStyle = {
            backgroundColor: "rgba(0,0,0,0.5)",
            overflow: "scroll"
        }
        const modalStyle = {
            display: "block",
            overflow: "visible",
            position: "static"
        }
        const modal = (
            <div className="modal-backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.label}</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )

        return ReactDOM.createPortal(modal, this.el)
    }
}