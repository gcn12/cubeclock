import React, { Component } from "react"
import moment from "moment"

class TimerClock extends Component{

    state = {
        timeInput: ""
    }


    timeInput = (event) => {
        this.setState({
            timeInput: event.target.value
        })
    }

    converter(input) {
        const hours = Math.floor(input / 3600000)
        const minutes = Math.floor((input / 60000)%60)
        const seconds = Math.floor((input / 1000)%60)
        const milliseconds = (input % 1000)
        this.setState({
          hours: hours,
          minutes: minutes, 
          secondsTwo: seconds, 
          seconds: seconds,
          milliseconds: milliseconds,
        })
    }

    submit = (e) => {
        if (e.keyCode===13) {
            let allSolves = []
            for (const solve of this.props.solves){
                if (solve.puzzle === this.props.puzzleType){
                allSolves.push(solve.milliseconds)
                }
            }
            
            let endMS=0
            var x = this.state.timeInput
            var y = x.match(/\d+/g)
            if(y!==null){
                var z = y.slice().reverse()
            }
            if(z){
                if(z.length>0){
                    z.map((number, index) =>{
                        if(index===0){
                            if (number.length===1){
                                endMS+=number*100
                            }
                            if (number.length===2){
                                endMS+=number*10
                            }
                            if (number.length===3){
                                endMS+=number*1
                            }
                        }
                        if(index===1){
                            endMS+=number*1000
                        }
                        if(index===2){
                            endMS+=number*60000
                        }
                        if(index===3){
                            endMS+=number*3600000
                        }
                        return(null)
                    })
                    allSolves.sort(this.compareMilliseconds)
                    let halfDate = moment.unix(Math.round(new Date().getTime() / 1000)).format("YYYY-MM-DD");
                    this.props.converter(endMS, true)
                    let solveid = ""
                    solveid+=Date.now()
                    let minimumTime = 0
                    if (this.props.puzzleType==="3x3"){
                        minimumTime=1100
                    }
                    if (this.props.puzzleType==="5x5" || this.props.puzzleType==="6x6"
                    || this.props.puzzleType==="7x7"){
                        minimumTime=10000
                    }
                    if (this.props.puzzleType==="3x3 OH" || this.props.puzzleType==="Megaminx"){
                        minimumTime=2000
                    }
                    if (this.props.puzzleType==="Clock"){
                        minimumTime=500
                    }
                    if (this.props.puzzleType==="Square-1"||this.props.puzzleType==="4x4 BLD"){
                        minimumTime=1000
                    }
                    if (this.props.puzzleType==="5x5 BLD" || this.props.puzzleType==="4x4"||this.props.puzzleType==="3x3 BLD"){
                        minimumTime=4000
                    }
                    let unix = Math.round(new Date().getTime() / 1000)
                    
                    const solveData = {}
                    solveData["id"] = this.props.id
                    solveData["solve"] = this.props.displayTimeFormatted
                    if (this.props.puzzleType==="Megaminx"){
                        solveData["scramble"] = this.props.megaminxScramble 
                    }else if (this.props.puzzleType==="Multi-BLD"){
                        solveData["scramble"] = this.props.multiBLDScramble
                    }else{
                        solveData["scramble"] = this.props.scrambleRegular
                    }
                    solveData["milliseconds"] = String(endMS)
                    solveData["isplustwo"] = false
                    solveData["isdnf"] = false
                    solveData["date"] = halfDate
                    solveData["solveid"] = solveid
                    solveData["plustwo"] = this.props.twoFormatted
                    solveData["millisecondstwo"]= String(endMS + 2000)
                    solveData["session"] = this.props.sessions
                    solveData["unix"] = String(unix)
                    solveData["puzzle"] = this.props.puzzleType
                    solveData["sessionname"]=this.props.sessionName
                    solveData["temporary"] = true
                    this.props.sendToSolves([solveData, ...this.props.solves])
                    let offline = JSON.parse(localStorage.getItem("offline"))
                    this.props.getInterfaceSolvesSingle(solveData)
            
                    const finalSolve = {}
                    finalSolve["id"] = this.props.id
                    finalSolve["solve"] = this.props.displayTimeFormatted
                    if (this.props.puzzleType==="Megaminx"){
                        finalSolve["scramble"] = this.props.megaminxScramble
                    }else if (this.props.puzzleType==="Multi-BLD"){
                        finalSolve["scramble"] = this.props.multiBLDScramble
                    }else{
                        finalSolve["scramble"] = this.props.scrambleRegular
                    }
                    finalSolve["milliseconds"] = String(endMS)
                    finalSolve["isplustwo"] = false
                    finalSolve["isdnf"] = false
                    finalSolve["date"] = halfDate
                    finalSolve["solveid"] = solveid
                    finalSolve["plustwo"] = this.props.twoFormatted
                    finalSolve["millisecondstwo"]=String(endMS + 2000)
                    finalSolve["session"] = this.props.sessions
                    finalSolve["unix"] = String(unix)
                    finalSolve["puzzle"] = this.props.puzzleType
                    finalSolve["sessionname"]=this.props.sessionName
                    let sendToDB = [...this.props.solvesApp, finalSolve]
                    this.props.send(sendToDB)
                    if(offline){
                        localStorage.setItem("offlinesolves", JSON.stringify({"solves": [...sendToDB]}))
                    }
                    setTimeout(()=>this.props.getSolveFromInterface(finalSolve),10)
                    if (this.state.final < allSolves[0] && endMS > minimumTime){
                        if(allSolves.length>75){
                        this.props.confettiLaunch()
                        }
                    }
                    document.getElementById("manualInput").value=""
                    this.props.scramble(this.props.puzzleType)
                    this.setState({
                        timeInput: ""
                    })
                }
            }
        }  
      }

      
    render(){
        return(
            this.props.isManualEnter ? 
            <div className="tc padding-top-most-of-interface" style={{paddingBottom:"10px"}}>
                <input autoComplete="off"  onChange={this.timeInput} className="tc" autoFocus="autofocus"  id="manualInput" type="number" style={{color: this.props.isBackgroundLight ? "black" : "white",background: this.props.isBackgroundLight ? "whitesmoke" : "RGB(23,23,23)", outline:"none", height:"120px", width:"300px", fontSize:"100px"}}></input>
            </div>
            :
            <div className="tc padding-top-most-of-interface" style={{color: this.props.isBackgroundLight ?  "black" : "white"}}>
                <h1 style={{color: this.props.isBackgroundLight ?  "black" : "white"}} id="timer-color-change" className="br3 ba mv4 w-50 w-25-1 mw5 center">{this.props.timerFormatted}</h1>
            </div>
        )
    }
    componentDidMount() {
        document.addEventListener("keydown", this.submit)
    }
}

export default TimerClock