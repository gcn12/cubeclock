import React, {Component} from 'react';
import './TimerInterface.css';
import Table from "./Table"
import Scroll from './Scroll';
import Average from './Average';
import CustomAverage from './CustomAverage';
import moment from "moment"


window.onkeydown = function(e) { 
  return !(e.keyCode === 32 && e.target === document.body);
}; 

const twothree = [
  ["R", "R'", "R2"], 
  ["L", "L'", "L2"], 
  ["U", "U'", "U2"], 
  ["D", "D'", "D2"],
  ["B", "B'", "B2"], 
  ["F", "F'", "F2"],
]

const fourfive = [
  ["R", "R'", "R2", "Rw", "Rw'", "Rw2"],
  ["L", "L'", "L2", "Lw", "Lw'", "Lw2"], 
  ["U", "U'", "U2", "Uw", "Uw'", "Uw2"], 
  ["D", "D'", "D2", "Dw", "Dw'", "Dw2"],
  ["B", "B'", "B2", "Bw", "Bw'", "Bw2"], 
  ["F", "F'", "F2", "Fw", "Fw'", "Fw2"],
]

const sixseven = [
  ["R", "R'", "R2", "Rw", "Rw'", "Rw2", "3Rw", "3Rw'", "3Rw2"],
  ["L", "L'", "L2", "Lw", "Lw'", "Lw2", "3Lw", "3Lw'", "3Lw2"], 
  ["U", "U'", "U2", "Uw", "Uw'", "Uw2", "3Uw", "3Uw'", "3Uw2"],  
  ["D", "D'", "D2", "Dw", "Dw'", "Dw2", "3Dw", "3Dw'", "3Dw2"],
  ["B", "B'", "B2", "Bw", "Bw'", "Bw2", "3Bw", "3Bw'", "3Bw2"], 
  ["F", "F'", "F2", "Fw", "Fw'", "Fw2", "3Fw", "3Fw'", "3Fw2"],
]

const pyraminxNotation = [
  ["U", "U'", "u", "u'"],
  ["L", "L'", "l", "l'"],
  ["R", "R'", "r", "r'"],
  ["B", "B'", "b", "b'"]
]

const skewb = [
  ["U", "U'"],
  ["F", "F'"],
  ["B", "B'"],
  ["L", "L'"],
  ["R", "R'"],
]

const sq1 = [
  ["(0,1)", "(0,2)","(0,3)","(0,4)","(0,5)","(0,6)","(0,-1)","(0,-2)","(0,-3)","(0,-4)","(0,-5)","(0,-6)"],
  ["(1,1)", "(1,2)","(1,3)","(1,4)","(1,5)","(1,6)","(1,-1)","(1,-2)","(1,-3)","(1,-4)","(1,-5)","(1,-6)"],
  ["(-1,1)", "(-1,2)","(-1,3)","(-1,4)","(-1,5)","(-1,6)","(-1,-1)","(-1,-2)","(-1,-3)","(-1,-4)","(-1,-5)","(-1,-6)"],
  ["(2,1)", "(2,2)","(2,3)","(2,4)","(2,5)","(2,6)","(2,-1)","(2,-2)","(2,-3)","(2,-4)","(2,-5)","(2,-6)"],
  ["(-2,1)", "(-2,2)","(-2,3)","(-2,4)","(-2,5)","(-2,6)","(-2,-1)","(-2,-2)","(-2,-3)","(-2,-4)","(-2,-5)","(-2,-6)"],
  ["(3,1)", "(3,2)","(3,3)","(3,4)","(3,5)","(3,6)","(3,-1)","(3,-2)","(3,-3)","(3,-4)","(3,-5)","(3,-6)"],
  ["(-3,1)", "(-3,2)","(-3,3)","(-3,4)","(-3,5)","(-3,6)","(-3,-1)","(-3,-2)","(-3,-3)","(-3,-4)","(-3,-5)","(-3,-6)"],
  ["(4,1)", "(4,2)","(4,3)","(4,4)","(4,5)","(4,6)","(4,-1)","(4,-2)","(4,-3)","(4,-4)","(4,-5)","(4,-6)"],
  ["(-4,1)", "(-4,2)","(-4,3)","(-4,4)","(-4,5)","(-4,6)","(-4,-1)","(-4,-2)","(-4,-3)","(-4,-4)","(-4,-5)","(-4,-6)"],
  ["(5,1)", "(5,2)","(5,3)","(5,4)","(5,5)","(5,6)","(5,-1)","(5,-2)","(5,-3)","(5,-4)","(5,-5)","(5,-6)"],
  ["(-5,1)", "(-5,2)","(-5,3)","(-5,4)","(-5,5)","(-5,6)","(-5,-1)","(-5,-2)","(-5,-3)","(-5,-4)","(-5,-5)","(-5,-6)"],
  ["(6,1)", "(6,2)","(6,3)","(6,4)","(6,5)","(6,6)","(6,-1)","(6,-2)","(6,-3)","(6,-4)","(6,-5)","(6,-6)"],
  ["(-6,1)", "(-6,2)","(-6,3)","(-6,4)","(-6,5)","(-6,6)","(-6,-1)","(-6,-2)","(-6,-3)","(-6,-4)","(-6,-5)","(-6,-6)"],
]

