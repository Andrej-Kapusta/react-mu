import React, {Component} from "react"
import Tab from 'tailor/app/tab'
import TabContent from 'tailor/app/tabContent'

export default class ScrollableTabView extends Component{
  constructor(props) {
    super(props)
    this.tabContents = new Map()
    this.state = {
      selectedIndex: 0
    }
  }
  onScroll(event) {
    const bb = event.target.getBoundingClientRect()
    const visible = Array.from(this.tabContents.values()).map(t => ((t.getBoundingClientRect().top - bb.top) >  0))
    const selectedIndex = visible.reduce((prev, curr, currIndex) => (curr ? prev : currIndex), 0)

    if (this.state.selectedIndex !== selectedIndex) {
      this.setState({selectedIndex})
    }
  }

  registerTabContent(el, i) {
    this.tabContents.set(i, el)
  }

  render() {
    const props = this.props
    //console.log(props)

    const tabs = props.children.map((tab, i) => (<Tab key={i} selected={i === this.state.selectedIndex} {...tab.props} />))
    const content = props.children.map((tab, i) => (<TabContent refFn={(el) => this.registerTabContent(el, i)} key={i} {...tab.props} />))

    return (
      <section className={`panel panel-default tabset left ${props.designInfo}`}>
      <header className={`panel-heading bx_header`}>
        <nav>
          {tabs}
        </nav>
      </header>
      <article className="panel-body" style={{flexDirection: "column"}} onScroll={this.onScroll.bind(this)}>
        {content}
        <div style={{minHeight: "100%"}}></div>
      </article>
      </section>
    )
  }
}