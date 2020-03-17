import React, {Component} from "react"
import Line from 'tailor/olap/line'
import Bars from 'tailor/olap/bars'
import filesize from "filesize"

export default class Stats extends Component{
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      pageGenerationTime: [],
      usedMemory: [],
      totalMemory: [],
      maxMemory: [],
      deltaMemory: [],
      pageLength: [],
      logCount: [],
      warningCount: [],
      errorCount: [],
      logSize: []
    }
  }
  
  match(logs, regex, processFunction, defaultValue) {
    let m = logs.match(regex)
    return m ? processFunction(m[1]) : defaultValue 
  }
  
  matchWithUnit(logs, regex, processFunction, defaultValue, defaultUnit) {
    let mu = logs.match(regex)
    if (mu) {
      return [processFunction(mu[1]), mu[2]]
    } else {
      return [defaultValue, defaultUnit]
    }
  }
  
  getFactor(unit) {
    const mu = {
      "B" : 2 **  0,
      "kB": 2 ** 10,
      "MB": 2 ** 20,
      "GB": 2 ** 30
    }
    
    return mu[unit]
  }

  humanize(value) {
    return filesize(value, { base: 10 })
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.logs) {
      let l = nextProps.logs
      let start = l.indexOf("<div class=\"bx_log_table console\">")
      let end   = l.indexOf("<div class=\"bx_log_table stats\">")
      
      let logs = l.substring(0, start) + l.substring(end)
      
      const logSize = l.length
      
      const pageGenerationTimeValue = this.match(logs, /<tr><td>Page generation time<\/td><td>([0-9.]+).seconds<\/td><\/tr>/, parseFloat, 0.0)
      const pageGenerationTime = pageGenerationTimeValue * 1000
      
      const [usedMemoryValue, usedMemoryUnit] = this.matchWithUnit(logs, /<tr><td>Used.memory<\/td><td>([0-9.]+).((?:G|M)?B)<\/td><\/tr>/, parseFloat, 0.0, "B")
      const usedMemory = parseFloat(usedMemoryValue) * this.getFactor(usedMemoryUnit)
      
      const [totalMemoryValue, totalMemoryUnit] = this.matchWithUnit(logs, /<tr><td>Total.memory<\/td><td>([0-9.]+).((?:G|M)?B)<\/td><\/tr>/, parseFloat, 0.0, "B")
      const totalMemory = totalMemoryValue * this.getFactor(totalMemoryUnit)
      
      const [maxMemoryValue, maxMemoryUnit] = this.matchWithUnit(logs, /<tr><td>Max.memory<\/td><td>([0-9.]+).((?:G|M)?B)<\/td><\/tr>/, parseFloat, 0.0, "B")
      const maxMemory = maxMemoryValue * this.getFactor(maxMemoryUnit)
      
      const [deltaMemoryValue, deltaMemoryUnit] = this.matchWithUnit(logs, /<tr><td>Page memory delta<\/td><td>([0-9.]+).((?:G|M|k)?B)<\/td><\/tr>/, parseFloat, 0.0, "B")
      const deltaMemory = deltaMemoryValue * this.getFactor(deltaMemoryUnit)
      
      const [pageLengthValue, pageLengthUnit] = this.matchWithUnit(logs, /<tr><td>Page length<\/td><td>([0-9.]+).((?:G|M|k)?B)<\/td><\/tr>/, parseFloat, 0.0, "B")
      const pageLength = pageLengthValue * this.getFactor(pageLengthUnit)
      
      const warningCount = this.match(logs, /<div class="badge" id="bloxWarningCount">([0-9]+)<\/div>/, parseInt, 0)
      const logCount = this.match(logs, /<div class="badge" id="bloxLogCount">([0-9]+)<\/div>/, parseInt, 0)
      const errorCount = this.match(logs, /<div class="badge" id="bloxErrorCount">([0-9]+)<\/div>/, parseInt, 0)
  
      this.setState({
        visible: true,
        pageGenerationTime: [...this.state.pageGenerationTime, pageGenerationTime],
        usedMemory: this.state.usedMemory.concat([usedMemory]),
        totalMemory: this.state.totalMemory.concat([totalMemory]),
        maxMemory: this.state.maxMemory.concat([maxMemory]),
        deltaMemory: this.state.deltaMemory.concat([deltaMemory]),
        pageLength: this.state.pageLength.concat([pageLength]),
        logCount: [...this.state.logCount, logCount],
        warningCount: [...this.state.warningCount, warningCount],
        errorCount: [...this.state.errorCount, errorCount],
        logSize: [...this.state.logSize, logSize]
      })
    } else {
      this.setState({
        visible: false
      })
    }
  }
  
  render() {
    if (!this.state.visible) {
      return null
    }
    
    let lineProps = {
      width: 150,
      height: 15
    }
    
    return (
      <div id="core-statistics">
        <table>
          <tbody>
            <tr>
              <td>Response time</td>
              <td><Line {...lineProps} values={this.state.pageGenerationTime} /></td>
              <td>{this.state.pageGenerationTime.slice(-1).pop()} ms</td>
            </tr>
            <tr>
              <td>Response size</td>
              <td><Line {...lineProps} values={this.state.pageLength} /></td>
              <td>{this.humanize(this.state.pageLength.slice(-1).pop())}</td>
            </tr>
            <tr>
              <td>Log size</td>
              <td><Line {...lineProps} values={this.state.logSize} /></td>
              <td>{this.humanize(this.state.logSize.slice(-1).pop())}</td>
            </tr>
            <tr style={{marginTop: 3}}>
              <td>Used memory</td>
              <td><Line {...lineProps} values={this.state.usedMemory} /></td>
              <td>{this.humanize(this.state.usedMemory.slice(-1).pop())}</td>
            </tr>
            <tr>
              <td>Total memory</td>
              <td><Line {...lineProps} values={this.state.totalMemory} /></td>
              <td>{this.humanize(this.state.totalMemory.slice(-1).pop())}</td>
            </tr>
            <tr>
              <td>Memory delta</td>
              <td><Line {...lineProps} values={this.state.deltaMemory} /></td>
              <td>{this.humanize(this.state.deltaMemory.slice(-1).pop())}</td>
            </tr>
            <tr style={{marginTop: 3}}>
              <td>Log count</td>
              <td><Line {...lineProps} fillColor="gray" values={this.state.logCount} /></td>
              <td><span style={{color: "gray", fontSize: "large"}}>{this.state.logCount.slice(-1).pop()}</span></td>
            </tr>
            <tr>
              <td>Warning count</td>
              <td><Line {...lineProps} fillColor="orange" values={this.state.warningCount} /></td>
              <td><span style={{color: "orange", fontSize: "large"}}>{this.state.warningCount.slice(-1).pop()}</span></td>
            </tr>
            <tr>
              <td>Error count</td>
              <td><Line {...lineProps} fillColor="red" values={this.state.errorCount} /></td>
              <td><span style={{color: "red", fontSize: "large"}}>{this.state.errorCount.slice(-1).pop()}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}