const ScrambleTable = props => {
  return(
  <table >
    <tbody >
      <tr >
        <td><h4 className="display-linebreak megaminx" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>{props.megaminxScramble}</h4></td>
      </tr>
    </tbody>
  </table>
  )
}

class TimerInterface extends Component {
  state = {
    start: 0,
    final: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    millisecondsTwo: 0,
    going: false, 
    timerFormatted: "0:00.000",
    displayTimeFormatted: "0:00.000",
    twoFormatted: 0,
    solves: [],
    scramble: "",
    megaminxScramble: "",
    multiBLDScramble: "",
    preventStartLoop: 0,
    preventStartLoopMobile: 0,
    aoNum: 5, 
    countDown: this.props.inspectionTime,
    isDisableSpacebar: false,
    isCountDownActivated: false,
    isCountDownGoing: false,
    endMS: 0,
    isMobileGoing: false,
  }

  converter(input, isFormat) {
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
    if (isFormat === true){
      this.timerFormatted("timerFormatted")
      this.timerFormatted("displayTimeFormatted")
      this.timerFormatted("twoFormatted")
    }
  }

  timerFormatted(stateValue){
    let time = ""
    if (this.state.hours > 0){
      time += this.state.hours + ":"
    }
    if (stateValue === "timerFormatted"){
      time += this.state.minutes + ":"
      if (this.state.seconds < 10) {
        time += "0" 
      }
    }
    if(stateValue==="displayTimeFormatted"){
      if (this.state.minutes>0){
        time += this.state.minutes + ":"
        if (this.state.seconds < 10) {
          time += "0" 
        }
      }
    }
    if (stateValue === "twoFormatted"){
      time += this.state.seconds + 2  + "."
    } else{
      time += this.state.seconds  + "."
    }
    if (this.state.milliseconds < 10){
      time += "00"
    }
    if (this.state.milliseconds < 100){
      if (this.state.milliseconds > 9){
        time += "0"
      }
    }
    time += this.state.milliseconds
    if (stateValue === "timerFormatted"){
      this.setState({
        timerFormatted: time,
      })
    }
    if (stateValue === "displayTimeFormatted"){
      this.setState({
        displayTimeFormatted: time,
      })
    }
    if (stateValue === "twoFormatted"){
      this.setState({
        twoFormatted: time,
      })
    }
  }

  isDisableSpacebar = () =>{
    this.setState({
      isDisableSpacebar: !this.state.isDisableSpacebar
    })
    
  }

  isCountDownGoing = () => {
    this.setState({
      isCountDownGoing: !this.state.isCountDownGoing
    })
  } 

  begin = (e) => {
    if(e.keyCode === 32){
      if (JSON.parse(localStorage.getItem("countDown")) === false){
        if (!this.state.going) {
          if(this.state.preventStartLoop % 2===0){
            this.props.isNewSessionFunction(false)
            this.setState({
                final: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
                start: Date.now(),
                going: true,
            })
            this.interval = setInterval(()=>this.time(), 1)
            this.interval2 = setInterval(()=>this.converter(this.state.final) ,1)
            this.interval3 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
          }    
        }
      }
    }
  }

  preventStartLoopMobile = () => {
    this.setState({
      preventStartLoopMobile: this.state.preventStartLoopMobile+1
    })
  }

  beginMobile = () => {
    this.preventStartLoopMobile()
    if (JSON.parse(localStorage.getItem("countDown")) === false){
      if (!this.state.going) {
        if(this.state.preventStartLoopMobile % 2===0){
          if(this.props.isBackgroundLight){
            document.getElementById("colorClick").style.backgroundColor="whitesmoke";
          }else{
            document.getElementById("colorClick").style.backgroundColor="rgb(23, 23, 23)";
          }
          this.props.isNewSessionFunction(false)
          this.setState({
              final: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
              start: Date.now(),
              going: true,
          })
          this.interval4 = setInterval(()=>this.time(), 1)
          this.interval5 = setInterval(()=>this.converter(this.state.final) ,1)
          this.interval6 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
          this.setState({
            isMobileGoing: true
          })
        }
      }
    }else{
      this.countDownRunMobile()
    }
  }

