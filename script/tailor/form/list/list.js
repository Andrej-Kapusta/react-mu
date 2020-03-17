import React, { Component } from "react"

export default class List extends Component{
  render() {
    let filter, header, rows, footer;

    if (this.props.children.length === 4){
      [filter, header, rows, footer] = this.props.children
    } else {
      [header, rows, footer] = this.props.children
      filter = null
    }

    return (
      <section style={{flex: 1}}>
        {filter}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>{header}</thead>
            <tbody>{rows}</tbody>
            <tfoot></tfoot>
          </table>
        </div>
        <footer>
          {footer}
        </footer>
      </section>
    )
  }
}
