import React, {Component} from "react"
import PathSegment from 'tailor/form/attr/tree/pathSegment'
import Expander from 'tailor/form/attr/tree/expander'
import NodeLine from 'tailor/form/attr/tree/nodeLine'
import NodeButtonRoot from 'tailor/form/attr/tree/nodes/button/root'
import NodeFormRoot from 'tailor/form/attr/tree/form/root'

export default class TreeNode extends Component{
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.__originalTailorTree__ !== this.props.__originalTailorTree__)
  }

  dragStart(event) {
    event.stopPropagation()
    const dragSource = event.currentTarget

    // apply class after the browser makes a ghost image
    setTimeout(() => {
      dragSource.classList.add("dragSource")
    }, 1)
  }

  dragEnter(event) {
    event.stopPropagation()
    const dropTarget = event.currentTarget

    if (window.blox.lastDropTarget !== dropTarget) {
      window.blox.lastDropTarget = dropTarget
      dropTarget.classList.add("dropTarget")
    }
  }

  dragOver(event) {
    event.preventDefault()
    const dropTarget = event.currentTarget

    const bbox = dropTarget.getBoundingClientRect()
    const verticalSide   = ((event.clientY - bbox.y) / bbox.height) <= 0.5 ? "top" : "bottom"
    const horizontalSide = ((event.clientX - bbox.x) / bbox.width)  <= 0.2 ? "left" : "right"

    let place

    if (horizontalSide === "right") {
      place = "inside"
    } else if (verticalSide === "bottom") {
      place = "after"
    } else {
      place = "before"
    }

    window.blox.dropPlacement = place

    dropTarget.classList.remove("inside")
    dropTarget.classList.remove("after")
    dropTarget.classList.remove("before")

    dropTarget.classList.add(place)
  }

  dragLeave(event) {
    event.stopPropagation()
    const dropTarget = event.currentTarget

    if (window.blox.lastDropTarget !== dropTarget) {
      dropTarget.classList.remove("dropTarget")
    }
  }

  dragEnd(event) {
    event.stopPropagation()
    event.currentTarget.classList.remove("dragSource")
  }

  drop(event) {
    event.preventDefault()
    const dragTarget = event.currentTarget
    dragTarget.classList.remove("dropTarget")
    console.log(event)
  }

  render() {
    const props = this.props

    if (props.mode === "display") {
      return (<PathSegment {...this.props}>{props.children}</PathSegment>)
    }
    
    const children = React.Children.map(props.children, child => (
      React.cloneElement(child, {mode: props.mode})
    ))
    
    const state = {
      isSelected: props.info && (props.info.isSelected === null),
      isOpen: props.info && (props.info.isOpen === null),
      hasChildren: props.info && (props.info.isSubNodes === null)
    }

    const nodeLine = (
      <NodeLine
        urlContext={props.urlContext}
        id={props.params.key}
        label={props.params.label}
        designInfo={props.treeLineClass}
        iconName={props.iconName}
        isSelected={state.isSelected}
        isOpen={state.isOpen}
        hasChildren={state.hasChildren}
      >
        <NodeButtonRoot buttons={(props.info && props.info.buttons) || null} />
      </NodeLine>
    )

    return (
      <div
        className="tree-node"
        data-selected={state.isSelected}
        /*
        draggable="true"
        onDragStart={this.dragStart.bind(this)}
        onDragEnd={this.dragEnd.bind(this)}
        */
      >
        <div
          className="tree-node-header"
          /*
          onDragOver={this.dragOver}
          onDragEnter={this.dragEnter}
          onDragLeave={this.dragLeave}
          onDrop={this.drop}
          */
          tabIndex="0"
        >
          <Expander urlContext={props.urlContext} expandable={state.hasChildren} expanded={state.isOpen} />
          {nodeLine}
        </div>
        <NodeFormRoot form={(props.info && props.info.forms) || null} />
        <div className="tree-node-items">
          {children}
        </div>
      </div>
    )
  }
}