  getCountDownNumber = () => {
    this.setState({
      countDown: this.props.inspectionTime
    })
  }

  stopMobile = () => {
    const doAll = async () => {
        await this.stopMobile2()
        await this.stopMobile3()
    };
    doAll();
};

  stopMobile2 = () => {
    if(this.state.going===true) {
      if(this.state.preventStartLoopMobile % 2!==0){
        let endMS = Date.now() - this.state.start
        this.setState({
          endMS: endMS
        })
        if (this.state.isDisableSpacebar){
          this.isDisableSpacebar()
        }
        if (JSON.parse(localStorage.getItem("countDown")) === true){
          clearInterval(this.countdownInterval)
          this.getCountDownNumber()
        }
        clearInterval(this.interval4)
        clearInterval(this.interval5)
        clearInterval(this.interval6)
      }
    }
  }

  countDownRunMobile = () => {
    //function runs if count down is activated 
    //runs count down
    if(!this.state.isDisableSpacebar){
      if (!this.state.isMobileGoing) {
        if(this.state.preventStartLoopMobile % 2===0){
          this.setState({
            isMobileGoing: true,
            // going: true,
          })
          this.isDisableSpacebar()
          this.isCountDownGoing()
          setTimeout(()=>this.isCountDownGoing(), this.props.inspectionTime * 1000)
          this.countdownInterval = setInterval(()=>this.countDown(), 1000)
          setTimeout(()=>this.timerStartMobile(),this.props.inspectionTime * 1000)
        }
      }
    }
  }

  timerStartMobile = () => {
    this.setState({
      endMS: 0,
      final: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      start: Date.now(),
      going: true,
    })
    this.interval4 = setInterval(()=>this.time(), 1)
    this.interval5 = setInterval(()=>this.converter(this.state.final) ,1)
    this.interval6 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
  }

  stopMobile3 = () => {
    this.converter(this.state.endMS, true)
    let solveid = ""
      solveid+=Date.now()
      if (this.props.id){
        this.sendResults(solveid, this.state.endMS)
      }
      let allSolves = []
      for (const solve of this.props.solves){
        if (solve.puzzle === this.props.puzzleType){
          allSolves.push(solve.milliseconds)
        }
      }
      allSolves.sort(this.compareMilliseconds)
      let halfDate = ""
      let fullDate = ""
      let d = new Date()
      fullDate += d.getFullYear() + "-"
      if ((d.getMonth() + 1) < 10){
        fullDate += "0"
      }
      fullDate += d.getMonth() + 1 + "-"
      if ((d.getDate()) < 10){
        fullDate += "0"
      }
      fullDate += d.getDate()
      fullDate += "T00:00:00.000Z"
      halfDate += d.getFullYear() + "-"
      if ((d.getMonth() + 1) < 10){
        halfDate += "0"
      }
      halfDate += d.getMonth() + 1 + "-"
      if ((d.getDate) < 10){
        halfDate += "0"
      }
      halfDate += d.getDate()

      let minimumTime = 0
      if (this.props.puzzleType==="3x3"){
        minimumTime=1100
      }
      if (this.props.puzzleType==="4x4"){
        minimumTime=5000
      }
      if (this.props.puzzleType==="5x5"){
        minimumTime=10000
      }
      if (this.props.puzzleType==="6x6"){
        minimumTime=10000
      }
      if (this.props.puzzleType==="7x7"){
        minimumTime=10000
      }
      if (this.props.puzzleType==="3x3 BLD"){
        minimumTime=5000
      }
      if (this.props.puzzleType==="3x3 OH"){
        minimumTime=2000
      }
      if (this.props.puzzleType==="Clock"){
        minimumTime=500
      }
      if (this.props.puzzleType==="Megaminx"){
        minimumTime=2000
      }
      if (this.props.puzzleType==="Square-1"){
        minimumTime=1000
      }
      if (this.props.puzzleType==="4x4 BLD"){
        minimumTime=3000
      }
      if (this.props.puzzleType==="5x5 BLD"){
        minimumTime=4000
      }
      let unix = Math.round(new Date().getTime() / 1000)
      const solveData = {}
      solveData["id"] = this.props.id
      solveData["solve"] = this.state.displayTimeFormatted
      if (this.props.puzzleType==="Megaminx"){
        solveData["scramble"] = this.state.megaminxScramble 
      }else if (this.props.puzzleType==="Multi-BLD"){
        solveData["scramble"] = this.state.multiBLDScramble
      }else{
        solveData["scramble"] = this.state.scramble
      }
      solveData["milliseconds"] = String(this.state.endMS)
      solveData["isplustwo"] = false
      solveData["isdnf"] = false
      solveData["date"] = halfDate
      solveData["solveid"] = solveid
      solveData["plustwo"] = this.state.twoFormatted
      solveData["millisecondstwo"]= String(this.state.endMS + 2000)
      solveData["session"] = this.props.sessions
      solveData["unix"] = new Date().getTime()
      solveData["puzzle"] = this.props.puzzleType
      solveData["sessionname"]=this.props.sessionName
      solveData["temporary"] = true
      this.setState({
        solves: [solveData, ...this.state.solves],
        going: false,
        isMobileGoing: false,
      })
      const finalSolve = {}
      finalSolve["id"] = this.props.id
      finalSolve["solve"] = this.state.displayTimeFormatted
      if (this.props.puzzleType==="Megaminx"){
        finalSolve["scramble"] = this.state.megaminxScramble
      }else if (this.props.puzzleType==="Multi-BLD"){
        finalSolve["scramble"] = this.state.multiBLDScramble
      }else{
        finalSolve["scramble"] = this.state.scramble
      }
      finalSolve["milliseconds"] = String(this.state.endMS)
      finalSolve["isplustwo"] = false
      finalSolve["isdnf"] = false
      finalSolve["date"] = fullDate
      finalSolve["solveid"] = solveid
      finalSolve["plustwo"] = this.state.twoFormatted
      finalSolve["millisecondstwo"]=String(this.state.endMS + 2000)
      finalSolve["session"] = this.props.sessions
      finalSolve["unix"] = String(unix)
      finalSolve["puzzle"] = this.props.puzzleType
      finalSolve["sessionname"]=this.props.sessionName
      setTimeout(()=>this.props.getSolveFromInterface(finalSolve),10)
      this.rand(this.props.puzzleType)
      if (this.state.final < allSolves[0] && this.state.endMS > minimumTime){
        if(allSolves.length>75){
          this.props.confettiLaunch()
        }
      }
  }

