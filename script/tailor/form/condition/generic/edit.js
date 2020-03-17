import React from "react"
import Label from 'tailor/form/attr/label/edit';
import Simple from 'tailor/form/attr/simple/edit';

export default class Condition extends Simple{
  constructor(props) {
    super(props);
    this.urlContext = props.urlContext.join('/');
  }

  getCondition(){
    const props = this.props;
    if(props.info !== undefined && props.info.condType === "between"){
      console.error("Between condition not implemented");
      return (<div style={{color:"red"}}>
                Between condition not implemented
              </div>)
    } else {
      return (
        <input
            type="text"
            name={this.urlContext}
            value={this.state.value}
            defaultValue={this.props.value}
            placeholder={this.props.label}
            onChange={this.handleChange.bind(this)}
            className="form-control"
            id={this.urlContext}
        />
      )
    }
  }

  render() {
    const urlContext = this.props.urlContext.join("/");
    const messages = this.props.children;

    return (
        <Label {...this.props} messages={messages}>
          {this.getCondition()}
        </Label>
    )
  }
}
