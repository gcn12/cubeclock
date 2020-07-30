import React, {Component} from 'react';
import TimerInterface from "./TimerInterface"
import Dashboard from "./Dashboard"
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
    isCountDownGoing: false,
    isCountDownActivated: false,
    inspectionTime: 0,
    puzzleType: "3x3",
    isCreateNewSession: false,
    sessionName: null,
    isSessionName: false,
    isConfirmSolveDelete: false,
    isConfirmSessionDelete: false,
    averageMS: [],
    solves: [],
    isNewSession: false,
    solvesInterface: [],
    randPrevent: false,
    isMobile: false,
    isTimerDisabled: false,
    isOffline: false, 
  }

  randPreventFunction = () => {
    this.setState({
      randPrevent: true,
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
          })
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
          let theme = JSON.parse(localStorage.getItem("theme"))
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
      }
    }
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

  receive = () => {
    //testing storing all solves in one cell
    let offline = false
    if (localStorage.offline){
      offline = JSON.parse(localStorage.getItem("offline"))
    }
    if(!offline){
      if(this.state.user.id.length>0){
        fetch("https://blooming-hollows-98248.herokuapp.com/receive",{
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        }).then(response=>response.json())
        .then(data=>{
          let parsedData = []
          if(data[0].solves){
            parsedData = JSON.parse(data[0].solves).allsolves
          }
          this.setState({
            solves: parsedData
          })
          let sessions = []
          if(parsedData.length>0){
            sessions = parsedData.map(solves => solves.session)
          }
            if (sessions.length === 0) {
              this.setState({
                uniqueSessionsDB: [1],
                sessions: 1,
                sessionInterface: 1,
              })
            } else if (parsedData.length===0){
              this.setState({
                sessionInterface: 1,
              })
            }else{
              this.setState({
                uniqueSessionsDB: Array.from(new Set(sessions)).reverse(),
                sessions: Math.max.apply(Math,sessions),
                sessionInterface: Array.from(new Set(sessions)).length,
                solvesInterface: []
              })
              let allSolves = []
              for (const solve of parsedData){
                if (Math.max.apply(Math,sessions) === solve.session){
                  allSolves = [solve, ...allSolves]
                  this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
                  this.isSessionName(solve.sessionname)
                }
              }
              this.setState({
                solvesInterface: allSolves
              })
            }
        })
      }
    }else{
      let solves = localStorage.getItem("offlinesolves")
      solves = JSON.parse(solves).solves
      // console.log(solves)
      this.setState({
        solves: solves
      })
      let sessions = solves.map(solves => solves.session)
      if (sessions.length === 0) {
        this.setState({
          uniqueSessionsDB: [1],
          sessions: 1,
          sessionInterface: 1,
        })
      } else if (solves.length===0){
        this.setState({
          sessionInterface: 1,
        })
      }else{
        this.setState({
          uniqueSessionsDB: Array.from(new Set(sessions)).reverse(),
          sessions: Math.max.apply(Math,sessions),
          sessionInterface: Array.from(new Set(sessions)).length,
          solvesInterface: []
        })
        let allSolves = []
        for (const solve of solves){
          if (Math.max.apply(Math,sessions) === solve.session){
            allSolves = [solve, ...allSolves]
            this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
            this.isSessionName(solve.sessionname)
          }
        }
        this.setState({
          solvesInterface: allSolves
        })
      }
    }
  }

  
  getSolves = () => {
    //gets all solves and sessions from database
    let offline = localStorage.getItem(("offline"))
    console.log(offline)
    if (this.state.user.id){
      if(!this.state.isOffline){
        fetch("https://blooming-hollows-98248.herokuapp.com/getsolves", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(data=>{
          this.setState({
            solves: data
          })
          let sessions = data.map(solves => solves.session)
          if (sessions.length === 0) {
            this.setState({
              uniqueSessionsDB: [1],
              sessions: 1,
              sessionInterface: 1,
            })
          } else if (data.length===0){
            this.setState({
              sessionInterface: 1,
            })
          }else{
            this.setState({
              uniqueSessionsDB: Array.from(new Set(sessions)).reverse(),
              sessions: Math.max.apply(Math,sessions),
              sessionInterface: Array.from(new Set(sessions)).length,
              solvesInterface: []
            })
            let allSolves = []
            for (const solve of data){
              if (Math.max.apply(Math,sessions) === solve.session){
                allSolves = [solve, ...allSolves]
                this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
                this.isSessionName(solve.sessionname)
              }
            }
            this.setState({
              solvesInterface: allSolves
            })
          }
        })
      }
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

  disableTimer = () => {
    //Toggles timer disable in database
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("disabletimer", JSON.stringify(!this.state.isTimerDisabled))

    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/disabletimer", {
        // fetch("http://localhost:3003/confirmsession", {
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

  confirmSessionDelete = () => {
    //Toggles session delete confirm in database
    let offline = JSON.parse(localStorage.getItem("offline"))
    if(offline){
      localStorage.setItem("sessionconfirm", JSON.stringify(!this.state.isConfirmSessionDelete))
    }else{
      fetch("https://blooming-hollows-98248.herokuapp.com/confirmsession", {
      // fetch("http://localhost:3003/confirmsession", {
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
      // fetch("http://localhost:3003/confirmsolve", {
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
    // fetch("http://localhost:3003/confirmsolve", {
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

//   manageSolveData = () => {
//     const doAll = async () => {
//       await this.getSolves()
//       await this.loadPastSessionSolveData(this.state.sessions)
//     };
//     doAll();
// };

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

  getInspectionTimeOnMount = () => {
    if (this.state.user.id){
      if(localStorage.inspectionTime){
        this.setState({
          // inspectionTime: JSON.parse(localStorage.getItem("inspectionTime")),
        })
      }
    }
  }

  isCountDownGoing = () => {
    this.setState({
      isCountDownGoing: !this.state.isCountDownGoing
    })
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

  newSessionApp = () => {
    //changes route
    this.setState({
      isCreateNewSession: true
    })
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
    this.setState({
      isDashboard: !this.state.isDashboard,
      isHome: !this.state.isHome,
    })
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
      isOffline: data.offline
    })
    localStorage.setItem("timerDisabled", JSON.stringify(data.disabletimer))
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
    })
    document.body.style.backgroundColor = "whitesmoke"
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

  loadPastSessionSolveData = (session, index) => {
    //resumes session from saved solves list when clicked
    this.setState({
      isHome: true,
      isDashboard: false,
      sessions: session,
      sessionInterface: index,
    })
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
    // setTimeout(()=>this.getSolves(),3)
    setTimeout(()=>this.receive(),3)
    setTimeout(()=>this.getUserInfo(),10)
    // setTimeout(()=>this.manageSolveData,10)
    // this.getInspectionTimeOnMount()
    // this.aoLocalStorage()
    // this.setScrambleLength()
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
    this.state.solves.map(solve=>{
      if (solve.solveid === input){
        let x = !solve.isplustwo
        solve["isplustwo"] = x
      }
      solves = [...solves, solve]
      return(null)
    })
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
    this.state.solves.map(solve=>{
      if (solve.solveid === input){
        solve["isdnf"] = !solve.isdnf
      }
      xyz = [...xyz, solve]
      return(null)
    })
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

  send2 = () => {
    //add id to solve data table
    fetch("https://blooming-hollows-98248.herokuapp.com/test2",{
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: 'n5b5658a@(4D^',
      })
    }).then(response=>response.json())
  }

  test = () => {
    // let solves = localStorage.getItem("offlinesolves")
    // solves = JSON.parse(solves).solves
    // console.log(solves)
    localStorage.removeItem("offlinesolves")
  }

  test2 = () => {
    if(localStorage.offlinesolves){
      let solves = localStorage.getItem("offlinesolves")
      solves = JSON.parse(solves).solves
      console.log(solves)
    }
  }

  test3 = () => {
    console.log(this.state.solves)
  }

  setStateOffline = (input) => {
    this.setState({
      isOffline: input
    })
  }

  offline = () => {
    //Toggles timer disable in database
    let isOffline = !this.state.isOffline
    this.setState({
      isOffline: isOffline
    })
    fetch("https://blooming-hollows-98248.herokuapp.com/offline", {
    // fetch("http://localhost:3003/confirmsession", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: this.state.user.id,
        offline: !this.state.isOffline,
      })
    }).then(response=>response.json())
    if(isOffline){
      localStorage.setItem("offlinesolves", JSON.stringify({"solves": [...this.state.solves]}))
    }else if(!isOffline){
      if(localStorage.offlinesolves){
        let solves = localStorage.getItem("offlinesolves")
        // this.send(JSON.parse(solves).solves)
        // localStorage.removeItem("offlinesolves")
        fetch("https://blooming-hollows-98248.herokuapp.com/sendonline",{
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          solves: {"allsolves": JSON.parse(solves).solves},
        })
        }).then(response=>response.json())
        .then(response=> {
          if(response==="unable to send online"){
            alert("Unable to conncect to database. Try again.")
          }
        })
      }
    }
  }
      
    render() {   
      return (
      <div> 
        {/* <button onClick={this.test}>removeitem</button>
        <button onClick={this.test2}>log local storage</button>
        <button onClick={this.test3}>log state solves</button> */}
        {/* <button onClick={this.send}>send</button> */}
        {/* <button onClick={this.receive}>receive</button> */}
        { this.state.isHome 
        ? 
        (this.state.isCreateNewSession ? 
          <NewSessionOptions 
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
            send={this.send}
            removeSolveFromSolvesState={this.removeSolveFromSolvesState}
            isTimerDisabled={this.state.isTimerDisabled}
            isMobile={this.state.isMobile}
            getInterfaceSession={this.getInterfaceSession}
            getInterfaceSolvesSingle={this.getInterfaceSolvesSingle}
            randPreventFunction={this.randPreventFunction}
            randPrevent={this.state.randPrevent}
            getInterfaceSolves={this.getInterfaceSolves}
            solvesInterface={this.state.solvesInterface}
            getSolves={this.getSolves}
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
            getInspectionTimeOnMount={this.getInspectionTimeOnMount} 
            inspectionTime={this.state.inspectionTime} 
            isCountDownActivated={this.state.isCountDownActivated} 
            isCountDownGoing={this.state.isCountDownGoing} 
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
          setStateOffline={this.setStateOffline}
          offlineState={this.state.offline}
          offline={this.offline}
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
          isBackgroundLight={this.state.isBackgroundLight} 
          signedIn={this.signedIn} 
          signIn={this.signIn} 
          register={this.register} 
          loadUser={this.loadUser}
          />
          :
          <SignIn 
          receive={this.receive}
          getSolves={this.getSolves} 
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