  stop = (e) => {
    if(this.state.going===true) {
      if (e.keyCode===32) {
        let endMS = Date.now() - this.state.start
        let allSolves = []
        for (const solve of this.props.solves){
          if (solve.puzzle === this.props.puzzleType){
            allSolves.push(solve.milliseconds)
          }
        }
        allSolves.sort(this.compareMilliseconds)
        let halfDate = ""
        let fullDate = ""
        let d = new Date()
        fullDate += d.getFullYear() + "-"
        if ((d.getMonth() + 1) < 10){
          fullDate += "0"
        }
        fullDate += d.getMonth() + 1 + "-"
        if ((d.getDate()) < 10){
          fullDate += "0"
        }
        fullDate += d.getDate()
        fullDate += "T00:00:00.000Z"
        halfDate += d.getFullYear() + "-"
        if ((d.getMonth() + 1) < 10){
          halfDate += "0"
        }
        halfDate += d.getMonth() + 1 + "-"
        if ((d.getDate) < 10){
          halfDate += "0"
        }
        halfDate += d.getDate()
        this.timerFormatted("timerFormatted")
        if (this.state.isDisableSpacebar){
          this.isDisableSpacebar()
        }
        if (JSON.parse(localStorage.getItem("countDown")) === true){
          clearInterval(this.countdownInterval)
          this.getCountDownNumber()
        }
        clearInterval(this.interval)
        clearInterval(this.interval2)
        clearInterval(this.interval3)
        this.converter(endMS)
        this.timerFormatted("timerFormatted")
        this.timerFormatted("displayTimeFormatted")
        this.timerFormatted("twoFormatted")
        let solveid = ""
        solveid+=Date.now()
        if (this.props.id){
          this.sendResults(solveid, endMS)
        }
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
        solveData["solve"] = this.state.displayTimeFormatted
        if (this.props.puzzleType==="Megaminx"){
          solveData["scramble"] = this.state.megaminxScramble 
        }else if (this.props.puzzleType==="Multi-BLD"){
          solveData["scramble"] = this.state.multiBLDScramble
        }else{
          solveData["scramble"] = this.state.scramble
        }
        solveData["milliseconds"] = String(endMS)
        solveData["isplustwo"] = false
        solveData["isdnf"] = false
        solveData["date"] = halfDate
        solveData["solveid"] = solveid
        solveData["plustwo"] = this.state.twoFormatted
        solveData["millisecondstwo"]= String(endMS + 2000)
        solveData["session"] = this.props.sessions
        solveData["unix"] = new Date().getTime()
        solveData["puzzle"] = this.props.puzzleType
        solveData["sessionname"]=this.props.sessionName
        solveData["temporary"] = true
        this.setState({
          solves: [solveData, ...this.state.solves],
          going: false,
          endMS: endMS,
        })

        const finalSolve = {}
        finalSolve["id"] = this.props.id
        finalSolve["solve"] = this.state.displayTimeFormatted
        if (this.props.puzzleType==="Megaminx"){
          finalSolve["scramble"] = this.state.megaminxScramble
        }else if (this.props.puzzleType==="Multi-BLD"){
          finalSolve["scramble"] = this.state.multiBLDScramble
        }else{
          finalSolve["scramble"] = this.state.scramble
        }
        finalSolve["milliseconds"] = String(this.state.endMS)
        finalSolve["isplustwo"] = false
        finalSolve["isdnf"] = false
        finalSolve["date"] = fullDate
        finalSolve["solveid"] = solveid
        finalSolve["plustwo"] = this.state.twoFormatted
        finalSolve["millisecondstwo"]=String(this.state.endMS + 2000)
        finalSolve["session"] = this.props.sessions
        finalSolve["unix"] = String(unix)
        finalSolve["puzzle"] = this.props.puzzleType
        finalSolve["sessionname"]=this.props.sessionName
        setTimeout(()=>this.props.getSolveFromInterface(finalSolve),10)
        this.rand(this.props.puzzleType)
        if (this.state.final < allSolves[0] && this.state.endMS > minimumTime){
          if(allSolves.length>75){
            this.props.confettiLaunch()
          }
        }
      }
    }
  }

