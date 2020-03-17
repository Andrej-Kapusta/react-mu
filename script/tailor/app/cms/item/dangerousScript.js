import { PureComponent } from "react"

export default class DangerousScript extends PureComponent {
    componentDidMount() {
        try {
            eval(this.props.text)
        } catch (e) {
            console.log("Chyba v nebezpečnom kóde", this.props.text)
            console.log(e)
        }
    }
    render() {
        return null
    }
}