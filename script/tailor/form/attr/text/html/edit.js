import React, { PureComponent } from "react"
import InlineSVG from "svg-inline-react"
import Label from "tailor/form/attr/label/edit"
import Icon from "tailor/cms/item/icon"
import { Editor, EditorState, ContentState, RichUtils } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { stateFromHTML } from "draft-js-import-html"
import "draft-js/dist/Draft.css"
import "./style.sass"

import { INLINE_STYLES, BLOCK_TYPES } from "./types"

export default (props) => (
  <Label {...props} messages={props.children}>
    <HtmlEditor {...props} />
  </Label>
)

class HtmlEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.editor = null

    const value = props.value || ""

    const state = stateFromHTML(value)
    this.state = {
      editorState: EditorState.createWithContent(state),
      value: props.value,
      maxLength: (props.info && props.info.maxLength) || 1000,
      overMaximumLimit: false
    }
    this.focus = () => this.editor.focus()

    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.onTab = this._onTab.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
  }
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return "handled"
    }
    return "not-handled"
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  onChange(editorState) {
    const currentContent = editorState.getCurrentContent()
    const currentContentLength = currentContent.getPlainText("").length

    if (currentContentLength > this.state.maxLength) {
      this.setState({ overMaximumLimit: true })
    } else {
      if (this.state.overMaximumLimit === true) {
        this.setState({ overMaximumLimit: false })
      }
    }

    this.setState({ editorState })

    const contentState = editorState.getCurrentContent()
    this.setState({
      value: stateToHTML(contentState)
    })
  }
  render() {
    const { editorState } = this.state;
    const placeholder = this.props.placeholder || this.props.label

    return (
      [
        <div className="form-control" style={{ height: "initial" }} onClick={this.focus}>
          <div className="controls">
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
          </div>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            onChange={this.onChange.bind(this)}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            placeholder={placeholder}
            ref={(c) => { this.editor = c }}
          />
        </div>,
        this.state.overMaximumLimit && <div class="control-label form-message">Prekročená maximálna dĺžka {this.state.maxLength} znakov.</div>,
        <input type="hidden" name={this.props.urlContext.join("/")} value={this.state.value} />
      ]
    )
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    };
  }
  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        <InlineSVG src={require("./icons/" + this.props.icon +".svg")} />
      </span>
    );
  }
}

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </div>
  )
}

const BlockStyleControls = (props) => {
  const { editorState } = props
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </div>
  )
}