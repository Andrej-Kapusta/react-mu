// tento import veľmi spomaľuje.. preto sa načítava mimo a nejde cez babel
// import './ace/ace-bxl-builds-master/src-min/ace.js';

import React, {Component} from "react"
import Icon from "tailor/cms/item/icon"
import "./style.sass"

export default class CodeEditor extends Component{
  constructor(props) {
    super(props);
    this.codeElement = null
    this.inputElement = null
    this.editor = null
    this.fullscreenButton = null
    
    this.state = {
      value: this.props.sourceCode,
      fullscreen: false,
      rowCount: props.rowCount || 47
    }
  }
  
  componentDidMount() {
    this.editor = ace.edit(this.codeElement)
    
    this.editor.setSession(this.getSession(this.props))
    
    // this.editor.getSession().setMode("ace/mode/" + this.props.mode)
    this.editor.$blockScrolling = Infinity
    this.editor.setTheme("ace/theme/" + this.props.theme)
    this.editor.getSession().setTabSize(2)
    this.editor.getSession().setUseWrapMode(true)
    this.editor.setDisplayIndentGuides(true)
    this.editor.setShowPrintMargin(false)
    this.editor.setReadOnly(this.props.readOnly)
    this.editor.session.setOption("useWorker", false)

    
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      animatedScroll: true,
      scrollPastEnd: true,
      enableSnippets: true,
      minLines: this.state.rowCount,
      maxLines: this.state.rowCount
    })
    
    if (this.props.readOnly) {
      this.editor.renderer.$cursorLayer.element.style.opacity = 0
      this.editor.renderer.setShowGutter(false)
      this.editor.setWrapBehavioursEnabled(true)
      this.editor.setOptions({
        highlightActiveLine: false,
        highlightGutterLine: false,
        minLines: null
      })
    }

    this.editor.moveCursorToPosition({
      row: this.props.focusedRow - 1,
      column: this.props.focusedColumn - 1
    })

    this.editor.focus()
    this.editor.centerSelection()
    
    this.editor.commands.addCommand({
      name: "toggleFullscreen",
      bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
      exec: function(editor) {
        //this.toggleFullscreen()
        this.fullscreenButton.click()
      }.bind(this)
    })
    
    this.editor.commands.addCommand({
      name: "endFullscreen",
      bindKey: {win: "Esc", mac: "Esc"},
      exec: function(editor) {
        this.setState({fullscreen: false})
      }.bind(this)
    })
    
    this.editor.commands.addCommand({
      name: "submit",
      bindKey: {win: "Ctrl-S",  mac: "Command-S"},
      exec: function(editor) {
        const event = new Event("submit", { bubbles: true })
        this.inputElement.form.dispatchEvent(event)
      }.bind(this)
    })
    
    this.editor.on("change", function(e, code) {
      this.setState({
        value: this.editor.getValue()
      })
    }.bind(this))
    
    // this.editor.setValue(this.state.value, -1)
  }
  
  getSession(props) {
    const urlContext = props.urlContext.join("/")
    const value = props.sourceCode || ""
    const mode = "ace/mode/" + props.mode
    
    if (!window.blox.editorSessions) {
      window.blox.editorSessions = {}
    }
    
    let cachedSession = window.blox.editorSessions[urlContext]
    
    if (!cachedSession) {
      window.blox.editorSessions[urlContext] = ace.createEditSession(value, mode)
      cachedSession = window.blox.editorSessions[urlContext]
    } else {
      cachedSession.setMode(mode)

      console.log(cachedSession.getValue())
      console.log(value)

      if (cachedSession.getValue() !== value) {
        console.log("POZOR! Hodnota sa zmenila od posledného editu.")
        cachedSession.doc.setValue(value)
      }
    }
    
    return cachedSession
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.sourceCode
    })
    
    this.editor.setSession(this.getSession(newProps))
    
    // this.editor.getSession().setMode("ace/mode/" + newProps.mode)
    this.editor.setTheme("ace/theme/" + newProps.theme)
    this.editor.setReadOnly(newProps.readOnly)
    
    // toto netreba
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      animatedScroll: true,
      scrollPastEnd: true,
      enableSnippets: true,
      minLines: this.state.rowCount,
      maxLines: this.state.rowCount
    })
    
    if (newProps.readOnly) {
      this.editor.renderer.$cursorLayer.element.style.opacity = 0
      this.editor.renderer.setShowGutter(false)
      this.editor.setWrapBehavioursEnabled(true)
      this.editor.setOptions({
        highlightActiveLine: false,
        highlightGutterLine: false,
        minLines: null
      })
    }
    
    // this.editor.setValue(newProps.sourceCode, -1)
  }
  
  toggleFullscreen(event) {
    event.preventDefault()
    
    this.setState({
      fullscreen: !this.state.fullscreen,
      rowCount: this.state.fullscreen ? this.state.rowCount : null
    })
    
    let opts =  this.state.fullscreen ? {
        minLines: this.state.rowCount,
        maxLines: this.state.rowCount
      } : {
        minLines: null,
        maxLines: null
      }

    this.editor.setOptions(opts)
    
    setTimeout(() => {
      this.editor.resize()
      this.editor.focus()
      this.editor.centerSelection()
    }, 0) // hm?
  }
  
  render() {
    let fullscreen = this.state.fullscreen ? " fullscreen" : ""
    let style = this.state.fullscreen ? (<style>{"body{overflow: hidden !important;}"}</style>) : null
    
    let toolbar = (
      <div className="toolbar">
        <button ref={(el) => { this.fullscreenButton = el }} onClick={this.toggleFullscreen.bind(this)}>
          <Icon name="fullscreen" highlight={false} />
        </button>
      </div>
    )
    
    return (
      <div style={{flex: 1}}>
        <input type="hidden" ref={el => { this.inputElement = el } } name={this.props.urlContext.join("/")} value={this.state.value} />
        {style}
        <div className={"editor" + fullscreen} style={{display: "flex", flexDirection: "column"}}>
          {this.props.readOnly ? null : toolbar}
          <code className={this.props.readOnly ? "" : "form-control"} ref={ el => { this.codeElement = el } } style={{flex: 1}} />
        </div>
      </div>
		)
  }
}