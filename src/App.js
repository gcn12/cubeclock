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
    isCountDownGoing: false,
    isCountDownActivated: false,
    inspectionTime: 10,
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
  }

  randPreventFunction = () => {
    this.setState({
      randPrevent: true,
    })
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
        } else{
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

  aoLocalStorage = () => {
    if(localStorage.ao){
      this.setState({
        aoNum: JSON.parse(localStorage.getItem("ao"))
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

  getConfirmSessionAndSolveOnMount = () => {
    if(localStorage.solveconfirm && localStorage.sessionconfirm && localStorage.inspectionTime){
      this.setState({
        isConfirmSolveDelete: JSON.parse(localStorage.getItem("solveconfirm")),
        isConfirmSessionDelete: JSON.parse(localStorage.getItem("sessionconfirm")),
        inspectionTime: JSON.parse(localStorage.getItem("inspectionTime")),
      })
    }
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
          inspectionTime: JSON.parse(localStorage.getItem("inspectionTime")),
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
  })
    localStorage.setItem("inspectionTime", JSON.stringify(data.inspectiontime))
    localStorage.setItem("countDown", JSON.stringify(data.inspection))
    localStorage.setItem("scrambleLength", data.scramblelength)
    localStorage.setItem("theme", JSON.stringify(data.theme))
    localStorage.setItem("ao", JSON.stringify(data.aonumber))
    localStorage.setItem("solveconfirm", JSON.stringify(data.confirmsolve))
    localStorage.setItem("sessionconfirm", JSON.stringify(data.confirmsession))
  }

  getTheme = () => {
    // gets theme from local storage
    if(this.state.user.id>0){
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
    })
    document.body.style.backgroundColor = "whitesmoke"
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
    this.getConfirmSessionAndSolveOnMount()
    setTimeout(()=>this.getSolves(),3)
    // setTimeout(()=>this.manageSolveData,10)
    this.getInspectionTimeOnMount()
    this.aoLocalStorage()
    this.setScrambleLength()
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

  test = () => {
    console.log(this.state.solves)
  }
      
    render() {   
      return (
      <div> 
      {/* <button onClick={this.test}>push</button> */}
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
