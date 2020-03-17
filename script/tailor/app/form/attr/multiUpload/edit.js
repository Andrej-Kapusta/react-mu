import React, { Component } from "react"
import Label from "tailor/form/attr/label/edit"
import Icon from "tailor/cms/item/icon"
import filesize from "filesize"
import "./styles.sass"

import Store from "core/Store"

export default (props) => (
    <Label {...props} messages={props.children}>
        <MultiUpload {...props} />
    </Label>
)

function formatSize(size) {
    return filesize(size, { base: 10 })
}

const obj2arr = (obj) => Object.keys(obj ? obj : {}).map(k => ({ ...obj[k], id: k }))

class MultiUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMessage: false,
            files: obj2arr(props.files),
            dropZoneVisible: false
        }

        this.lastTarget = null

        this.onDragOver = this.onDragOver.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }
    componentDidMount() {
        document.addEventListener("dragenter", (event) => {
            this.lastTarget = event.target
            this.setState({ dropZoneVisible: true })
        })
        document.addEventListener("dragleave", (event) => {
            if (event.target === this.lastTarget) {
                this.setState({ dropZoneVisible: false })
            }
        })
    }
    onDragOver(event) {
        event.preventDefault()
    }
    onDrop(event) {
        event.preventDefault()
        this.setState({ dropZoneVisible: false })

        const files = Array.from(event.dataTransfer.files)
        this.addFiles(files)
    }
    generateFileId() {
        while (true) {
            const id = Math.floor(Math.random() * 1000).toString()
            if (id in this.state.files) {
                // pass
            } else {
                return id
            }
        }
    }
    addFiles(files) {
        const newFiles = files.map(file => ({
            id: this.generateFileId(),
            name: file.name,
            size: file.size,
            content: file
        }))

        const validFiles = []

        newFiles.forEach(file => {
            const files = [...this.state.files, ...validFiles, file]
            const canAdd = this.consistent(files)
            if (canAdd) {
                validFiles.push(file)
            }
        })

        if (validFiles.length !== newFiles.length) {
            this.setState({ showMessage: true })
        }

        this.setState({
            files: [...this.state.files, ...validFiles]
        })

        validFiles.forEach(file => {
            Store.update([...this.props.urlContext, file.id], file.content)
        })
    }
    onAddAttachment(event) {
        event.preventDefault()
        this.add()
    }
    add() {
        const newFile = {
            id: this.generateFileId(),
            name: "",
            size: 0,
            add: true
        }
        const files = [...this.state.files, newFile]
        this.setState({ files })
    }
    update(i, file, props) {
        const files = [...this.state.files]
        files[i] = {
            ...files[i],
            ...props
        }

        if (this.consistent(files)) {
            this.setState({ files })
            Store.remove([...this.props.urlContext, file.id])
            return true
        } else {
            this.remove(i)
            this.setState({ showMessage: true })
            return false
        }
    }
    remove(i) {
        console.log(i)
        const files = [...this.state.files]
        files.splice(i, 1)
        this.setState({ files })
    }
    consistent(files) {
        return (this.bytesRemaining(files) >= 0)
    }
    bytesRemaining(files = this.state.files) {
        return files.reduce((p, c) => (p - c.size), this.props.limit)
    }
    render() {
        const urlContext = this.props.urlContext

        const files = this.state.files.map((file, i) => {
            const urlContext = [...this.props.urlContext, file.id].join("/")
            if (file.add) {
                return (
                    <InputFile
                        key={file.id}
                        {...file}
                        urlContext={urlContext}
                        onChange={this.update.bind(this, i, file)}
                        onRemove={this.remove.bind(this, i)}
                    />
                )
            } else if (file.remove) {
                return (
                    <RemovedFile
                        key={file.id}
                        urlContext={urlContext}
                    />
                )
            } else {
                return (
                    <UploadedFile
                        key={file.id}
                        {...file}
                        onRemove={this.update.bind(this, i, file, { remove: true, size: 0 })}
                    />
                )
            }
        })

        const bytesRemaining = this.bytesRemaining()

        return (
            <div className={`multiUpload ${this.state.showDropZone ? "dragOver" : "" }`}>
                {this.state.showMessage ? <div className="alert alert-info">{`Maximálna veľkosť príloh je ${formatSize(this.props.limit)}. Ostáva ${formatSize(bytesRemaining)}`}.</div> : null}
                <div className="file-list">
                    { files }
                </div>
                {/*`Ostáva ${formatSize(bytesRemaining)}`*/}
                <button className="btn btn-default" onClick={this.onAddAttachment.bind(this)}>
                    <Icon name="a_file" />
                    Pridať prílohu...
                </button>
                <div
                    className={`dropZone ${this.state.dropZoneVisible ? "active" : "" }`}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                >{this.props.dropZoneMessage}</div>
            </div>
        )
    }
}

class InputFile extends Component {
    constructor(props) {
        super(props)
        this.el = null
        this.state = {
            file: null
        }
    }
    componentDidMount() {
        this.el.click()
    }
    onChange(event) {
        const file = event.target.files[0]
        const result = this.props.onChange({
            name: file.name,
            size: file.size
        })
        if (result) {
            this.setState({ file })
        } else {
            this.el.value = ""
        }
    }
    render() {
        const input = <input name={this.props.urlContext} onChange={this.onChange.bind(this)} type="file" ref={el => this.el = el} />

        let content
        if (this.state.file) {
            const button = <CloseButton key="closeButton" onClick={this.props.onRemove} />
            const label = <FileLabel key="fileLabel" name={this.props.name} size={this.props.size} />
            content = [label, button]
        } else {
            content = null
        }

        return (
            <div className={`file ${!content ? "hidden" : ""}`}>
                {input}
                {content}
            </div>
        )
    }
}

const UploadedFile = ({ name, size, onRemove }) => (
    <div className="file">
        <FileLabel name={name} size={size} />
        <CloseButton onClick={onRemove} />
    </div>
)
const RemovedFile = ({ urlContext }) => (
    <input type="hidden" name={urlContext} value="_" />
)

const CloseButton = ({ onClick }) => (
    <button type="button" className="close" aria-label="Close" onClick={onClick}>
        <span aria-hidden="true">&times;</span>
    </button>
)

export const FileLabel = ({ name, size }) => (
    <div className="fileLabel">
        <div className="name">{name}</div>
        <div className="size">({formatSize(size)})</div>
    </div>
)