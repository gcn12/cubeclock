import React, {Component} from 'react';
import './TimerInterface.css';
import Table from "./Table"
import Scroll from './Scroll';
import Average from './Average';
import CustomAverage from './CustomAverage';
import Scramble from './ScrambleDisplay';
import CountDown from './CountDown';
import moment from "moment"
import MobileTimer from './MobileTimer';
import HeaderContent from './HeaderContent';
import Footer from './Footer';
import ButtonTop from './ButtonTop';
import ButtonBottom from './ButtonBottom';
import TimerClock from "./TimerClock"


window.onkeydown = function(e) { 
  return !(e.keyCode === 32 && e.target === document.body);
}; 

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
    preventStartLoop: false,
    preventStartLoopMobile: 0,
    aoNum: 5, 
    countDown: 0,
    isDisableSpacebar: false,
    isCountDownActivated: false,
    isCountDownGoing: false,
    endMS: 0,
    isMobileGoing: false,
    countingDown: false,
    keyPressOne: false,
    keyPressTwo: false,
    test: false,
    isDisplayScrambleSmall: false,
    isDisplayScrambleMedium: false,
    disableCommand: false,
    beginAfterDelayMobile: false,
    beginAfterDelay: false,
    isGreen: false,
    preventCommand:false,
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
    if (!this.props.isTimerDisabled){
      this.interval3 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
    }
  }

  begin = (e) => {
    const loop = () => {
      this.setState({
        preventStartLoop: false
      })
    }
    if(e.keyCode === 32){
        this.getCountDownNumber()
      if(!this.state.isDisableSpacebar){
        if (!this.state.going) {
          if(!this.state.preventStartLoop){
            if (!this.state.countingDown){
              if(Number(this.state.countDown)===0){
                if(this.state.beginAfterDelay){
                  this.beginFunction()
                }
              }
            }    
          }else{
            setTimeout(()=>loop(),50)
          }
        }
      }
    }
  }

  beginFunction = () => {
    if(this.props.solves!=="loading..."){
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
      if (!this.props.isTimerDisabled){
        this.interval3 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
      }
    }
  }

  isDisableSpacebar = () =>{
    this.setState({
      isDisableSpacebar: !this.state.isDisableSpacebar
    })
  }

  startTimerDuringCountDown = (e) => {
    //function runs if count down is activated 
    //runs count down
    if (this.state.countingDown) {
      this.beginFunction()
      this.setState({
        isCountDownGoing: false,
        countingDown: false,
        keyPressOne: false,
        keyPressTwo: false,
      })
      if(!this.state.disableCommand){
        this.setState({
          //here
          preventStartLoop: true,
        })
      }
      this.setState({
        disableCommand: false,
      })
      
      clearTimeout(this.countDownGoing)
      clearInterval(this.countdownInterval)
      clearTimeout(this.startTimer)
      clearTimeout(this.disable)
      clearTimeout(this.commandFalse)
    }    
  } 


  stop = (e) => {
    if(this.state.going===true) {
      if (!this.state.countingDown){
        if (e.keyCode===32||(!this.state.keyPressOne && !this.state.keyPressTwo && (e.keyCode===91||e.keyCode===93||e.keyCode===17))) {
          if(!this.state.isDisableSpacebar){
            let endMS = Date.now() - this.state.start
            let allSolves = []
            for (const solve of this.props.solves){
              if (solve.puzzle === this.props.puzzleType){
                allSolves.push(solve.milliseconds)
              }
            }
            allSolves.sort(this.compareMilliseconds)
            let halfDate = moment.unix(Math.round(new Date().getTime() / 1000)).format("YYYY-MM-DD");
            this.timerFormatted("timerFormatted")
            clearInterval(this.countdownInterval)
            this.getCountDownNumber()
            clearInterval(this.interval)
            clearInterval(this.interval2)
            clearInterval(this.interval3)
            this.converter(endMS)
            this.timerFormatted("timerFormatted")
            this.timerFormatted("displayTimeFormatted")
            this.timerFormatted("twoFormatted")
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
            solveData["solve"] = this.state.displayTimeFormatted
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
            solveData["plustwo"] = this.state.twoFormatted
            solveData["millisecondstwo"]= String(endMS + 2000)
            solveData["session"] = this.props.sessions
            solveData["unix"] = String(unix)
            solveData["puzzle"] = this.props.puzzleType
            solveData["sessionname"]=this.props.sessionName
            solveData["temporary"] = true
            this.setState({
              solves: [solveData, ...this.state.solves],
              going: false,
              endMS: endMS,
              beginAfterDelay: false,
            })
            let offline = JSON.parse(localStorage.getItem("offline"))
            this.props.getInterfaceSolvesSingle(solveData)
  
            const finalSolve = {}
            finalSolve["id"] = this.props.id
            finalSolve["solve"] = this.state.displayTimeFormatted
            if (this.props.puzzleType==="Megaminx"){
              finalSolve["scramble"] = this.props.megaminxScramble
            }else if (this.props.puzzleType==="Multi-BLD"){
              finalSolve["scramble"] = this.props.multiBLDScramble
            }else{
              finalSolve["scramble"] = this.props.scrambleRegular
            }
            finalSolve["milliseconds"] = String(this.state.endMS)
            finalSolve["isplustwo"] = false
            finalSolve["isdnf"] = false
            finalSolve["date"] = halfDate
            finalSolve["solveid"] = solveid
            finalSolve["plustwo"] = this.state.twoFormatted
            finalSolve["millisecondstwo"]=String(this.state.endMS + 2000)
            finalSolve["session"] = this.props.sessions
            finalSolve["unix"] = String(unix)
            finalSolve["puzzle"] = this.props.puzzleType
            finalSolve["sessionname"]=this.props.sessionName
            let sendToDB = [...this.props.solves, finalSolve]
            this.send(sendToDB)
            if(offline){
              localStorage.setItem("offlinesolves", JSON.stringify({"solves": [...sendToDB]}))
            }
            setTimeout(()=>this.props.getSolveFromInterface(finalSolve),10)
            if (this.state.final < allSolves[0] && this.state.endMS > minimumTime){
              if(allSolves.length>75){
                this.props.confettiLaunch()
              }
            }
          }
          this.props.scramble(this.props.puzzleType)
        }
      }
    }
  }

  countDownRunFunction = () => {
    if(!this.state.isDisableSpacebar){
      if (!this.state.going) {
        if(!this.state.preventStartLoop){
          if (!this.state.countingDown){
            this.getCountDownNumber()
            if(!this.state.disableCommand){
              // here
              this.setState({
                preventStartLoop: false,
              })
            }
            this.setState({
              going: true,
              countingDown: true,
            })
            this.isDisableSpacebar()
            this.isCountDownGoing()
            this.countDownGoing =  setTimeout(()=>this.isCountDownGoing(), this.props.inspectionTime * 1000)
            this.countdownInterval = setInterval(()=>this.countDown(), 1000)
            this.startTimer =  setTimeout(()=>this.timerStart(),this.props.inspectionTime * 1000)
            this.runCountingDown =  setTimeout(()=>this.countingDown(),this.props.inspectionTime * 1000)
            this.disable = setTimeout(()=>this.isDisableSpacebar(),this.props.inspectionTime * 1000)
          }
        }    
      }
    }
  }

  countDownRun = (e) => {
    //function runs if count down is activated 
    //runs count down
    if(e.keyCode === 32){
      if(this.state.countDown>0){
        if(!this.state.test){
          if(this.state.beginAfterDelay){
            this.countDownRunFunction()
            if(this.state.going){
              this.setState({
                test: true,
                
              })
            }
          }
        }else{
          this.startTimerDuringCountDown()
          this.setState({
            test: false,
            isDisableSpacebar: false,
          })
        }
      }
    }
  }

  // preventStartLoop = (e) => {
  //   if(e.keyCode===32){
  //     if(!this.state.isDisableSpacebar){
  //       this.setState({
  //         preventStartLoop: false
  //       })
  //     }
  //   }
  //   if((e.keyCode===91||e.keyCode===93||e.keyCode===17)&&(!this.state.keyPressOne&&!this.state.keyPressTwo)){
  //     if(!this.state.countingDown){
  //       if(!this.state.going){
  //         if(this.state.preventStartLoop!==0){
  //           this.setState({
  //             preventStartLoop: this.state.preventStartLoop + 1
  //           })
  //         }
  //       }
  //     }
  //   }
  // }

  beginAfterDelay = (e) => {
    if(!this.props.isManualEnter){
      if(e.keyCode===32||(this.state.keyPressOne && this.state.keyPressTwo && (e.keyCode===91||e.keyCode===93||e.keyCode===17))){
        if(!this.state.preventStartLoop){
          const delay = () => {
            this.setState({
              beginAfterDelay: true,
            })
          }
          const green = () => {
            if(document.getElementById("timer-color-change")){
              
              if(!this.props.isManualEnter){
                this.props.isBackgroundLight ? 
                document.getElementById("timer-color-change").style.color="RGB(58, 199, 81)"
                :
                document.getElementById("timer-color-change").style.color="RGB(49, 163, 68)"
              }
            }
          }
          // const red = () => {
          //   document.getElementById("timer-color-change").style.color="RGB(255, 20, 20)"
          // }
          this.delayTimeout = setTimeout(()=> delay(), 300)
          this.greenTimeout = setTimeout(()=> green(), 300)
          // red()
        }
      }
    }
  }

  beginAfterDelaySafety = (e) => {
    if (e.keyCode===32||((e.keyCode===91||e.keyCode===93||e.keyCode===17))) {
      clearTimeout(this.delayTimeout)
      clearTimeout(this.greenTimeout)
      if(!this.state.preventStartLoop){
        //here
        // this.setState({
        //   preventStartLoop: this.state.preventStartLoop-1
        // })
      }
      if(document.getElementById("timer-color-change")){
        if(!this.props.isManualEnter){
          if(!this.state.countingDown){
            this.props.isBackgroundLight ? 
            setTimeout(()=>document.getElementById("timer-color-change").style.color="black",250)
            :
            setTimeout(()=>document.getElementById("timer-color-change").style.color="white",250)
          }
        }
      }
    }
  }











  startTimerDuringCountDownMobile = () => {
    this.setState({
      isMobileGoing: true,
      isCountDownGoing: false,
    })
    this.timerStartMobile()
    clearInterval(this.countdownInterval)
    clearTimeout(this.countDownRouteMobile)
    clearTimeout(this.timerMobileTimeout)
  }

  stopMobileRoute = () => {
    const route2 = () => {
      this.setState({
        isMobileGoing: false,
      })
    }
    setTimeout(()=>route2(),200)
  }

  stopMobile = () => {
    const doAll = async () => {
        await this.stopMobile2()
        await this.stopMobile3()
    };
    if(this.state.going===true) {
      if(this.state.preventStartLoopMobile % 2!==0){
    doAll();
      }
    }
};

  stopMobile2 = () => {
    if(this.state.going===true) {
      if(this.state.preventStartLoopMobile % 2!==0){
        this.preventStartLoopMobile()
        let endMS = Date.now() - this.state.start
        this.setState({
          endMS: endMS,
          beginAfterDelayMobile: false,
        })
        if (this.state.isDisableSpacebar){
          this.isDisableSpacebar()
        }
        clearInterval(this.countdownInterval)
        this.getCountDownNumber()
        clearInterval(this.interval4)
        clearInterval(this.interval5)
        clearInterval(this.interval6)
      }
    }
  }

  stopMobile3 = () => {
    this.converter(this.state.endMS, true)
    let solveid = ""
      solveid+=Date.now()
      let allSolves = []
      for (const solve of this.props.solves){
        if (solve.puzzle === this.props.puzzleType){
          allSolves.push(solve.milliseconds)
        }
      }
      allSolves.sort(this.compareMilliseconds)
      let halfDate = moment.unix(Math.round(new Date().getTime() / 1000)).format("YYYY-MM-DD");
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
        solveData["scramble"] = this.props.megaminxScramble 
      }else if (this.props.puzzleType==="Multi-BLD"){
        solveData["scramble"] = this.props.multiBLDScramble
      }else{
        solveData["scramble"] = this.props.scrambleRegular
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
        going: false,
        // isMobileGoing: false,
        isDisableSpacebar: false,
      })
      this.props.getInterfaceSolvesSingle(solveData)
      const finalSolve = {}
      finalSolve["id"] = this.props.id
      finalSolve["solve"] = this.state.displayTimeFormatted
      if (this.props.puzzleType==="Megaminx"){
        finalSolve["scramble"] = this.props.megaminxScramble
      }else if (this.props.puzzleType==="Multi-BLD"){
        finalSolve["scramble"] = this.props.multiBLDScramble
      }else{
        finalSolve["scramble"] = this.props.scrambleRegular
      }
      finalSolve["milliseconds"] = String(this.state.endMS)
      finalSolve["isplustwo"] = false
      finalSolve["isdnf"] = false
      finalSolve["date"] = halfDate
      finalSolve["solveid"] = solveid
      finalSolve["plustwo"] = this.state.twoFormatted
      finalSolve["millisecondstwo"]=String(this.state.endMS + 2000)
      finalSolve["session"] = this.props.sessions
      finalSolve["unix"] = String(unix)
      finalSolve["puzzle"] = this.props.puzzleType
      finalSolve["sessionname"]=this.props.sessionName
      this.props.send([...this.props.solves, finalSolve])
      let offline = JSON.parse(localStorage.getItem("offline"))
      if(offline){
        localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...this.props.solves, finalSolve]}))
      }
      setTimeout(()=>this.props.getSolveFromInterface(finalSolve),10)
      this.props.scramble(this.props.puzzleType)
      if (this.state.final < allSolves[0] && this.state.endMS > minimumTime){
        if(allSolves.length>75){
          this.props.confettiLaunch()
        }
      }
  }

  countDownRunMobile = () => {
    //function runs if count down is activated 
    //runs count down
    if(!this.state.isDisableSpacebar){
      if (!this.state.isMobileGoing) {
        if(this.state.preventStartLoopMobile % 2===0){
          this.getCountDownNumber()
          this.setState({
            isMobileGoing: true,
            // going: true,
          })
          this.isDisableSpacebar()
          this.isCountDownGoing()
          this.countDownRouteMobile = setTimeout(()=>this.isCountDownGoing(), this.props.inspectionTime * 1000)
          this.countdownInterval = setInterval(()=>this.countDown(), 1000)
          this.timerMobileTimeout = setTimeout(()=>this.timerStartMobile(),this.props.inspectionTime * 1000)
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
    if (!this.props.isTimerDisabled){
      this.interval6 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
    }
  }

  beginMobile = () => {
    if(this.props.solves!=="loading..."){
      
      clearTimeout(this.changeColor)
      this.getCountDownNumber()
      if(this.state.beginAfterDelayMobile){
        this.preventStartLoopMobile()
        if(this.props.inspectionTime===0){
          if (!this.state.going) {
            if(this.state.preventStartLoopMobile % 2===0){
              if(this.props.isBackgroundLight){
                document.getElementById("colorClick").style.backgroundColor="whitesmoke";
                document.getElementById("colorClick2").style.backgroundColor="whitesmoke";
              }else{
                document.getElementById("colorClick").style.backgroundColor="rgb(23, 23, 23)";
                document.getElementById("colorClick2").style.backgroundColor="rgb(23, 23, 23)";
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
                isDisableSpacebar: true,
              })
              this.interval4 = setInterval(()=>this.time(), 1)
              this.interval5 = setInterval(()=>this.converter(this.state.final) ,1)
              if (!this.props.isTimerDisabled){
                this.interval6 = setInterval(()=>this.timerFormatted("timerFormatted") ,1)
              }
              this.setState({
                isMobileGoing: true
              })
            }
          }
        }else{
          this.countDownRunMobile()
        }
      }
    }
  }

  converter = (input, isFormat) => {
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

  sendToSolves = (input) => {
    this.setState({
      solves: input
    })
  }

  isCountDownGoing = () => {
    this.setState({
      isCountDownGoing: !this.state.isCountDownGoing
    })
  } 

  preventStartLoopMobile = () => {
    this.setState({
      preventStartLoopMobile: this.state.preventStartLoopMobile+1
    })
  }

  getCountDownNumber = () => {
    this.setState({
      countDown: this.props.inspectionTime
    })
  }

  

  compareMilliseconds = (a,b) => {
    return a - b
  }


  isCountDownActivated = () => {
    this.setState({
      isCountDownActivated: !this.state.isCountDownActivated
    })
  }

  countingDown = () => {
    this.setState({
      countingDown: false
    })
  }

  countDown = () => {
    this.setState({
      countDown: this.state.countDown - 1
    })
  }

  send = (input) => {
    //testing storing all solves in one cell
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(!offline){
      fetch("https://blooming-hollows-98248.herokuapp.com/sendsolves",{
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.props.id,
          solves: {"allsolves": input},
        })
      }).then(response=>response.json())
    }
  }

  deleteDB = (index) => {
    //removes individual solves from database
    fetch("https://blooming-hollows-98248.herokuapp.com/deletedb", {
      method: "delete",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        solveid: this.props.solvesInterface[index].solveid,
        solve: this.props.solvesInterface[index].solve
      })
    }) 
    .then(response=>response.json())
    this.props.removeSolveFromSolvesState(this.props.solvesInterface[index].solveid, this.props.solvesInterface[index].milliseconds)
  }

  newSession = () => {
    // calls newSesssionApp and removes solves from interface
    this.props.newSessionApp()
    this.setState({
      solves: []
    })
  }

  time(){
    let timeElapsed = Date.now() - this.state.start
    this.setState({
      final: timeElapsed,
    })
  }

  removeTime = (index, solveid, milliseconds, solve, solveNumber) => {
    //removes time from interface only
    if (this.props.isConfirmSolveDelete) {
      let confirm = window.confirm(`Solve ${solveNumber} \n${solve} \nAre you sure you would like to remove this solve? Action cannot be undone.`)
      if (confirm){
        this.props.removeSolveFromState(solveid, milliseconds)
      }
    }else{
      this.props.removeSolveFromState(solveid, milliseconds)
    }
    this.removeButtonFocus()
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
    for (const solve of this.props.solvesInterface){
      let x = solve.isplustwo
      if (solve.solveid === input ){
        solve["isplustwo"] = x
      }
      if (solve.solveid === input &&solve.temporary){
        solve["isplustwo"] = !x
      }
      xyz = [...xyz, solve]
    }
    this.props.getInterfaceSolves(xyz)
    this.removeButtonFocusPlusTwo()
  }

  toggleDNFInterface = (input) => {
    this.props.toggleDNF(input)
    let xyz = []
    for (const solve of this.props.solvesInterface){
      if (solve.solveid === input){
        let x = !solve.isdnf
        solve["isdnf"] = !x
        if (solve.temporary){
          let x = !solve.isdnf
          solve["isdnf"] = x
        }
      }
      xyz = [...xyz, solve]
    }
    this.props.getInterfaceSolves(xyz)
    this.removeButtonFocusDNF()
  }

  color = () => {
    if(this.props.solves!=="loading..."){
      const colorChange = () => {
        if(this.props.isBackgroundLight){
          document.getElementById("colorClick").style.backgroundColor="rgb(224, 84, 74)";
          document.getElementById("colorClick2").style.backgroundColor="rgb(224, 84, 74)";
        }else{
          document.getElementById("colorClick").style.backgroundColor="rgb(135, 47, 41)";
          document.getElementById("colorClick2").style.backgroundColor="rgb(135, 47, 41)";
        }
        this.setState({
          beginAfterDelayMobile: true,
        })
      }
      // this.delayMobile = setTimeout(()=> beginAfterDelayMobile(),275)
      this.changeColor = setTimeout(()=>colorChange(), 275)
    }
  }

  colorRegular = () => {
    if(document.getElementById("colorClick")){
      if(document.getElementById("colorClick").style.backgroundColor==="rgb(135, 47, 41)"){
        document.getElementById("colorClick").style.backgroundColor="rgb(23, 23, 23)";
      }
      if(document.getElementById("colorClick").style.backgroundColor==="rgb(224, 84, 74)"){
        document.getElementById("colorClick").style.backgroundColor="whitesmoke";
      }
    }
    if(document.getElementById("colorClick2")){
      if(document.getElementById("colorClick2").style.backgroundColor==="rgb(135, 47, 41)"){
        document.getElementById("colorClick2").style.backgroundColor="rgb(23, 23, 23)";
      }
      if(document.getElementById("colorClick2").style.backgroundColor==="rgb(224, 84, 74)"){
        document.getElementById("colorClick2").style.backgroundColor="whitesmoke";
      }
    }
  }


  keyPressSafetyUndo = (e) => {
    if (e.keyCode===93 || e.keyCode===91){
      if(!this.state.keyPressOne||!this.state.keyPressTwo){
        if(!this.state.going){
          this.setState({
            keyPressOne: false,
            keyPressTwo: false,
          })
        }
      }
    }
    if (e.keyCode===17){
      if(!this.state.keyPressOne||!this.state.keyPressTwo){
        if(!this.state.going){
          this.setState({
            keyPressOne: false,
            keyPressTwo: false,
          })
        }
      }
    }
  }

  keyPressSafety = (e) => {
    if (!this.state.going){
      if(!this.state.countingDown){
        if(!this.state.preventStartLoop){
          if (e.keyCode===91){
            this.setState({
              keyPressOne: true
            })
          }
          if (e.keyCode===93){
            this.setState({
              keyPressTwo: true
            })
          }
          if(e.keyCode===17){
            if(!this.state.keyPressOne){
              this.setState({
                keyPressOne: true
              })
            }else{
              this.setState({
                keyPressTwo: true
              })
            }
          }
        }
      }
    }
  }
  
  

  keyPressStart = (e) => {
    this.getCountDownNumber()
    const loop = () => {
      this.setState({
        preventStartLoop: false
      })
    }
    const stopDelay = () => {
      this.setState({
        beginAfterDelay: false,
      })
    }
    if(!this.props.isManualEnter){
      if(e.keyCode===93||e.keyCode===91||e.keyCode===17){
        if(this.state.preventStartLoop){
          if(!this.state.isCountDownGoing){
            setTimeout(()=>loop(),50)
          }
        }
        if(this.state.countingDown){
          this.startTimerDuringCountDown()
        }
        if (!this.state.going){
          if (this.state.keyPressOne && this.state.keyPressTwo){
            if(!this.state.preventStartLoop){
              if(!this.state.preventCommand){
                if(this.state.beginAfterDelay){

                  if(Number(this.state.countDown)===0){
                    this.setState({
                      //here
                      preventStartLoop: true,
                      preventCommand: true
                    })
                    this.beginFunction() 
                  }else{
                    this.countDownRunFunction()
                    this.setState({
                      preventStartLoop: true,
                      disableCommand: true,
                      keyPressOne: false,
                      keyPressTwo: false,
                    })
                    setTimeout(()=>this.keyPressTrue(), this.props.inspectionTime*1000)
                    this.commandFalse = setTimeout(()=>this.disableCommandFalse(), this.props.inspectionTime*1000)
                  }
                }else{
                  setTimeout(()=>clearTimeout(stopDelay()),301)
                }
              }
            }
          }
        }
      }
    }
  }

  disableCommandFalse = () => {
    this.setState({
      disableCommand: false
    })
  }

  keyPressTrue = () => {
    this.setState({
      keyPressOne: true,
      keyPressTwo: true,
    })
  }

  keyPressSafetyUndoStop = (e) => {
    if (e.keyCode===93 || e.keyCode===91){
      if(!this.state.keyPressOne||!this.state.keyPressTwo){
        if(this.state.going){
          this.setState({
            keyPressOne: true,
            keyPressTwo: true,
          })
        }
      }
    }
    if (e.keyCode===17){
      if(!this.state.keyPressOne||!this.state.keyPressTwo){
        if(this.state.going){
          this.setState({
            keyPressOne: true,
            keyPressTwo: true,
          })
        }
      }
    }
  }

  keyPressSafetyStop = (e) => {
    if (this.state.going){
      if (e.keyCode===91){
        this.setState({
          keyPressOne: false,
          keyPressTwo: false,
        })
      }
      if (e.keyCode===93){
        this.setState({
          keyPressTwo: false,
          keyPressOne: false,
        })
      }
      if (e.keyCode===17){
        this.setState({
          keyPressTwo: false,
          keyPressOne: false,
        })
      }
    }
  }

  keyPressStop = (e) => {
    const preventCommand1 = () => {
      this.setState({
        preventCommand: false,
      })
    }
    if (this.state.going){
      if (e.keyCode===91 || e.keyCode===93){
        setTimeout(()=>preventCommand1(),350)
        if (!this.state.keyPressOne || !this.state.keyPressTwo){
          this.setState({
            isDisableSpacebar: false
          })
          this.stop(e)
        }
      }
      if (e.keyCode===17){
        setTimeout(()=>preventCommand1(),350)
        if (!this.state.keyPressOne || !this.state.keyPressTwo){
          this.stop(e)
        }
      }
    }
  }

  test = () => {
    console.log(this.state.beginAfterDelayMobile)
  }

  render() {   
    return (
      <div>
        {/* <button onClick={this.test}>test</button> */}
        {
        this.state.isCountDownGoing ? 
        <CountDown 
        isBackgroundLight={this.props.isBackgroundLight}
        startTimerDuringCountDownMobile={this.startTimerDuringCountDownMobile}
        countDown={this.state.countDown}
        />
        :
        (
        this.state.isMobileGoing ?
        <MobileTimer 
        timerFormatted={this.state.timerFormatted}
        isBackgroundLight={this.props.isBackgroundLight}
        stopMobile={this.stopMobile}
        stopMobileRoute={this.stopMobileRoute}
        isTimerDisabled={this.props.isTimerDisabled}
        />         
        :
        <div style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
          <HeaderContent 
          isMobileGoing={this.state.isMobileGoing}
          isSignedIn={this.props.isSignedIn}
          isBackgroundLight={this.props.isBackgroundLight}
          dashboard={this.props.dashboard}
          username={this.props.username}
          signIn={this.props.signIn}
          />
          <div style={{ position:"relative"}}>
            <Scramble 
            isDisplayScrambleSmall={this.props.isDisplayScrambleSmall}
            isDisplayScrambleMedium={this.props.isDisplayScrambleMedium}
            scrambleRegular={this.props.scrambleRegular}
            isBackgroundLight={this.props.isBackgroundLight}
            megaminxScramble={this.props.megaminxScramble}
            multiBLDScramble={this.props.multiBLDScramble}
            />

            <TimerClock 
            isBackgroundLight={this.props.isBackgroundLight}
            id={this.props.id}
            solvesApp={this.props.solves}
            send={this.props.send}
            getSolveFromInterface={this.props.getSolveFromInterface}
            getInterfaceSolvesSingle={this.props.getInterfaceSolvesSingle}
            solves={this.state.solves}
            sendToSolves={this.sendToSolves}
            sessionName={this.props.sessionName}
            sessions={this.props.sessions}
            twoFormatted={this.state.twoFormatted}
            megaminxScramble={this.props.megaminxScramble}
            scrambleRegular={this.props.scrambleRegular}
            scramble={this.props.scramble}
            multiBLDScramble={this.props.multiBLDScramble}
            puzzleType={this.props.puzzleType}
            displayTimeFormatted={this.state.displayTimeFormatted}
            converter={this.converter}
            isManualEnter={this.props.isManualEnter}
            timerFormatted={this.state.timerFormatted}
            />
          </div>


          <ButtonTop 
          isManualEnter={this.props.isManualEnter}
          isMobileGoing={this.props.isMobileGoing}
          isMobile={this.props.isMobile}
          beginMobile={this.beginMobile}
          color={this.color}
          isBackgroundLight={this.props.isBackgroundLight}
          />


          {this.state.isMobileGoing ? 
            <div></div>
            :
            <Scroll isBackgroundLight={this.props.isBackgroundLight} isMobile={this.props.isMobile}>
              <Table 
              solvesApp={this.props.solves}
              id={this.props.id}
              aoNum2={this.props.aoNum2} 
              aoNum={this.props.aoNum} 
              toggleDNFInterface={this.toggleDNFInterface}
              togglePlusTwo={this.togglePlusTwoInterface}
              plusTwo={this.plusTwo} 
              solves={this.props.solvesInterface} 
              removeTime={this.removeTime} 
              styles={this.props.isBackgroundLight}/>
            </Scroll >
          }
          <ButtonBottom 
          isManualEnter={this.props.isManualEnter}
          isMobileGoing={this.props.isMobileGoing}
          isMobile={this.props.isMobile}
          beginMobile={this.beginMobile}
          color={this.color}
          isBackgroundLight={this.props.isBackgroundLight}/> 

          <div id="light">
            <Footer 
            isSessionName={this.props.isSessionName}
            id={this.props.id}
            sessionInterface={this.props.sessionInterface}
            sessionName={this.props.sessionName}
            puzzleType={this.props.puzzleType}
            />
            <Average 
            solves={this.props.solvesInterface} 
            /> 
            <CustomAverage  
            aoNum={this.props.aoNum} 
            solves={this.props.solvesInterface} 
            />
            {
            this.props.id ? 
              <h1 ><button  onClick={this.newSession} style={{marginLeft:"1rem", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">New Session</button></h1>
            :
            <h1> </h1>
            }
          </div>
          <br></br>
        </div>
        )
        }
      </div>
    )
  }



  componentDidMount() {
    setTimeout(()=>this.getCountDownNumber(),1)
    setTimeout(()=>this.props.getTheme(),1)
    document.addEventListener('mouseup', this.colorRegular)
    document.addEventListener('touchend', this.colorRegular)
    document.addEventListener('keyup', this.begin)
    document.addEventListener('keyup', this.countDownRun)
    document.addEventListener('keydown', this.stop)
    document.addEventListener('keyup', this.preventStartLoop)
    document.addEventListener('keydown', this.keyPressStop)
    document.addEventListener('keydown', this.keyPressSafetyStop)
    document.addEventListener('keydown', this.keyPressSafety)
    document.addEventListener('keyup', this.keyPressStart)
    document.addEventListener('keyup', this.keyPressSafetyUndo)
    document.addEventListener('keyup', this.keyPressSafetyUndoStop)
    document.addEventListener('keyup', this.beginAfterDelaySafety)
    document.addEventListener('keydown', this.beginAfterDelay)
  }
}

export default TimerInterface;
