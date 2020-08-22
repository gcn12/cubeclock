import React, {Component} from 'react';
import TimerInterface from "../src/TimerInterface/TimerInterface"
import Dashboard from "../src/Dashboard/Dashboard"
import NewSessionOptions from "./NewSessionOptions"
import "./App.css"
import Register from './NewRegister';
import SignIn from './NewSignIn';
import confetti from 'canvas-confetti';

class App extends Component {
  state = {
    isHome: true,
    isRegistered: false,
    isSignedIn: false,
    isDashboard: false,
    isBackgroundLight: true,
    backgroundColor: "",
    user: {
      username: "",
      id: "",
    },
    scrambleQuantity: 22,
    sessions: "",
    uniqueSessionsDB: [],
    sessionInterface: "",
    aoNum: 5,
    aoNum2: 12,
    isCountDownActivated: false,
    inspectionTime: 0,
    puzzleType: "3x3",
    isCreateNewSession: false,
    sessionName: null,
    isSessionName: false,
    isConfirmSolveDelete: false,
    isConfirmSessionDelete: false,
    solves: [],
    isNewSession: false,
    solvesInterface: [],
    isMobile: false,
    isTimerDisabled: false,
    isOffline: false, 
    isGetSolvesOnMount: false,
    multiBLDScramble: "",
    scramble: "",
    megaminxScramble: "",
    isDisplayScrambleMedium: false,
    isDisplayScrambleSmall: false,
    isManualEnter: false,
  }

