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
    inspectionTime: 2,
    puzzleType: "3x3",
    isCreateNewSession: false,
    sessionName: null,
    isSessionName: false,
    isConfirmSolveDelete: false,
    isConfirmSessionDelete: false,
    averageMS: [],
    solves: [],
    interfaceSolvesCount: 0,
    isNewSession: false,
    solvesInterface: [],
    randPrevent: false,
    isMobile: false,
    isTimerDisabled: false,
  }

  aoLocalStorage = () => {
    if(localStorage.ao){
      this.setState({
        // aoNum: JSON.parse(localStorage.getItem("ao"))
      })
    }
  }

  getConfirmSessionAndSolveOnMount = () => {
    if(localStorage.solveconfirm && localStorage.sessionconfirm && localStorage.inspectionTime && localStorage.mobile){
      this.setState({
        // isConfirmSolveDelete: JSON.parse(localStorage.getItem("solveconfirm")),
        // isConfirmSessionDelete: JSON.parse(localStorage.getItem("sessionconfirm")),
        // inspectionTime: JSON.parse(localStorage.getItem("inspectionTime")),
        // isMobile: JSON.parse(localStorage.getItem("mobile")), 
      })
    }
  }

  randPreventFunction = () => {
    this.setState({
      randPrevent: true,
    })
  }

  getUserInfo = () => {
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
          isTimerDisabled: data.disabletimer,
        })
        localStorage.setItem("countDown", JSON.stringify(data.inspection))
        localStorage.setItem("mobile", JSON.stringify(data.mobile))
        localStorage.setItem("sessionconfirm", JSON.stringify(data.confirmsession))
        localStorage.setItem("solveconfirm", JSON.stringify(data.confirmsolve))
        // console.log(data.disabletimer !== true )
        localStorage.setItem("disabletimer", JSON.stringify(data.disabletimer))
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

  
  getSolves = () => {
    //gets all solves and sessions from database
    if (this.state.user.id){
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
    this.setState({
      isTimerDisabled: !this.state.isTimerDisabled
    })
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
 

  confirmSessionDelete = () => {
    //Toggles session delete confirm in database
    this.setState({
      isConfirmSessionDelete: !this.state.isConfirmSessionDelete
    })
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

  mobileStartStop = () => {
    //Toggles mobile in database
    //If on, there is clickable start button
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

  confirmSolveDelete = () => {
    //Toggles solve delete confirm in database
    //If on, user is asked if they want to delete solves
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
    if(input===null){
      this.setState({
        isSessionName: false,
      })
    }else{
      this.setState({
        isSessionName: true,
      })
    }
  }

  inspectionTimeMinus = () => {
    //Lowers inspection time 
    if (this.state.inspectionTime>0){
      localStorage.setItem("inspectionTime", JSON.stringify(this.state.inspectionTime - 1))
      fetch("https://blooming-hollows-98248.herokuapp.com/inspectiontime", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          time: this.state.inspectionTime -1
        })
      }).then(response=>response.json())
      this.setState(prevState=>({
        inspectionTime: prevState.inspectionTime - 1
      }))
    }
  }

  inspectionTimePlus = () => {
    //increases inspection time
    if (this.state.inspectionTime<30){
      localStorage.setItem("inspectionTime", JSON.stringify(this.state.inspectionTime +1))
      fetch("https://blooming-hollows-98248.herokuapp.com/inspectiontime", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          time: this.state.inspectionTime + 1
        })
      }).then(response=>response.json())
      this.setState(prevState=>({
        inspectionTime: prevState.inspectionTime + 1
      }))
    }
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
      isCountDownActivated: data.inspection, 
      inspectionTime: data.inspectiontime,
      isMobile: data.mobile
    })
    localStorage.setItem("inspectionTime", JSON.stringify(data.inspectiontime))
    localStorage.setItem("countDown", JSON.stringify(data.inspection))
    localStorage.setItem("scrambleLength", data.scramblelength)
    localStorage.setItem("theme", JSON.stringify(data.theme))
    localStorage.setItem("ao", JSON.stringify(data.aonumber))
    localStorage.setItem("solveconfirm", JSON.stringify(data.confirmsolve))
    localStorage.setItem("sessionconfirm", JSON.stringify(data.confirmsession))
    localStorage.setItem("mobile", JSON.stringify(data.mobile))
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
    localStorage.removeItem("inspectionTime") 
    localStorage.removeItem("solveconfirm")
    localStorage.removeItem("xyz")
    localStorage.removeItem("color")
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

  scrambleQuantityPlus = () => {
    //saves scramble quantity to database in settings page
    if (this.state.scrambleQuantity < 30) {
      localStorage.setItem("scrambleLength", String(this.state.scrambleQuantity + 1))
      fetch("https://blooming-hollows-98248.herokuapp.com/putscramblelength", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          scramble: this.state.scrambleQuantity + 1
        })
      }).then(response=> response.json())
      .then(
        this.setState({
          scrambleQuantity: this.state.scrambleQuantity + 1
        })
      )
    }
  }

  scrambleQuantityMinus = () => {
    //saves scramble quantity to database in settings page
    if (this.state.scrambleQuantity > 5) {
      localStorage.setItem("scrambleLength", String(this.state.scrambleQuantity - 1))
      fetch("https://blooming-hollows-98248.herokuapp.com/putscramblelength", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id,
          scramble: this.state.scrambleQuantity - 1
        })
      }).then(response=> response.json())
      .then(
        this.setState({
          scrambleQuantity: this.state.scrambleQuantity - 1
        })
      )
    }
  }

  getSessionNameOnLoad = (name, puzzle) =>{
    //gets session name and puzzle type 
    if (name === null){
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

  getSolveFromInterface = (input) =>{
    //gets solve when timer stops
    //puts it into solve in state
    this.setState({
      solves: [...this.state.solves, input]
    })
  }

  getSolvesFromImportManual = (input) => {
    //gets solves when user manually imports
    this.setState({
      solves: [...this.state.solves, input]
    })
  }

  getSolvesFromImport = (input) => {
    let allSolves = this.state.solves
    for (const solve of input){
      allSolves = [...allSolves, solve]
    }
    this.setState({
      solves: allSolves
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
    this.getConfirmSessionAndSolveOnMount()
    setTimeout(()=>this.getSolves(),3)
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
    this.setState({
      solvesInterface: this.state.solvesInterface.filter(solve=>{
        return solveid !== solve.solveid && milliseconds !== solve.milliseconds
      })
    })
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
        fetch("https://blooming-hollows-98248.herokuapp.com/plustwo",{
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id,
            solveid: input,
            plustwo: x,
          })
        }).then(response=>response.json())
      }
      solves = [...solves, solve]
      return(null)
    })
    this.setState({
      solves: solves
    })
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

  // send = () => {
  //   //testing storing all solves in one cell
  //   fetch("https://blooming-hollows-98248.herokuapp.com/test",{
  //     method: "post",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       id: this.state.user.id,
  //       test: JSON.stringify(this.state.solves),
  //     })
  //   }).then(response=>response.json())
  // }

  // receive = () => {
  //   //testing storing all solves in one cell
  //   fetch("https://blooming-hollows-98248.herokuapp.com/receive",{
  //     method: "post",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       id: this.state.user.id,
  //     })
  //   }).then(response=>response.json())
  //   .then(data=>{
  //     console.log(data)
  //     this.setState({
  //       solves: data
  //     })
  //   })
  // }

    // test = () => {
      // let first = [1, 3, 4, 6, -1, -3, -4]
      // let arrayTop = []
      // let arrayBottom = []
      // let runningTotalTop = 0
      // let runningTotalBottom = 0
      // let firstValueTop= [1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5]
      // let firstValueBottom = [1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5]
      // for (let i = 5; i>0; i--){
      //   let index = firstValueTop.indexOf(2-runningTotalTop);
      //   if (index!==0){
      //     firstValueTop.splice(index, 1);
      //   }
      //   let index2 = firstValueTop.indexOf(5-runningTotalTop);
      //   if (index!==0){
      //     firstValueTop.splice(index2, 1);
      //   }
      //   let index3 = firstValueTop.indexOf(-runningTotalTop-1);
      //   if (index!==0){
      //     firstValueTop.splice(index3, 1);
      //   }
      //   let index4 = firstValueTop.indexOf(-runningTotalTop-4);
      //   if (index!==0){
      //     firstValueTop.splice(index4, 1);
      //   }

      //   let index5 = firstValueBottom.indexOf(1-runningTotalBottom);
      //   if (index!==0){
      //     firstValueBottom.splice(index5, 1);
      //   }
      //   let index6 = firstValueBottom.indexOf(4-runningTotalBottom);
      //   if (index!==0){
      //     firstValueBottom.splice(index6, 1);
      //   }
      //   let index7 = firstValueBottom.indexOf(-runningTotalBottom-2);
      //   if (index!==0){
      //     firstValueBottom.splice(index7, 1);
      //   }
      //   let index8 = firstValueBottom.indexOf(-runningTotalBottom-5);
      //   if (index!==0){
      //     firstValueBottom.splice(index8, 1);
      //   }
        
      //   let top = firstValueTop[Math.ceil(Math.random()*6)]
      //   let bottom = firstValueBottom[Math.ceil(Math.random()*6)]
      //   arrayTop.push(top)
      //   arrayBottom.push(bottom)
      //   runningTotalTop+= top
      //   runningTotalBottom+= bottom
      // }
    //   console.log(arrayTop)
    //   console.log(arrayBottom)

    // }


    test = () => {
      // let scramble = ""
      // let arrayTop = []
      // let arrayBottom = []
      // let topRunningTotal = 0
      // let bottomRunningTotal = 0
      // let firstValueTop= [0, 1, 3, 4, 6, -2, -3, -5]
      // let valueTop = [1, 4, -2, -5]
      // let valueTop2 = [0, 3, 6, -3]
      // let valueBottomA = [0, 3, 6, -3]
      // let valueBottomB= [2, 5, -1, -4]
      // let one = firstValueTop[Math.floor(Math.random()*8)]
      // topRunningTotal+=one
      // let two
      // if (valueTop.includes(one)){
      //   two = valueBottomA[Math.floor(Math.random()*4)]
      // }else if (valueTop2.includes(one)){
      //   two = valueBottomB[Math.floor(Math.random()*4)]
      // }
      // bottomRunningTotal+=two
      // arrayTop.push(one)
      // arrayBottom.push(two)
      
      // let valueTop3 = [0, 1, 3, 4, 6, -2, -3, -5]
      // let valueTop4 = [0,2,3,5,6,-1,-3,-4] 
      // //top flush bottom not
      // let valueBottom = [0, 3, 6,-3]
      // //top and bottom not flush
      // let valueBottom2 = [1, 4, -2,-5]
      // //top and bottoma flush
      // let valueBottom3 = [-1, -4, 2, 5]
      // //top not flush bottom is
      // let valueBottom4 = [0, 3, 6,-3]
      // for (let i = 5; i>0; i--){
      //   if (topRunningTotal%3===0){
      //     one = valueTop3[Math.floor(Math.random()*8)]
      //   }else if (topRunningTotal%3!==0){
      //     one = valueTop4[Math.floor(Math.random()*7)]
      //   }
      //   topRunningTotal+=one
      //   arrayTop.push(one)
      //   if(bottomRunningTotal%3===0){
      //     if (topRunningTotal%3!==0){
      //       two = valueBottom4[Math.floor(Math.random()*4)]
      //     }else if (topRunningTotal%3===0){
      //       two = valueBottom3[Math.floor(Math.random()*4)]
      //     }
      //   }else if(bottomRunningTotal%3!==0){
      //     if (topRunningTotal%3!==0){
      //       two = valueBottom2[Math.floor(Math.random()*4)]
      //     }else if (topRunningTotal%3===0){
      //       two = valueBottom[Math.floor(Math.random()*4)]
      //     }
      //   }
      //   arrayBottom.push(two)
      //   bottomRunningTotal+=two
      // }

      // let scrambleEnd = ""

      // if(topRunningTotal%3!==0 && bottomRunningTotal%3===0){
      //   arrayTop.push(-1)
      //   arrayBottom.push(0)
      //   topRunningTotal-=1
      //   let scrambleOptions = ["(3,0)/ (2,-3)/ (4,-3)/ (3,-3)/ (1,-3)", "(-3,6)/ (0,1)/ (-4,0)/ (2,2)", "(-3,6)/ (0,1)/ (-4,0)/ (2,2)/ (2,-3)",
      //   "(3,0)/ (2,-3)/ (4,-3)/ (3,-3)", "(3,-3)/ (-3,6)/ (-5,0)/ (-1,-3)/ (1,0)", "(3,-3)/ (-3,6)/ (-5,0)/ (-1,-3)", "(3,0)/ (1,0)/ (2,-1)/ (-3,4)/ (5,0)",
      //   "(3,0)/ (1,0)/ (2,-1)/ (-3,4)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (-2,-2)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (-2,0)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)/ (2,6)",
      //   "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (5,4)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)/ (-2,3)",]
      //   scrambleEnd+=scrambleOptions[Math.floor(Math.random()*scrambleOptions.length)]
      // }else if(bottomRunningTotal%3!==0 && topRunningTotal%3===0){
      //   arrayTop.push(1)
      //   arrayBottom.push(0)
      //   topRunningTotal+=1
      //   let scrambleOptions2 = ["(3,0)/ (2,-3)/ (0,-2)/ (6,-2)/ (2,-4)", "(3,0)/ (2,-3)/ (0,-2)/ (6,-2)", "(3,0)/ (2,-3)/ (4,-2)/ (2,0)/ (0,-2)",
      //   "(0,3)/ (2,1)/ (3,-2)/ (1,-4)/ (2,0)", "(0,3)/ (2,1)/ (3,-2)/ (1,-4)", "(0,3)/ (-4,1)/ (2,-2)/ (-2,6)/ (-4,0)", "(3,3)/ (2,-3)/ (4,0)/ (-2,2)/ (-4,1)",
      //   "(3,3)/ (2,-3)/ (4,0)/ (-2,2)", "(3,3)/ (-4,0)/ (1,5)/ (5,-1)/ (-3,0)", "(6,3)/ (-2,3)/ (2,2)/ (6,0)/ (2,1)", "(6,3)/ (-2,3)/ (2,2)/ (6,0)",
      //   "(6,3)/ (-2,3)/ (-4,2)/ (0,1)/ (-4,0)", "(6,3)/ (-2,3)/ (-4,2)/ (0,1)", "(3,6)/ (-2,3)/ (5,-4)/ (1,-3)/ (-3,3)", "(3,6)/ (-2,3)/ (5,-4)/ (1,-3)",]
      //   scrambleEnd+=scrambleOptions2[Math.floor(Math.random()*scrambleOptions2.length)]
      // }



      // for (let i = 0;i<7;i++){
      //   scramble+="("+ arrayTop[i] + "," + arrayBottom[i] + ")" 
      //   // if (i < arrayTop.length-2){
      //     scramble+= "/ "
      //   // }
      // }
      // scramble+=scrambleEnd
    }
      
    render() {   
      return (
      <div> 
        {/* <button onClick={this.test}>push</button> */}
        {/* <button onClick={this.send}>send</button>
      <button onClick={this.receive}>receive</button> */}
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
          disableTimer={this.disableTimer}
          mobileStartStop={this.mobileStartStop}
          aoNumChange={this.aoNumChange}
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
