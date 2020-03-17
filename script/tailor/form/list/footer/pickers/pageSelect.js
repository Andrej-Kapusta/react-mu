import React, {Component} from "react"
import Action from "tailor/cms/action"
import Icon from "tailor/cms/item/icon"

export default class PageSelect extends Component{
  constructor(props) {
    super(props)

    this.state = {
      scrubbing: false,
      hoveredPage: 0
    }

    this.onScrub = this.onScrub.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }
  onScrub(event) {
    // console.log({...event} )
    if (this.state.scrubbing !== true) {
      this.setState({scrubbing: true})
    }

    const el = event.currentTarget
    const bb = el.getBoundingClientRect()
    const width = el.clientWidth
    const ratio = (event.clientX - bb.x) / width

    const rowsPerPage = this.props.rangeCount || 10
    const rowCount = this.props.rowCount
    const pageCount = Math.ceil(rowCount / rowsPerPage)
    
    let hoveredPage = 1 + Math.floor(ratio * pageCount)

    if (hoveredPage < 1) {
      hoveredPage = 1
    } else if (hoveredPage > pageCount) {
      hoveredPage = pageCount
    }

    this.setState({hoveredPage})
  }
  onLeave(event) {
    this.setState({
      scrubbing: false
    })
  }
  render() {
    const rowsPerPage = this.props.rangeCount || 10
    const rowCount = this.props.rowCount
    const pageCount = Math.ceil(rowCount / rowsPerPage)
    let rowOffset = this.props.currentStart || 1
    let lastRowOffset = Math.min(rowOffset + rowsPerPage - 1, rowCount)
    let selectedPage = Math.ceil(rowOffset / rowsPerPage)

    if (this.state.scrubbing === true) {
      selectedPage = this.state.hoveredPage
      rowOffset = 1 + (selectedPage - 1) * rowsPerPage
      lastRowOffset = Math.min(rowOffset + rowsPerPage - 1, rowCount)
    }

    const actionPrefix = ["picker", "event", "page"]

    const railStyle = {
      display: "block",
      width: "10em",
      height: 15,
      padding: 2,
      backgroundColor: "#eee",
      borderRadius: 5,
      border: "1px solid #aaa"
    }

    const indicatorStyle = {
      display: "block",
      position: "relative",
      left: `${100 * (selectedPage - 1) / pageCount}%`,
      width: `${100 / pageCount}%`,
      minWidth: 10,
      height: 9,
      backgroundColor: "#333",
      borderRadius: 5,
      transition: "left .1s ease-in-out"
    }

    const rail = (
      <span className="rail" style={railStyle} /*onMouseMove={this.onScrub} onMouseLeave={this.onLeave}*/>
        <span className="indicator" style={indicatorStyle} />
      </span>
    )

    const previousPageOffset = (selectedPage - 2) * rowsPerPage
    const nextPageOffset = selectedPage * rowsPerPage

    const previous = (
      <Action urlContext={this.props.urlContext} action={[...actionPrefix, previousPageOffset]}>
        <Icon name="arrow4_left" />
      </Action>
    )

    const next = (
      <Action urlContext={this.props.urlContext} action={[...actionPrefix, nextPageOffset]}>
        <Icon name="arrow4_right" />
      </Action>
    )

    if (pageCount <= 1) {
      return null
    }

    return (
      <div className="pagination" style={{display: "flex", alignItems: "center"}}>
        {previous}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", flex: 1}}>
          <small className="pages">{`${selectedPage} / ${pageCount}`}</small>
          <Action urlContext={this.props.urlContext} action={[...actionPrefix, rowOffset - 1]} onMouseMove={this.onScrub} onMouseLeave={this.onLeave}>
            {rail}
          </Action>
          <small className="rows">{`${rowOffset} – ${lastRowOffset} / ${rowCount}`}</small>
        </div>
        {next}
      </div>
    )
  }
}