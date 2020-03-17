import React, {Component} from "react"
import Action from "tailor/cms/action"
import Icon from "tailor/cms/item/icon"

export default class PageSelect extends Component{
  render() {
    const rowsPerPage = this.props.rangeCount || 10
    const rowCount = this.props.rowCount
    const pageCount = Math.ceil(rowCount / rowsPerPage)
    const rowOffset = this.props.currentStart || 1
    const selectedPage = Math.ceil(rowOffset / rowsPerPage)

    const actionPrefix = ["picker", "event", "page"]

    let pageIndices = Array.from(new Set([
      1, 2, // head
      pageCount - 1, pageCount, // tail
      selectedPage - 2, selectedPage - 1, selectedPage, selectedPage + 1, selectedPage + 2 // around
    ])).filter(i => (i > 0 && i <= pageCount))

    pageIndices.sort((a, b) => (a - b))

    let p = []

    pageIndices.reduce((prev, curr) => {
      if (curr - prev !== 1) { p.push({separator: true}) } // push separator at boundary
      p.push(curr) // push actual page index
      return curr
    }, 0)

    const pages = p.map(i => {
      if (Number.isInteger(i)) {
        return (
          <Action urlContext={this.props.urlContext} action={[...actionPrefix, (i - 1) * rowsPerPage]}>
            {i}
          </Action>
        )
      } else {
        return "…"
      }
    })

    const previousPageOffset = (selectedPage - 2) * rowsPerPage
    const nextPageOffset = selectedPage * rowsPerPage

    const previous = (
      <Action urlContext={this.props.urlContext} action={[...actionPrefix, previousPageOffset]}>
        <Icon name="arrow4_left" /> Back
      </Action>
    )

    const next = (
      <Action urlContext={this.props.urlContext} action={[...actionPrefix, nextPageOffset]}>
        Next <Icon name="arrow4_right" />
      </Action>
    )

    let list = (
      <ul className="pagination">
        {
          [previous, ...pages, next].map((e, i) => (
            <li key={i} className={selectedPage === i ? "active" : ""}><a>{e}</a></li>
          ))
        }
      </ul>
    )

    return list
  }
}