  compareMilliseconds = (a,b) => {
    return a - b
  }


  isCountDownActivated = () => {
    this.setState({
      isCountDownActivated: !this.state.isCountDownActivated
    })
  }

  countDownRun = (e) => {
    //function runs if count down is activated 
    //runs count down
    if(e.keyCode === 32){
      if (JSON.parse(localStorage.getItem("countDown")) === true){
        if(!this.state.isDisableSpacebar){
          if (!this.state.going) {
            if(this.state.preventStartLoop % 2===0){
              this.setState((prevState)=>({
                preventStartLoop: prevState.preventStartLoop+1
              }))
              this.isDisableSpacebar()
              this.isCountDownGoing()
              setTimeout(()=>this.isCountDownGoing(), this.props.inspectionTime * 1000)
              this.countdownInterval = setInterval(()=>this.countDown(), 1000)
              setTimeout(()=>this.timerStart(),this.props.inspectionTime * 1000)
            }    
          }
        }
      }
    }
  }

  preventStartLoop = (e) => {
    if(e.keyCode===32){
      if(!this.state.isDisableSpacebar){
        this.setState((prevState)=>({
          preventStartLoop: prevState.preventStartLoop+1
        }))
      }
    }
  }

  countDown = () => {
    this.setState({
      countDown: this.state.countDown - 1
    })
  }

