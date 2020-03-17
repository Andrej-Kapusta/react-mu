import React, {Component} from "react"

export default class Section extends Component{
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.__originalTailorTree__ !== this.props.__originalTailorTree__)
  }
  render() {
    const isContainerOnly = (this.props.info.type.horizontal === null) || (this.props.info.type.vertical === null)

    if (isContainerOnly) {
      const type = Object.keys(this.props.info.type)[0]
      return (
        <section className={`flex ${type} ${this.props.designInfo}`}>
          {this.props.children}
        </section>
      )
    }
    
    return (
      <section className={`panel panel-default ${this.props.designInfo}`}>
        <header className="panel-heading">
          <h3 className="panel-title">{this.props.label}</h3>
        </header>
        <article className="panel-body">
          {this.props.children}
        </article>
      </section>
    )
  }

}