  receive = () => {
    let offline = false
    if (localStorage.offline){
      offline = JSON.parse(localStorage.getItem("offline"))
    }
    if(this.state.user.id.length>0){
      if(!this.isGetSolvesOnMount){
        if(!offline){
          this.setState({
            solves: "loading..."
          })
          fetch("https://blooming-hollows-98248.herokuapp.com/receive",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          }).then(response=>response.json())
          .then(data=>{
            let parsedData = []
            if(data.length>0){
              // console.log((data[0].solves))
              // console.log(JSON.parse("{\"solves\":\"{\\\"allsolves\\\":[{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"0.369\\\",\\\"scramble\\\":\\\"R U2 L2 U2 F R U L B2 D B2 R2 D2 F' R' U L2 U2 B' D2 F L U2 \\\",\\\"milliseconds\\\":\\\"369\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-08\\\",\\\"solveid\\\":\\\"1596938498865\\\",\\\"plustwo\\\":\\\"2.369\\\",\\\"millisecondstwo\\\":\\\"2369\\\",\\\"session\\\":1,\\\"unix\\\":\\\"1596938499\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"0.303\\\",\\\"scramble\\\":\\\"B U2 L U' B2 R' U' B L U2 B' L2 D B2 R U' B R U L' U2 B2 R2 \\\",\\\"milliseconds\\\":\\\"303\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-08\\\",\\\"solveid\\\":\\\"1596938563803\\\",\\\"plustwo\\\":\\\"2.303\\\",\\\"millisecondstwo\\\":\\\"2303\\\",\\\"session\\\":1,\\\"unix\\\":\\\"1596938564\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"18.831\\\",\\\"scramble\\\":\\\"B' L U2 F L U2 B' L D2 B2 L' D' F' L' D2 B2 R D B L' D2 F' L2 \\\",\\\"milliseconds\\\":\\\"18831\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597110976183\\\",\\\"plustwo\\\":\\\"20.831\\\",\\\"millisecondstwo\\\":\\\"20831\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597110976\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"22.060\\\",\\\"scramble\\\":\\\"D2 L2 F2 U F' L' U B' R D2 F' R D L2 D2 F2 L' U B D2 L2 D B \\\",\\\"milliseconds\\\":\\\"22060\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597111029899\\\",\\\"plustwo\\\":\\\"24.060\\\",\\\"millisecondstwo\\\":\\\"24060\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597111030\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"18.222\\\",\\\"scramble\\\":\\\"B U2 L' D' B' R2 D' L2 D2 F L U' F D2 L U2 F2 R2 D' L' F D2 B \\\",\\\"milliseconds\\\":\\\"18222\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597111085706\\\",\\\"plustwo\\\":\\\"20.222\\\",\\\"millisecondstwo\\\":\\\"20222\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597111086\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"24.099\\\",\\\"scramble\\\":\\\"L' B' D' L U2 B L U B D' L2 B D2 R2 U F' D B R U2 B L U2 \\\",\\\"milliseconds\\\":\\\"24099\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597111142679\\\",\\\"plustwo\\\":\\\"26.099\\\",\\\"millisecondstwo\\\":\\\"26099\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597111143\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"27.765\\\",\\\"scramble\\\":\\\"F2 U B D F R D F2 R D2 B R' U2 F2 R' D' B L' D2 F R' U2 L2 \\\",\\\"milliseconds\\\":\\\"27765\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":true,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597111197697\\\",\\\"plustwo\\\":\\\"29.765\\\",\\\"millisecondstwo\\\":\\\"29765\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597111198\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null},{\\\"id\\\":\\\")c#|=23U63b$7^\\\",\\\"solve\\\":\\\"26.828\\\",\\\"scramble\\\":\\\"F U R U B' R2 U2 F L2 U' B' R U2 B' D2 F R2 D' B L2 D' F2 L \\\",\\\"milliseconds\\\":\\\"26828\\\",\\\"isplustwo\\\":false,\\\"isdnf\\\":false,\\\"date\\\":\\\"2020-08-10\\\",\\\"solveid\\\":\\\"1597111347463\\\",\\\"plustwo\\\":\\\"28.828\\\",\\\"millisecondstwo\\\":\\\"28828\\\",\\\"session\\\":2,\\\"unix\\\":\\\"1597111347\\\",\\\"puzzle\\\":\\\"3x3\\\",\\\"sessionname\\\":null}]}\"}"))
              if(data[0].solves){
                parsedData = JSON.parse(data[0].solves).allsolves
              }
            }
            this.getSolvesOnMountPrevent()
            this.setState({
              solves: parsedData
            })
            let sessions = []
            if(parsedData.length>0){
              sessions = parsedData.map(solves => solves.session)
            }
            if (sessions.length === 0) {
              this.addToUniqueSessionsDBOnMount(1)
              this.getSessionNumber(1)
              this.getInterfaceSession(1)
              this.props.scramble("3x3")
              } else if (parsedData.length===0){
                this.getInterfaceSession(1)
                this.props.scramble("3x3")
                }else{
                  this.addToUniqueSessionsDBOnMount(Array.from(new Set(sessions)).reverse())
                  this.getSessionNumber(Math.max.apply(Math,sessions))
                  this.getInterfaceSession(Array.from(new Set(sessions)).length)
                  this.getInterfaceSolves([])
                    let allSolves = []
                    for (const solve of parsedData){
                      if (Math.max.apply(Math,sessions) === solve.session){
                        allSolves = [solve, ...allSolves]
                        this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
                        this.isSessionName(solve.sessionname)
                        this.props.scramble(solve.puzzle)
                      }
                    }
              this.getInterfaceSolves(allSolves)
            }
          })
        }else{
          let solves = localStorage.getItem("offlinesolves")
          solves = JSON.parse(solves).solves
          this.setState({
            solves: solves
          })
          let sessions = solves.map(solves => solves.session)
          if (sessions.length === 0) {
            this.addToUniqueSessionsDBOnMount(1)
            this.getSessionNumber(1)
            this.getInterfaceSession(1)
            this.props.scramble("3x3")
          } else if (solves.length===0){
            this.getInterfaceSession(1)
            this.props.scramble("3x3")
          }else{
            this.addToUniqueSessionsDBOnMount(Array.from(new Set(sessions)).reverse())
            this.getSessionNumber(Math.max.apply(Math,sessions))
            this.getInterfaceSession(Array.from(new Set(sessions)).length)
            this.getInterfaceSolves([])
            let allSolves = []
            for (const solve of solves){
              if (Math.max.apply(Math,sessions) === solve.session){
                allSolves = [solve, ...allSolves]
                this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
                this.isSessionName(solve.sessionname)
                this.props.scramble(solve.puzzle)
              }
            }
            this.getInterfaceSolves(allSolves)
          }
        }
      }
    }
  }

  getSolvesOnMountPrevent = () => {
    this.setState({
      isGetSolvesOnMount: true
    })
  }

  getUserInfo = () => {
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(!offline){
      if (this.state.user.id){
        fetch("https://blooming-hollows-98248.herokuapp.com/getuserinfo", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(data=>{
          this.setState({
            isConfirmSolveDelete: data.confirmsolve,
            isConfirmSessionDelete: data.confirmsession,
            inspectionTime: data.inspectiontime,
            isMobile: data.mobile,
            isCountDownActivated: data.inspection,
            isBackgroundLight: data.theme,
            scrambleQuantity: data.scramblelength,
            aoNum: data.aonumber, 
            aoNum2: data.aonumber2, 
            isTimerDisabled: data.disabletimer,
            isOffline: data.offline,
            isManualEnter: data.manualenter,
          })
          let theme = JSON.parse(localStorage.getItem("theme"))
          localStorage.setItem("manualenter", JSON.stringify(data.manualenter))
          localStorage.setItem("disabletimer", JSON.stringify(data.disabletimer))
          localStorage.setItem("inspectionTime", JSON.stringify(data.inspectiontime))
          localStorage.setItem("countDown", JSON.stringify(data.inspection))
          localStorage.setItem("scrambleLength", data.scramblelength)
          localStorage.setItem("theme", JSON.stringify(data.theme))
          localStorage.setItem("ao", JSON.stringify(data.aonumber))
          localStorage.setItem("ao2", JSON.stringify(data.aonumber2))
          localStorage.setItem("solveconfirm", JSON.stringify(data.confirmsolve))
          localStorage.setItem("sessionconfirm", JSON.stringify(data.confirmsession))
          localStorage.setItem("mobile", JSON.stringify(data.mobile))
          localStorage.setItem("offline", JSON.stringify(data.offline))
          if (data.theme !== theme){
            this.setState({
              isBackgroundLight: data.theme,
            })
            if (theme){
              this.dark()
            }else{
              this.light()
            }
            localStorage.setItem("theme", JSON.stringify(data.theme))
          }
        })
      }else{
        this.props.scramble("3x3")
      }
    }
    this.receive()
  }

  send = (input) => {
    //testing storing all solves in one cell
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(!offline){
      fetch("https://blooming-hollows-98248.herokuapp.com/sendsolves",{
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          solves: {"allsolves": input},
        })
      }).then(response=>response.json())
    }
  }

  getInterfaceSolves = (input) => {
    this.setState({
      solvesInterface: input
    })
  }

  getInterfaceSolvesSingle = (input) => {
    this.setState({
      solvesInterface: [...this.state.solvesInterface, input]
    })
  }

  isNewSessionFunction = (input) => {
    //checks to see if new session has just been created
    this.setState({
      isNewSession: input
    })
  }

  clearSessionInterfaceSolves = () => {
    this.setState({
      solvesInterface: []
    })
  }

  disableTimer = () => {
    //Toggles timer disable in database
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("disabletimer", JSON.stringify(!this.state.isTimerDisabled))
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/disabletimer", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          disabletimer: !this.state.isTimerDisabled,
        })
      }).then(response=>response.json())
    }
    this.setState({
      isTimerDisabled: !this.state.isTimerDisabled
    })
  }

  manualEnter = () => {
    //Toggles session delete confirm in database
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("manualenter", JSON.stringify(!this.state.isManualEnter))
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/manualenter", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          manualenter: !this.state.isManualEnter,
        })
      }).then(response=>response.json())
    }
    this.setState({
      isManualEnter: !this.state.isManualEnter
    })
  }

  confirmSessionDelete = () => {
    //Toggles session delete confirm in database
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("sessionconfirm", JSON.stringify(!this.state.isConfirmSessionDelete))
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/confirmsession", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          confirmSession: !this.state.isConfirmSessionDelete,
        })
      }).then(response=>response.json())
    }
    this.setState({
      isConfirmSessionDelete: !this.state.isConfirmSessionDelete
    })
  }

  mobileStartStop = () => {
    //Toggles mobile in database
    //If on, there is clickable start button
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("mobile", JSON.stringify(!this.state.isMobile))
      this.setState({
        isMobile: !this.state.isMobile
      })
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/mobile", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          mobile: !this.state.isMobile,
        })
      }).then(response=>response.json())
      .then(
        this.setState({
          isMobile: !this.state.isMobile
        })
      )
    }
  }

  confirmSolveDelete = () => {
    //Toggles solve delete confirm in database
    //If on, user is asked if they want to delete solves
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("solveconfirm", JSON.stringify(!this.state.isConfirmSolveDelete))
      this.setState({
        isConfirmSolveDelete: !this.state.isConfirmSolveDelete
      })
    }
    fetch("https://blooming-hollows-98248.herokuapp.com/confirmsolve", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: this.state.user.id,
        confirmSolve: !this.state.isConfirmSolveDelete,
      })
    }).then(response=>response.json())
    .then(
      this.setState({
        isConfirmSolveDelete: !this.state.isConfirmSolveDelete
      })
    )
  }

  removeFromSolves = (session) => {
    //Removes solves based on session parameter
    this.setState({
      solves: [...this.state.solves].filter(solve=>{
        return solve.session !== session
      })
    })
  }

  removeFromSolvesInterface = (session) => {
    //Removes solves based on session parameter
    this.setState({
      solvesInterface: [...this.state.solvesInterface].filter(solve=>{
        return solve.session !== session
      })
    })
  }

  getAllSolves = (input) => {
    this.setState({
      solves: input
    })
  }

  inspection = () => {
    //Toggles when inspection time runs or not
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("countDown", JSON.stringify(!this.state.isCountDownActivated))
      this.setState({
        isCountDownActivated: !this.state.isCountDownActivated
      })
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/inspection", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          inspection: !this.state.isCountDownActivated,
        })
      }).then(response=>response.json())
      .then(
        this.setState({
          isCountDownActivated: !this.state.isCountDownActivated
        })
      )
    }
  }

  isSessionName = (input) => {
    //updates state so that timer interface know whether 
    //or not to display session name
    if(input===null||input===""){
      this.setState({
        isSessionName: false,
      })
    }else{
      this.setState({
        isSessionName: true,
      })
    }
  }


  changeInspectionTime = (input) => {
    //increases inspection time
      let offline = JSON.parse(localStorage.getItem("offline"))
      if(offline){
        localStorage.setItem("inspectionTime", JSON.stringify(input))
      }else{
        fetch("https://blooming-hollows-98248.herokuapp.com/inspectiontime", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id,
            time: input
          })
        }).then(response=>response.json())
      }
      this.setState({
        inspectionTime: input
      })
    // }
  }

  removeFromUniqueSessionsDB = (input) => {
    let x
    if (this.state.uniqueSessionsDB.length>0){
      x = this.state.uniqueSessionsDB.filter(item => item !== input)
    }
    if(this.state.uniqueSessionsDB.length===0){
      x = [1]
      this.setState({
        sessionInterface: 1
      })
    }
    this.setState({
      uniqueSessionsDB: x
    })
  }

  addToUniqueSessionsDB = (input) => {
    if (this.state.uniqueSessionsDB.length===0){
      this.setState({
        uniqueSessionsDB: [1]
      })
    }else if (input.length>1){
      this.setState({
        uniqueSessionsDB: input
      })
    }else{
      this.setState({
        uniqueSessionsDB: [...this.state.uniqueSessionsDB,input]
      })
    }
  }

  addToUniqueSessionsDBOnMount = (input) => {
    if (input.length>1){
      this.setState({
        uniqueSessionsDB: input
      })
    }else if (input.length===1){
      this.setState({
        uniqueSessionsDB: [...this.state.uniqueSessionsDB,input]
      })
    }else{
      this.setState({
        uniqueSessionsDB: [1]
      })
    }
  }

  clearSolvesState = () => {
    this.setState({
      solves: []
    })
  }

  newSessionApp = () => {
    //changes route
    if(this.state.solves!=="loading..."){
      this.setState({
        isCreateNewSession: true
      })
    }
  }

  createNewSession = (input) => {
    //creates new session after options have been selected
    //and changes route
    this.setState({
      isCreateNewSession: false,
    })
    this.setState({
      puzzleType: input
    })
  }

  sessionName = (name) => {
    //updates session name on interface
    this.setState({
      sessionName: name
    })
  }

  signIn = () => {
    // route switch 
    this.setState ({
      isHome: !this.state.isHome,
    })
  }

  dashboard = () => {
    // route switch
    if(this.state.solves!=="loading..."){
      this.setState({
        isDashboard: !this.state.isDashboard,
        isHome: !this.state.isHome,
      })
    }
  }

  signedIn = () => {
    // route switch 
    this.setState ({
      isSignedIn: !this.state.isSignedIn,
    })
  }

  register = () => {
    //route switch
    this.setState ({
      isRegistered: !this.state.isRegistered,
    })
  }

  dark = () => {
    //changes theme to dark
    document.body.style.backgroundColor = "rgb(23,23,23)"
    this.setState({
      isBackgroundLight: false,
    })
    localStorage.setItem("theme", JSON.stringify(false))
  }

  light = () => {
    // changes theme to light
    document.body.style.backgroundColor = "whitesmoke"
    this.setState({
      isBackgroundLight: true,
    })
    localStorage.setItem("theme", JSON.stringify(true))
  }

  loadUser = (data) => {
    // loads user data when sign in successful
    this.setState ({ 
      user:{
        username: data.username,
        id: data.id,
      },
      scrambleQuantity: data.scramblelength,
      isBackgroundLight: data.theme,
      aoNum: data.aonumber,
      aoNum2: data.aonumber2,
      isCountDownActivated: data.inspection, 
      inspectionTime: data.inspectiontime,
      isMobile: data.mobile,
      isTimerDisabled: data.disabletimer,
      isConfirmSolveDelete: data.confirmsolve,
      isConfirmSessionDelete: data.confirmsession,
      isOffline: data.offline,
      isManualEnter: data.manualenter,
    })
    if(data.theme){
      document.body.style.backgroundColor = "whitesmoke"
    }else{
      document.body.style.backgroundColor = "rgb(23,23,23)"
    }
    this.receive()
    localStorage.setItem("manualenter", JSON.stringify(data.manualenter))
    localStorage.setItem("disabletimer", JSON.stringify(data.disabletimer))
    localStorage.setItem("inspectionTime", JSON.stringify(data.inspectiontime))
    localStorage.setItem("countDown", JSON.stringify(data.inspection))
    localStorage.setItem("scrambleLength", data.scramblelength)
    localStorage.setItem("theme", JSON.stringify(data.theme))
    localStorage.setItem("ao", JSON.stringify(data.aonumber))
    localStorage.setItem("ao2", JSON.stringify(data.aonumber2))
    localStorage.setItem("solveconfirm", JSON.stringify(data.confirmsolve))
    localStorage.setItem("sessionconfirm", JSON.stringify(data.confirmsession))
    localStorage.setItem("mobile", JSON.stringify(data.mobile))
    localStorage.setItem("offline", JSON.stringify(data.offline))
  }

  getTheme = () => {
    // gets theme from local storage
    if(this.state.user.id.length){
      if(localStorage.theme){
        let x = JSON.parse(localStorage.getItem("theme"))
        if (x !== true) {
          document.body.style.backgroundColor = "rgb(23,23,23)"
          this.setState({
            isBackgroundLight: x
          })
        }
      }
    }
  }

  signout = () => {
    //resets settings when signout clicked
    this.setState({
      user: {
        username: "",
        password: "",
        id: 0,
      },
      aoNum: 5, 
      aoNum2: 12,
      scrambleQuantity: 22,
      isSignedIn: false,
      isDashboard: false,
      isHome: true,
      isRegistered: false,
      isBackgroundLight: true,
      puzzleType: "3x3",
      solves: [],
      isCountDownActivated: false,
      inspectionTime: 0,
      solvesInterface: [],
      isMobile: false,
      isGetSolvesOnMount: false,
      isManualEnter: false,
    })
    document.body.style.backgroundColor = "whitesmoke"
    localStorage.removeItem("manualenter")
    localStorage.removeItem("mobile")
    localStorage.removeItem("sessionconfirm")
    localStorage.removeItem("theme")
    localStorage.removeItem("user")
    localStorage.removeItem("lastsession")
    localStorage.removeItem("isCountDownActivated")
    localStorage.removeItem("ao")
    localStorage.removeItem("ao2")
    localStorage.removeItem("inspectionTime") 
    localStorage.removeItem("solveconfirm")
    localStorage.removeItem("xyz")
    localStorage.removeItem("color")
    localStorage.removeItem("offline")
    localStorage.setItem("countDown", JSON.stringify(false))
    localStorage.setItem("scrambleLength", 22)
    this.props.scramble("3x3")
  }

  setScrambleLength = () => {
    //sets length of scramble stored in localStorage
    let scramble 
    if(localStorage.scrambleLength){
      scramble = Number(localStorage.getItem("scrambleLength"))
    }else{
      scramble = 22
    }
    this.setState({
      scrambleQuantity: scramble
    })
  }

  getSessionNameOnLoad = (name, puzzle) =>{
    //gets session name and puzzle type 
    if (name === null||name===""){
      this.setState({
        isSessionName: false,
      })
    }
    this.setState({
      sessionName: name,
      puzzleType: puzzle
    })
  }

  loadPastSessionSolveData = (session, index, boolean) => {
    //resumes session from saved solves list when clicked
    this.clearScramble()
    this.setState({
      sessions: session,
      sessionInterface: index,
      // sessions: session,
      // sessionInterface: index,
    })
    if(boolean===true){
      this.setState({
      isHome: true,
      isDashboard: false,
      })
    }
    let allSolves = []
      for (const solve of this.state.solves){
        if (session === solve.session){
          allSolves = [solve, ...allSolves]
          this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
          this.isSessionName(solve.sessionname)
          this.props.scramble(solve.puzzle)
        }
      }
      this.getInterfaceSolves(allSolves)
  }

  getSessionNumber = (input) => {
    this.setState({
      sessions: input
    })
  }

  getInterfaceSession = (input) => {
    this.setState({
      sessionInterface: input
    })
  }

  aoNumChange = (input) => {
    this.setState({
      aoNum: input
    })
  }

  aoNumChange2 = (input) => {
    this.setState({
      aoNum2: input
    })
  }

  getSolveFromInterface = (input) =>{
    //gets solve when timer stops
    //puts it into solve in state
    this.setState({
      solves: [...this.state.solves, input]
    })
  }

  getSolvesFromImportManual = (input) => {
    //gets solves when user manually imports
    let solves = [...this.state.solves, input]
    this.send(solves)
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...solves]}))
    }
    this.setState({
      solves: solves
    })
  }

  getSolvesFromImport = (input) => {
    let solves = [...this.state.solves.concat(...input)]
    this.send(solves)
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...solves]}))
    }
    this.setState({
      solves: solves
    })
  }

  fire = (particleRatio, opts, x) => {
    var count = 500;
    var defaults = {
      origin: { y: -.9, x:x },
      decay: 200,
      angle: 270,
      ticks: 300,
    };
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  confettiLaunch = () => {
    this.fire(0.25, {
      spread: 26,startVelocity: 55,
    },.5)
    this.fire(0.2, {
      spread: 60,
    },.5);
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
    },.5);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    },.5);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45,
    },.5);
    this.fire(0.25, 
      {spread: 26,
      startVelocity: 55,})
    this.fire(0.2, {
      spread: 60,
    },.8);
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
    },.8);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    },.8);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45,
    },.2);
    this.fire(0.25, 
      {spread: 26,
      startVelocity: 55,})
    this.fire(0.2, {
      spread: 60,
    },.2);
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
    },.2);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    },.2);
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45,
    },.2);
  }
  
  componentDidMount() {
    // console.log(Object.keys(localStorage))
    // console.log(localStorage)
    setTimeout(()=>this.getUserInfo(),10)
    if (localStorage.user){
      let y = JSON.parse(localStorage.getItem("user"))
      this.setState({
        user: y,
        isSignedIn: true,
      })
    }
  }

  removeSolveFromState = (solveid, milliseconds) => {
    //removes solve when user clicks "remove"
    //on interface page 
    let solves = this.state.solves.filter(solve=> {
      return solveid !== solve.solveid && milliseconds !== solve.milliseconds
    })
    this.setState({
      solvesInterface: this.state.solvesInterface.filter(solve=>{
        return solveid !== solve.solveid && milliseconds !== solve.milliseconds
      }),
      solves: solves
    })
    this.send(solves)
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...solves]}))
    }
  }

  removeSolveFromSolvesState = (solveid, milliseconds) => {
    //removes solve when user clicks "remove"
    //on interface page 
    this.setState({
      solves: this.state.solves.filter(solve=>{
        return solveid !== solve.solveid && milliseconds !== solve.milliseconds
      })
    })
  }

  togglePlusTwo = (input) => {
    let solves = []
    for(const solve of this.state.solves) {
      if (solve.solveid === input){
        let x = !solve.isplustwo
        solve["isplustwo"] = x
      }
      solves = [...solves, solve]
    }
    this.setState({
      solves: solves
    })
    this.send(solves)
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...solves]}))
    }
  }

  toggleDNF = (input) => {
    let xyz = []
    for (const solve of this.state.solves){
      if (solve.solveid === input){
        solve["isdnf"] = !solve.isdnf
      }
      xyz = [...xyz, solve]
    }
    this.setState({
      solves: xyz
    })
    this.send(xyz)
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves":[...xyz]}))
    }
  }
  
  getNewUsername = (input) => {
    this.setState({
      user: { 
        username: input,
        id: this.state.user.id
      }
    })
    localStorage.setItem("user", JSON.stringify(this.state.user))
  }
  
  clearScramble = () => {
    this.setState({
      multiBLDScramble: "",
      scramble: "",
      megaminxScramble: "",
    })
  }
  
  test = () => {
    console.log(this.state.tempSolves[0].solves)
    // console.log(this.state.user.id)
  }

  get = () => {
    fetch("https://blooming-hollows-98248.herokuapp.com/receive",{
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: this.state.usertemp,
      })
    }).then(response=>response.json())
    .then(data=>{
      this.setState({
        tempSolves: data
      })
    })
  }

    render() {   
      return (
      <div> 
        {/* <button onClick={this.test}>test</button> */}
        { this.state.isHome 
        ? 
        (this.state.isCreateNewSession ? 
          <NewSessionOptions 
          clearSessionInterfaceSolves={this.clearSessionInterfaceSolves}
          clearScramble={this.clearScramble}
          scramble={this.props.scramble}
          solves={this.state.solves}
          isNewSessionFunction={this.isNewSessionFunction}
          isNewSession={this.state.isNewSession}
          addToUniqueSessionsDB={this.addToUniqueSessionsDB}
          getSessionNumber={this.getSessionNumber}
          uniqueSessionsDB={this.state.uniqueSessionsDB}
          getInterfaceSession={this.getInterfaceSession}
          isSessionName={this.isSessionName} 
          createNewSession={this.createNewSession} 
          sessionNameOnChange={this.sessionName} 
          isBackgroundLight={this.state.isBackgroundLight}
          />
          :
          <div>
            <TimerInterface 
            isManualEnter={this.state.isManualEnter}
            clearScramble={this.clearScramble}
            isDisplayScrambleMedium={this.props.isDisplayScrambleMedium}
            isDisplayScrambleSmall={this.props.isDisplayScrambleSmall}
            multiBLDScramble={this.props.multiBLDScramble}
            scrambleRegular={this.props.scrambleRegular}
            megaminxScramble={this.props.megaminxScramble}
            scramble={this.props.scramble}
            isGetSolvesOnMount={this.state.isGetSolvesOnMount}
            getSolvesOnMountPrevent={this.getSolvesOnMountPrevent}
            getSessionNumber={this.getSessionNumber}
            addToUniqueSessionsDBOnMount={this.addToUniqueSessionsDBOnMount}
            getAllSolves={this.getAllSolves}
            send={this.send}
            removeSolveFromSolvesState={this.removeSolveFromSolvesState}
            isTimerDisabled={this.state.isTimerDisabled}
            isMobile={this.state.isMobile}
            getInterfaceSession={this.getInterfaceSession}
            getInterfaceSolvesSingle={this.getInterfaceSolvesSingle}
            getInterfaceSolves={this.getInterfaceSolves}
            solvesInterface={this.state.solvesInterface}
            uniqueSessionsDB={this.state.uniqueSessionsDB}
            isNewSessionFunction={this.isNewSessionFunction}
            confettiLaunch={this.confettiLaunch}
            solves={this.state.solves}
            toggleDNF={this.toggleDNF}
            togglePlusTwo={this.togglePlusTwo}
            isConfirmSolveDelete={this.state.isConfirmSolveDelete}
            removeSolveFromState={this.removeSolveFromState} 
            getSolveFromInterface={this.getSolveFromInterface} 
            isSessionName={this.state.isSessionName} 
            isSessionNameFunc={this.isSessionName} 
            getSessionNameOnLoad={this.getSessionNameOnLoad} 
            puzzleType={this.state.puzzleType} 
            sessionName={this.state.sessionName} 
            inspectionTime={this.state.inspectionTime} 
            isCountDownActivated={this.state.isCountDownActivated} 
            aoNum={this.state.aoNum} 
            aoNum2={this.state.aoNum2} 
            sessionInterface={this.state.sessionInterface} 
            getTheme={this.getTheme} 
            newSessionApp={this.newSessionApp} 
            sessions={this.state.sessions} 
            scrambleQuantity={this.state.scrambleQuantity} 
            isBackgroundLight={this.state.isBackgroundLight} 
            dashboard={this.dashboard} 
            id={this.state.user.id}  
            username={this.state.user.username} 
            isSignedIn={this.state.isSignedIn} 
            signIn={this.signIn}
            />
          </div>
          )
        :
        this.state.isDashboard ?
          <Dashboard 
          manualEnter={this.manualEnter}
          removeFromSolvesInterface={this.removeFromSolvesInterface}
          scramble={this.props.scramble}
          offlineState={this.state.offline}
          send={this.send}
          aoNum2={this.state.aoNum2} 
          disableTimer={this.disableTimer}
          mobileStartStop={this.mobileStartStop}
          aoNumChange={this.aoNumChange}
          aoNumChange2={this.aoNumChange2}
          getNewUsername={this.getNewUsername}
          addToUniqueSessionsDB={this.addToUniqueSessionsDB}
          inspection={this.inspection}
          getSessionNameOnLoad={this.getSessionNameOnLoad}
          isConfirmSessionDelete={this.state.isConfirmSessionDelete}
          isConfirmSolveDelete={this.state.isConfirmSolveDelete}
          confirmSessionDelete={this.confirmSessionDelete}
          confirmSolveDelete={this.confirmSolveDelete} 
          getSolvesFromImport={this.getSolvesFromImport} 
          getSolvesFromImportManual={this.getSolvesFromImportManual} 
          removeFromSolves={this.removeFromSolves} 
          solves={this.state.solves} 
          changeInspectionTime={this.changeInspectionTime}
          inspectionTimePlus={this.inspectionTimePlus} 
          inspectionTimeMinus={this.inspectionTimeMinus} 
          inspectionTime={this.state.inspectionTime} 
          isCountDownActivated={this.isCountDownActivated} 
          aoNum={this.state.aoNum} 
          sessionInterface={this.state.sessionInterface} 
          getSessionNumber={this.getSessionNumber} 
          sessions={this.state.sessions} 
          getInterfaceSession={this.getInterfaceSession} 
          removeFromUniqueSessionsDB={this.removeFromUniqueSessionsDB} 
          uniqueSessionsDB={this.state.uniqueSessionsDB} 
          loadPastSessionSolveData={this.loadPastSessionSolveData} 
          scrambleQuantity={this.state.scrambleQuantity} 
          scrambleQuantityMinus={this.scrambleQuantityMinus}  
          scrambleQuantityPlus={this.scrambleQuantityPlus} 
          signout={this.signout} 
          signedIn={this.signedIn} 
          light={this.light} 
          dark={this.dark}  
          isBackgroundLight={this.state.isBackgroundLight}  
          signIn={this.dashboard} 
          loadUser={this.loadUser} 
          username={this.state.user.username} 
          id={this.state.user.id} 
          />
        :
        (this.state.isRegistered ?
          <Register  
          addToUniqueSessionsDB={this.addToUniqueSessionsDB}
          clearSolvesState={this.clearSolvesState}
          isBackgroundLight={this.state.isBackgroundLight} 
          signedIn={this.signedIn} 
          signIn={this.signIn} 
          register={this.register} 
          loadUser={this.loadUser}
          />
          :
          <SignIn 
          clearScramble={this.clearScramble}
          user={this.state.user} 
          isBackgroundLight={this.state.isBackgroundLight}  
          signedIn={this.signedIn} 
          signIn={this.signIn} 
          loadUser={this.loadUser} 
          register={this.register}
          />
        )
      }
      </div>
    )
  }
}

export default App;