  sendResults = (solveid, endMS) => {
    // sends each solve to db after timer is stopped
    let submitScramble = this.state.scramble
    if (this.state.megaminxScramble) {
      submitScramble = this.state.megaminxScramble
    }
    if (this.state.multiBLDScramble) {
      submitScramble = this.state.multiBLDScramble
    }
    fetch("https://blooming-hollows-98248.herokuapp.com/results",{
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        milliseconds: endMS,
        solve: this.state.displayTimeFormatted,
        scramble: submitScramble,
        id: this.props.id,
        session: this.props.sessions,
        unix: Math.floor(new Date().getTime() / 1000),
        date: moment().format(),
        sessionname: this.props.sessionName,
        puzzle: this.props.puzzleType,
        solveid: solveid,
        plustwo: this.state.twoFormatted,
        isplustwo: false,
        isdnf: false,
        millisecondstwo: endMS + 2000 
      })
    })
    .then(response => response.json())
  }

  deleteDB = (index) => {
    //removes individual solves from database
    fetch("https://blooming-hollows-98248.herokuapp.com/deletedb", {
      method: "delete",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        solveid: this.state.solves[index].solveid,
        solve: this.state.solves[index].solve
      })
    }) 
    .then(response=>response.json())
  }

  timerStart = () => {
    this.setState({
      endMS: 0,
      final: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      start: Date.now(),
      going: true,
    })
    this.interval = setInterval(()=>this.time(), 1)
    this.interval2 = setInterval(()=>this.converter(this.state.final) ,1)
    this.interval3 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
  }

  resetCountDown = () => {
    this.setState({
      countDown: 5
    })
  }

  newSession = () => {
    // calls newSesssionApp and removes solves from interface
    this.props.newSessionApp()
    this.setState({
      solves: []
    })
  }

  rand(input) {
    //generates scramble
    if (input){
      let scramble = ""
      let x = this.props.scrambleQuantity
      let pastScrambles = {
        pastScramble: null,
        pastScramble2: null,
      }
      while (x > 0) {
          const onefour = [0,1,2,3,4,5]
          const fourfour = [0,1,2,3]
          const fivefour = [0,1,2,3,4]
          const sixfour = [0,1,2,3,4,5,6,7,8,9,10,11,12]
          x--
          let first =  onefour[Math.floor(Math.random()*onefour.length)]
          let second = Math.floor(Math.random()*3)
          if (input==="2x2"||input==="3x3" || input==="3x3 BLD" ||input==="3x3 OH"){
            if (pastScrambles.pastScramble !== null){
              let i = onefour.indexOf(pastScrambles.pastScramble)
              onefour.splice(i, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let ind = onefour.indexOf(pastScrambles.pastScramble2)
              onefour.splice(ind, 1)
            }
            first =  onefour[Math.floor(Math.random()*onefour.length)]
            scramble += twothree[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if (input==="4x4" || input==="4x4 BLD"||input==="5x5" || input==="5x5 BLD"){
            if (pastScrambles.pastScramble !== null){
              let a = onefour.indexOf(pastScrambles.pastScramble)
              onefour.splice(a, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let b = onefour.indexOf(pastScrambles.pastScramble2)
              onefour.splice(b, 1)
            }
            first =  onefour[Math.floor(Math.random()*onefour.length)]
            second = Math.floor(Math.random()*6)
            scramble += fourfive[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if (input==="6x6"||input==="7x7"){
            if (pastScrambles.pastScramble !== null){
              let c = onefour.indexOf(pastScrambles.pastScramble)
              onefour.splice(c, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let d = onefour.indexOf(pastScrambles.pastScramble2)
              onefour.splice(d, 1)
            }
            first =  onefour[Math.floor(Math.random()*onefour.length)]
            second = Math.floor(Math.random()*9)
            scramble += sixseven[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if(input === "Pyraminx"){
            if (pastScrambles.pastScramble !== null){
              let e = fourfour.indexOf(pastScrambles.pastScramble)
              fourfour.splice(e, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let f = fourfour.indexOf(pastScrambles.pastScramble2)
              fourfour.splice(f, 1)
            }
            first =  fourfour[Math.floor(Math.random()*fourfour.length)]
            second = Math.floor(Math.random()*4)
            scramble += pyraminxNotation[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if(input === "Skewb"){
            if (pastScrambles.pastScramble !== null){
              let g = fivefour.indexOf(pastScrambles.pastScramble)
              fivefour.splice(g, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let h = fivefour.indexOf(pastScrambles.pastScramble2)
              fivefour.splice(h, 1)
            }
            first =  fivefour[Math.floor(Math.random()*fivefour.length)]
            second = Math.floor(Math.random()*2)
            scramble += skewb[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if(input === "Square-1"){
            if (pastScrambles.pastScramble !== null){
              let k = sixfour.indexOf(pastScrambles.pastScramble)
              sixfour.splice(k, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let l = sixfour.indexOf(pastScrambles.pastScramble2)
              sixfour.splice(l, 1)
            }
            first =  sixfour[Math.floor(Math.random()*sixfour.length)]
            second = Math.floor(Math.random()*12)
            scramble += sq1[first][second]
            if (x>0){
              scramble+="/"
            }
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          scramble += " " 
        }
        if (input==="Clock") {
          scramble += "UR"
          scramble+= this.clockPuzzle()
          scramble += "DR"
          scramble+= this.clockPuzzle()
          scramble += "UR"
          scramble+= this.clockPuzzle()
          scramble += "DL"
          scramble+= this.clockPuzzle()
          scramble += "UL"
          scramble+= this.clockPuzzle()
          scramble += "U"
          scramble+= this.clockPuzzle()
          scramble += "R"
          scramble+= this.clockPuzzle()
          scramble += "D"
          scramble+= this.clockPuzzle()
          scramble += "L"
          scramble+= this.clockPuzzle()
          scramble += "ALL"
          scramble+= this.clockPuzzle()
          scramble += "y"
          scramble+= this.clockPuzzle()
          scramble += "U"
          scramble+= this.clockPuzzle()
          scramble += "R"
          scramble+= this.clockPuzzle()
          scramble += "D"
          scramble+= this.clockPuzzle()
          scramble += "L"
          scramble+= this.clockPuzzle()
          scramble += "ALL"
          scramble+= this.clockPuzzle()
        }

        let megaminxScramble = ""
        if (input==="Megaminx"){
          let letters = ["D", "R", "D", "R", "D", "R", "D", "R", "D", "R", "U"]
          for (let i = 7; i>0; i--){
            for (const letter of letters){
              let chance = Math.ceil(Math.random()*2)
              if (letter==="D" || letter==="R"){
                megaminxScramble += letter 
                if (chance === 1){
                  megaminxScramble += "++ "
                }else {
                  megaminxScramble += "-- "
                }
              }
              if (letter==="U"){
                megaminxScramble += letter 
                if (chance===1){
                  megaminxScramble += "'"
                }else{
                  megaminxScramble += "" 
                }
              }
            }
            megaminxScramble += "\n"
          }
        }
        let multiBLD = ""
        if (input==="Multi-BLD"){
          let pastScrambleObj = {
            pastScramble: null,
            pastScramble2: null
          }
          let countMultiBLD = 1
          while (countMultiBLD < 6) {
            let y = this.props.scrambleQuantity
            multiBLD += countMultiBLD + ")"
            multiBLD += " "
            while(y>0){
              const onefour = [0,1,2,3,4,5]
              if (pastScrambleObj.pastScramble !== null){
                let i2 = onefour.indexOf(pastScrambleObj.pastScramble)
                onefour.splice(i2, 1)
              }
              if (pastScrambleObj.pastScramble2 !== null){
                let ind2 = onefour.indexOf(pastScrambleObj.pastScramble2)
                if (ind2 !== -1){
                  onefour.splice(ind2, 1)
                }
              }
              let first2 =  onefour[Math.floor(Math.random()*onefour.length)]
              let second2 = Math.floor(Math.random()*3)
              multiBLD += twothree[first2][second2]
              multiBLD += " "
              pastScrambleObj["pastScramble2"] = pastScrambleObj.pastScramble
              pastScrambleObj["pastScramble"] = first2
              y--
            }
            multiBLD+= "\n"
            countMultiBLD++
          }
        }
      this.setState({
        multiBLDScramble: String(multiBLD),
        scramble: String(scramble),
        megaminxScramble: String(megaminxScramble),
      })
    }
  }

  clockPuzzle = () => {
    let one = Math.ceil(Math.random()*1)
    let two = Math.ceil(Math.random()*5)
    let numbers = [1,2,3,4,5,6]
    let scramble = ""
    scramble += numbers[two]
    if (one === 1){
      scramble+= "+ "
    }else{
      scramble += "- "
    }
    return(scramble)
  }

  time(){
    let timeElapsed = Date.now() - this.state.start
    this.setState({
      final: timeElapsed,
    })
  }

  removeTime = (index, solveid, milliseconds) => {
    //removes time from interface only
    if (this.props.isConfirmSolveDelete) {
      let confirm = window.confirm("Are you sure you would like to remove this solve? Action cannot be undone.")
      if (confirm){
        const { solves } = this.state;
        this.props.removeSolveFromState(solveid, milliseconds)
        this.setState({
          solves: solves.filter((solve, i) => { 
            return i !== index;
          })
        });
        this.deleteDB(index)
      }
    }else{
      const { solves } = this.state;
        this.props.removeSolveFromState(solveid, milliseconds)
        this.setState({
          solves: solves.filter((solve, i) => { 
            return i !== index;
          })
        });
        this.deleteDB(index)
    }
    this.removeButtonFocus()
  }


  loadPastSessionSolveData = (session) => {
    //when component mounts, session saved on local storage is displayed
    if(this.props.id){
      this.setState({
        solves: []
      })

      let allSolves = []
      this.props.solves.map(solve=>{
        if (session === solve.session){
          allSolves = [solve, ...allSolves]
          this.props.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
          this.props.isSessionNameFunc(solve.sessionname)
        }
        return(null)
      })
      this.setState({
        solves: allSolves
      })
    }
  }

  removeButtonFocus = () => {
    let removeFocus = document.getElementsByClassName("remove")
    for (const button of removeFocus){
      button.blur()
    }
  }

  removeButtonFocusPlusTwo = () => {
    let removeFocus = document.getElementsByClassName("remove2")
    for(const button of removeFocus){
      button.blur()
    }
  }

  removeButtonFocusDNF = () => {
    let removeFocus = document.getElementsByClassName("remove3")
    for (const button of removeFocus) {
      button.blur()
    }
  }

  togglePlusTwoInterface = (input) => {
    this.props.togglePlusTwo(input)
    let xyz = []
    this.state.solves.map(solve=>{
      let x = solve.isplustwo
      if (solve.solveid === input && solve.temporary){
        solve["isplustwo"] = !x
      }
      xyz = [...xyz, solve]
      return(null)
    })
    this.setState({
      solves: xyz
    })
    this.removeButtonFocusPlusTwo()
  }

  toggleDNFInterface = (input) => {
    this.props.toggleDNF(input)
    let xyz = []
    for (const solve of this.state.solves){
      if (solve.solveid === input){
        let x = !solve.isdnf
        solve["isdnf"] = !x
        if (solve.temporary){
          let x = !solve.isdnf
        solve["isdnf"] = x
        }
        fetch("https://blooming-hollows-98248.herokuapp.com/dnf", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.props.id,
            isdnf: !x,
            solveid: solve.solveid,
          })
        }).then(response=>response.json())
        .then(
          
        )
      }
      xyz = [...xyz, solve]
    }
    this.setState({
      solves: xyz
    })
    this.removeButtonFocusDNF()
  }

  color = () => {
    if(this.props.isBackgroundLight){
      document.getElementById("colorClick").style.backgroundColor="rgb(217, 217, 217)";
    }else{
      document.getElementById("colorClick").style.backgroundColor="rgb(51, 51, 50)";
    }
  }

  colorRegular = () => {
    if(document.getElementById("colorClick")){
      if(document.getElementById("colorClick").style.backgroundColor==="rgb(51, 51, 50)"){
        document.getElementById("colorClick").style.backgroundColor="rgb(23, 23, 23)";
      }
      if(document.getElementById("colorClick").style.backgroundColor==="rgb(217, 217, 217)"){
        document.getElementById("colorClick").style.backgroundColor="whitesmoke";
      }
    }
  }

  render() {   
    return (
      <div>
        {
          this.state.isCountDownGoing ? 
          <div className="center absolute-center">
            <h5 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>{this.state.countDown}</h5>
          </div>
          :
        <div style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
          <h1 id="light">
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
              {this.props.isSignedIn 
              ? <div id="padRight">
                <button onClick={this.props.dashboard} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">{this.props.username}</button>
              </div>
              :
              <div id="padRight" >
                <button onClick={this.props.signIn} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Sign In</button>  
              </div>
              }
            </nav>
          </h1>
          <div className=" display-linebreak">
            <h3 className="tc">{this.state.scramble}</h3> 
            <div className="summary-center">
              <ScrambleTable 
              isBackgroundLight={this.props.isBackgroundLight}
              megaminxScramble={this.state.megaminxScramble}
              />
            </div>
            <h4 className="display-linebreak tc">{this.state.multiBLDScramble}</h4>
          </div>
          <div className="tc" >
            <h1 className="br3 ba mv4 w-50 w-25-1 mw5 center">{this.state.timerFormatted}</h1>
          </div>
          <div style={{borderTop: this.props.isBackgroundLight ? "rgb(23, 23, 23) .1px solid" : "whitesmoke .1px solid",  borderBottom: this.props.isBackgroundLight ? "rgb(23, 23, 23) .1px solid" : "whitesmoke .1px solid"}}>
            <Scroll >
            <Table 
            toggleDNFInterface={this.toggleDNFInterface}
            togglePlusTwo={this.togglePlusTwoInterface}
            plusTwo={this.plusTwo} 
            solves={this.state.solves} 
            removeTime={this.removeTime} 
            styles={this.props.isBackgroundLight}/>
            </Scroll >
          </div>
          {this.state.isMobileGoing ? 
          <h5 className="timerButton summary-center"><button onMouseDown={this.stopMobile} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">STOP</button></h5>
          :
          <h5 className="timerButton summary-center"><button id="colorClick" onMouseDown={()=>this.color("RGB(51, 51, 50)")} onMouseUp={this.beginMobile} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">START</button></h5>
          }
          <div id="light">
            {
            this.props.isSessionName 
            ?
            (this.props.id
            ? 
            <div id="average">
              <h2>Session: {this.props.sessionInterface} | {this.props.sessionName} | {this.props.puzzleType}</h2>
            </div>
            :
            <h2> </h2>)
            :
            (this.props.id
              ? 
              <div id="average">
              <h2>Session: {this.props.sessionInterface} | {this.props.puzzleType} </h2>
              </div>
              :
              <h2> </h2>)
            }
            <Average 
            solves={this.state.solves} 
            /> 
            <CustomAverage  aoNum={this.props.aoNum} solves={this.state.solves} />
          </div>
            {
              this.props.id ? 
              <h1 id="light"><button onClick={this.newSession} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">New Session</button></h1>
              :
              <h1> </h1>
            }
        </div>
        }
      </div>
    )
  }



  componentDidMount() {
    this.props.getInspectionTimeOnMount()
    setTimeout(()=>this.getCountDownNumber(),1)
    setTimeout(()=>this.loadPastSessionSolveData(this.props.sessions),500)
    setTimeout(()=>this.props.getTheme(),1)
    document.addEventListener('mouseup', this.colorRegular)
    document.addEventListener('keyup', this.begin)
    document.addEventListener('keyup', this.countDownRun)
    document.addEventListener('keydown', this.stop)
    document.addEventListener('keyup', this.preventStartLoop)
    setTimeout(()=>this.rand(this.props.puzzleType),300)
  }
}

export default TimerInterface;
