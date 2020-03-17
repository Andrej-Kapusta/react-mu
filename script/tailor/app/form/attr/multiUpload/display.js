import React, { PureComponent } from "react"
import Label from "tailor/form/attr/label/display"
import { FileLabel } from "./edit"
import "./styles.sass"

const obj2arr = (obj) => Object.keys(obj ? obj : {}).map(k => ({ ...obj[k], id: k }))

export default (props) => {
    console.log(props)
    return <Label {...props} messages={props.children}>
        <FileList {...props} />
    </Label>
}

class FileList extends PureComponent {
    render() {
        const files = obj2arr(this.props.files)

        return (
            <div className="multiUpload">
            <ul className="file-list">
                {
                    files.map(file => (
                        <li className="file" key={file.id}>
                            <FileLabel {...file} />
                        </li>
                    ))
                }
            </ul>
            </div>
        )
    }
}