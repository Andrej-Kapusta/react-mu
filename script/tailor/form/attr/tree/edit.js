import React, {Component} from "react"
import Label from "tailor/form/attr/label/edit"
import "./style.sass"

export default class TreeEdit extends Component{
  constructor(props) {
    super(props)

    this.tree = null
    this.cursor = null
    this.cachedNodes = null
  }

  handleDoubleClick(event) {
    event.stopPropagation()
    const tree = event.currentTarget
    const selected = tree.querySelector(".tree-node[data-selected='true'")
    if (selected) {
      selected.scrollIntoView(
        //{behavior: "smooth"}
      )
    }
  }

  changeCursor(node) {
    if (node === null) {
      console.warn("Setting tree cursor to null element.")
      return
    }
    if (this.cursor !== null){
      this.cursor.dataset.focused = false
    }
    this.cursor = node
    this.cursor.dataset.focused = true
    this.cursor.children[0].focus() // focus tree-node-header
  }

  cacheNodes() {
    if (this.tree) {
      this.cachedNodes = this.tree.querySelectorAll(".tree-node")
    }
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(this.cacheNodes.bind(this), 0)
  }

  handleKeyDown(event) {
    // console.log(event.target, event.currentTarget)

    // nejako inak
    if (!event.target.classList.contains("tree-node-header")) {
      return
    }

    const tree = event.currentTarget

    if (this.cursor === null) {
      const selectedNode = tree.querySelector(".tree-node[data-selected='true'")
      
      if (selectedNode !== null) {
        this.changeCursor(selectedNode)
      } else {
        const firstNode = tree.querySelector(".tree-node")
        this.changeCursor(firstNode)
      }
    }


    if (!this.cachedNodes) {
      this.cacheNodes()
    }

    const key = event.key
    const nodes = this.cachedNodes
    const index = Array.prototype.slice.call(nodes).indexOf(this.cursor)

    switch (key) {
      case "ArrowDown":
        event.preventDefault()
        const next = nodes[(index + 1) % nodes.length]
        this.changeCursor(next)
        break
      case "ArrowUp":
        event.preventDefault()
        const previous = nodes[(nodes.length + index - 1) % nodes.length]
        this.changeCursor(previous)
        break
      case "ArrowRight":
        event.preventDefault()
        const openButton = this.cursor.children[0].querySelector("button[formaction$='open']")
        if (openButton) {
          openButton.click()
          this.changeCursor(this.cursor)
        } else {
          const selectButton = this.cursor.children[0].querySelector("button[formaction$='select']")
          if (selectButton) {
            selectButton.click()
            this.changeCursor(this.cursor)
          }
        }
        break
      case "ArrowLeft":
        event.preventDefault()
        const closeButton = this.cursor.children[0].querySelector("button[formaction$='close']")
        if (closeButton) {
          closeButton.click()
          this.changeCursor(this.cursor)
        } else {
          const parent = this.cursor.parentNode.closest(".tree-node")
          this.changeCursor(parent)
        }
        break
      case "Enter":
        const selectButton = this.cursor.children[0].querySelector("button[formaction$='select']")
        if (selectButton) {
          selectButton.click()
          this.changeCursor(this.cursor)
        }
    }
  }

  render() {
    const treeSelectFocus = [...this.props.urlContext, "treeSelectFocus"].join("/")
    return (
      <Label {...this.props}>
          <input type="hidden" name={treeSelectFocus} value={this.props.treeSelectFocus} />
          <div className="tree" ref={(el) => this.tree = el} tabIndex="0" onKeyDown={this.handleKeyDown.bind(this)} onDoubleClick={this.handleDoubleClick.bind(this)}>
            {this.props.children}
          </div>
      </Label>
    )
  }
}
