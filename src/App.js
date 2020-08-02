import React, {Component} from 'react';
import TimerInterface from "../src/TimerInterface/TimerInterface"
import Dashboard from "../src/Dashboard/Dashboard"
import NewSessionOptions from "./NewSessionOptions"
import "./App.css"
import Register from './NewRegister';
import SignIn from './NewSignIn';
import confetti from 'canvas-confetti';

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
  ["U", "U'"],
  ["L", "L'"],
  ["R", "R'"],
  ["B", "B'"]
]

const pyraminxNotationEnd = [
  ["u", "u'"],
  ["l", "l'"],
  ["r", "r'"],
  ["b", "b'"]
]

const skewb = [
  ["U", "U'"],
  // ["F", "F'"],
  ["B", "B'"],
  ["L", "L'"],
  ["R", "R'"],
]

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
    randPrevent: false,
    isMobile: false,
    isTimerDisabled: false,
    isOffline: false, 
    isGetSolvesOnMount: false,
    multiBLDScramble: "",
    scramble: "",
    megaminxScramble: "",
    isDisplayScrambleMedium: false,
    isDisplayScrambleSmall: false,
  }

  receive = () => {
    //testing storing all solves in one cell
    let offline = false
    if (localStorage.offline){
      offline = JSON.parse(localStorage.getItem("offline"))
    }
    if(this.state.user.id.length>0){
      if(!this.isGetSolvesOnMount){
        if(!offline){
          fetch("https://blooming-hollows-98248.herokuapp.com/receive",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          }).then(response=>response.json())
          .then(data=>{
            let parsedData = []
            if(data){
              if(data[0].solves){
                parsedData = JSON.parse(data[0].solves).allsolves
              }
            }
            this.getSolvesOnMountPrevent()
              this.getAllSolves(parsedData)
              let sessions = []
              if(parsedData.length>0){
                sessions = parsedData.map(solves => solves.session)
              }
              if (sessions.length === 0) {
                this.addToUniqueSessionsDBOnMount(1)
                this.getSessionNumber(1)
                this.getInterfaceSession(1)
                this.rand("3x3")
                } else if (parsedData.length===0){
                  this.getInterfaceSession(1)
                  this.rand("3x3")
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
                          this.rand(solve.puzzle)
                        }
                      }
                this.randPreventFunction()
                this.getInterfaceSolves(allSolves)
              }
          })
        }else{
          let solves = localStorage.getItem("offlinesolves")
          solves = JSON.parse(solves).solves
          this.getAllSolves(solves)
          let sessions = solves.map(solves => solves.session)
          if (sessions.length === 0) {
            this.addToUniqueSessionsDBOnMount(1)
            this.getSessionNumber(1)
            this.getInterfaceSession(1)
            this.rand("3x3")
          } else if (solves.length===0){
            this.getInterfaceSession(1)
            this.rand("3x3")
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
                this.rand(solve.puzzle)
              }
            }
            this.getInterfaceSolves(allSolves)
          }
        }
      }
    }
    // else{
    //   console.log("here")
    //   this.rand("3x3")
    // }
  }

  rand = (input) => {
    //generates scramble
    let scramble = ""
    if (input){
      let scrambleLength 
      if (input==="3x3"){
        scrambleLength=23
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="3x3 BLD"){
        scrambleLength=23
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="2x2"){
        scrambleLength=9
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="4x4"||input==="4x4 BLD"){
        this.setState({
          isDisplayScrambleMedium: true,
          isDisplayScrambleSmall: true
        })
        scrambleLength=45
      }else if (input==="5x5"||input==="5x5 BLD"){
        scrambleLength=60
        this.setState({
          isDisplayScrambleMedium: true,
          isDisplayScrambleSmall: true
        })
      }else if (input==="6x6"){
        scrambleLength=80
        this.setState({
          isDisplayScrambleSmall: true
        })
      }else if (input==="7x7"){
        scrambleLength=100
        this.setState({
          isDisplayScrambleSmall: true
        })
      }else if (input==="Skewb"){
        scrambleLength=8
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="Square-1"){
        scrambleLength=10
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="Pyraminx"){
        scrambleLength=9
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }else if (input==="3x3 OH"){
        scrambleLength=23
        this.setState({
          isDisplayScrambleMedium: false,
          isDisplayScrambleSmall: false
        })
      }
      let pastScrambles = {
        pastScramble: null,
        pastScramble2: null,
      }
      let pyraminxEnd = ""
        let pyraminxNumber = Math.round(Math.random()*4)
        for (let i = pyraminxNumber;i>0;i--){
          const fourfour = [0,1,2,3]
          if (pastScrambles.pastScramble !== null){
            let i = fourfour.indexOf(pastScrambles.pastScramble)
            fourfour.splice(i, 1)
          }
          if (pastScrambles.pastScramble2 !== 7){
            let ind = fourfour.indexOf(pastScrambles.pastScramble2)
            fourfour.splice(ind, 1)
          }
          let first2 =  fourfour[Math.floor(Math.random()*fourfour.length)]
          let second2 = Math.floor(Math.random()*2)
          pyraminxEnd  += pyraminxNotationEnd[first2][second2]
          pyraminxEnd  += " "
          pastScrambles["pastScramble2"] = pastScrambles.pastScramble
          pastScrambles["pastScramble"] = first2
        }
      while (scrambleLength > 0) {
          const onefour = [0,1,2,3,4,5]
          const fourfour = [0,1,2,3]
          scrambleLength--
          let first =  onefour[Math.floor(Math.random()*onefour.length)]
          let second = Math.floor(Math.random()*3)
          if (input==="2x2"||input==="3x3" || input==="3x3 BLD" ||input==="3x3 OH"){
            if (pastScrambles.pastScramble !== null){
              let i = onefour.indexOf(pastScrambles.pastScramble)
              onefour.splice(i, 1)
            }
            if (pastScrambles.pastScramble !== null){
              let i
              if (pastScrambles.pastScramble===0){
                i = onefour.indexOf(1)
                onefour.splice(i,1)
              }
              if (pastScrambles.pastScramble===1){
                i = onefour.indexOf(0)
                onefour.splice(i,1)
              }
              if (pastScrambles.pastScramble===2){
                i = onefour.indexOf(3)
                onefour.splice(i,1)
              }
              if (pastScrambles.pastScramble===3){
                i = onefour.indexOf(2)
                onefour.splice(i,1)
              }
              if (pastScrambles.pastScramble===4){
                i = onefour.indexOf(5)
                onefour.splice(i,1)
              }
              if (pastScrambles.pastScramble===5){
                i = onefour.indexOf(4)
                onefour.splice(i,1)
              }
            }
            if (pastScrambles.pastScramble2 !== 7){
              let ind = onefour.indexOf(pastScrambles.pastScramble2)
              if(onefour.includes(ind)){
                onefour.splice(ind, 1)
              }
            }

            if (pastScrambles.pastScramble2 !== null){
              let i
              if (pastScrambles.pastScramble2===0){
                i = onefour.indexOf(1)
              }
              if (pastScrambles.pastScramble2===1){
                i = onefour.indexOf(0)
              }
              if (pastScrambles.pastScramble2===2){
                i = onefour.indexOf(3)
              }
              if (pastScrambles.pastScramble2===3){
                i = onefour.indexOf(2)
              }
              if (pastScrambles.pastScramble2===4){
                i = onefour.indexOf(5)
              }
              if (pastScrambles.pastScramble2===5){
                i = onefour.indexOf(4)
              }
              if(onefour.includes(i)){
                onefour.splice(i,1)
              }
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
            scramble += " "
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
            second = Math.floor(Math.random()*2)
            scramble += pyraminxNotation[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          if(input === "Skewb"){
            if (pastScrambles.pastScramble !== null){
              let g = fourfour.indexOf(pastScrambles.pastScramble)
              fourfour.splice(g, 1)
            }
            if (pastScrambles.pastScramble2 !== 7){
              let h = fourfour.indexOf(pastScrambles.pastScramble2)
              fourfour.splice(h, 1)
            }
            first =  fourfour[Math.floor(Math.random()*fourfour.length)]
            second = Math.floor(Math.random()*2)
            scramble += skewb[first][second]
            pastScrambles["pastScramble2"] = pastScrambles.pastScramble
            pastScrambles["pastScramble"] = first
          }
          scramble += " " 
        }
        if (input==="Clock") {
          this.setState({
            isDisplayScrambleMedium: true,
            isDisplayScrambleSmall: true
          })
          let end = Math.round(Math.random()*4)
          let endOptions = ["UR", "DR", "DL", "UL"]
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
          scramble += "y2 "
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
          if (end===3){
            for (const letter of endOptions){
              scramble+= letter
              scramble += " "
            }
          }
          if (end===2){
            endOptions.splice(Math.round(Math.random()*3))
            for (const letter of endOptions){
              scramble+= letter
              scramble += " "
            }
          }
          if (end===1){
            endOptions.splice(Math.round(Math.random()*3))
            endOptions.splice(Math.round(Math.random()*2))
            for (const letter of endOptions){
              scramble+= letter
              scramble += " "
            }
          }
        }
      
      if (input==="Square-1"){
        let arrayTop = []
        let arrayBottom = []
        let topRunningTotal = 0
        let bottomRunningTotal = 0
        let firstValueTop= [0, 1, 3, 4, 6, -2, -3, -5]
        let valueTop = [1, 4, -2, -5]
        let valueTop2 = [0, 3, 6, -3]
        let valueBottomA = [0, 3, 6, -3]
        let valueBottomB= [2, 5, -1, -4]
        let one = firstValueTop[Math.floor(Math.random()*8)]
        topRunningTotal+=one
        let two
        if (valueTop.includes(one)){
          two = valueBottomA[Math.floor(Math.random()*4)]
        }else if (valueTop2.includes(one)){
          two = valueBottomB[Math.floor(Math.random()*4)]
        }
        bottomRunningTotal+=two
        arrayTop.push(one)
        arrayBottom.push(two)
        
        let valueTop3 = [0, 1, 3, 4, 6, -2, -3, -5]
        let valueTop4 = [0,2,3,5,6,-1,-3,-4] 
        for (let i = 5; i>0; i--){
          //top flush bottom not
          let valueBottom = [0, 3, 6,-3]
          //top and bottom not flush
          let valueBottom2 = [1, 4, -2,-5]
          //top and bottoma flush
          let valueBottom3 = [-1, -4, 2, 5]
          //top not flush bottom is
          let valueBottom4 = [0, 3,-3, 6]
          if (topRunningTotal%3===0){
            one = valueTop3[Math.floor(Math.random()*8)]
          }else if (topRunningTotal%3!==0){
            one = valueTop4[Math.floor(Math.random()*7)]
          }
          topRunningTotal+=one
          arrayTop.push(one)
          if(bottomRunningTotal%3===0){
            if (topRunningTotal%3!==0){
              if (one===0){
                valueBottom4.shift()
              }
              if (one===6){
                valueBottom4.pop()
              }
              two = valueBottom4[Math.floor(Math.random()*valueBottom4.length)]
            }else if (topRunningTotal%3===0){
              two = valueBottom3[Math.floor(Math.random()*4)]
            }
          }else if(bottomRunningTotal%3!==0){
            if (topRunningTotal%3!==0){
              two = valueBottom2[Math.floor(Math.random()*4)]
            }else if (topRunningTotal%3===0){
              two = valueBottom[Math.floor(Math.random()*4)]
            }
          }
          arrayBottom.push(two)
          bottomRunningTotal+=two
        }
  
        let scrambleEnd = ""
  
        if(topRunningTotal%3!==0 && bottomRunningTotal%3===0){
          arrayTop.push(-1)
          arrayBottom.push(0)
          topRunningTotal-=1
          let scrambleOptions = ["(3,0)/ (2,-3)/ (4,-3)/ (3,-3)/ (1,-3)", "(-3,6)/ (0,1)/ (-4,0)/ (2,2)", "(-3,6)/ (0,1)/ (-4,0)/ (2,2)/ (2,-3)",
          "(3,0)/ (2,-3)/ (4,-3)/ (3,-3)", "(3,-3)/ (-3,6)/ (-5,0)/ (-1,-3)/ (1,0)", "(3,-3)/ (-3,6)/ (-5,0)/ (-1,-3)", "(3,0)/ (1,0)/ (2,-1)/ (-3,4)/ (5,0)",
          "(3,0)/ (1,0)/ (2,-1)/ (-3,4)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (-2,-2)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (-2,0)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)/ (2,6)",
          "(6,3)/ (3,0)/ (-2,2)/ (0,2)/ (5,4)", "(6,3)/ (3,0)/ (-2,2)/ (0,2)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)", "(-3,0)/ (-2,-1)/ (-4,0)/ (0,3)/ (-2,3)",]
          scrambleEnd+=scrambleOptions[Math.floor(Math.random()*scrambleOptions.length)]
        }else if(bottomRunningTotal%3!==0 && topRunningTotal%3===0){
          arrayTop.push(1)
          arrayBottom.push(0)
          topRunningTotal+=1
          let scrambleOptions2 = ["(3,0)/ (2,-3)/ (0,-2)/ (6,-2)/ (2,-4)", "(3,0)/ (2,-3)/ (0,-2)/ (6,-2)", "(3,0)/ (2,-3)/ (4,-2)/ (2,0)/ (0,-2)",
          "(0,3)/ (2,1)/ (3,-2)/ (1,-4)/ (2,0)", "(0,3)/ (2,1)/ (3,-2)/ (1,-4)", "(0,3)/ (-4,1)/ (2,-2)/ (-2,6)/ (-4,0)", "(3,3)/ (2,-3)/ (4,0)/ (-2,2)/ (-4,1)",
          "(3,3)/ (2,-3)/ (4,0)/ (-2,2)", "(3,3)/ (-4,0)/ (1,5)/ (5,-1)/ (-3,0)", "(6,3)/ (-2,3)/ (2,2)/ (6,0)/ (2,1)", "(6,3)/ (-2,3)/ (2,2)/ (6,0)",
          "(6,3)/ (-2,3)/ (-4,2)/ (0,1)/ (-4,0)", "(6,3)/ (-2,3)/ (-4,2)/ (0,1)", "(3,6)/ (-2,3)/ (5,-4)/ (1,-3)/ (-3,3)", "(3,6)/ (-2,3)/ (5,-4)/ (1,-3)",]
          scrambleEnd+=scrambleOptions2[Math.floor(Math.random()*scrambleOptions2.length)]
        }

        for (let i = 0;i<7;i++){
          scramble+="("+ arrayTop[i] + "," + arrayBottom[i] + ")" 
          scramble+= "/ "
        }
        scramble+=scrambleEnd
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
      if (input==="Pyraminx"){
        scramble+=pyraminxEnd
      }
      let multiBLD = ""
      if (input==="Multi-BLD"){
        let pastScrambleObj = {
          pastScramble: null,
          pastScramble2: null
        }
        let countMultiBLD = 1
        while (countMultiBLD < 6) {
          let y = 23
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
    return scramble
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

  getSolvesOnMountPrevent = () => {
    this.setState({
      isGetSolvesOnMount: true
    })
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
          this.receive()
        })
      }else{
        this.rand("3x3")
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
    }
  }

  clearSolvesState = () => {
    this.setState({
      solves: []
    })
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
    this.receive()
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
      randPrevent: false
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
    this.rand("3x3")
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
    this.clearScramble()
    this.setState({
      isHome: true,
      isDashboard: false,
      sessions: session,
      sessionInterface: index,
    })
    let allSolves = []
      for (const solve of this.state.solves){
        if (session === solve.session){
          allSolves = [solve, ...allSolves]
          this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
          this.isSessionName(solve.sessionname)
          this.rand(solve.puzzle)
        }
      }
      this.getInterfaceSolves(allSolves)
  }


  // loadPastSessionSolveData = (session) => {
  //   //when component mounts, session saved on local storage is displayed
  //   if(this.props.id){
  //     let allSolves = []
  //     for (const solve of this.state.solves){
  //       if (session === solve.session){
  //         allSolves = [solve, ...allSolves]
  //         this.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
  //         this.isSessionName(solve.sessionname)
  //         this.rand(solve.puzzle)
  //       }
  //     }
  //     this.getInterfaceSolves(allSolves)
  //   }
  // }

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

  test = () => {
    console.log(this.state.uniqueSessionsDB)
  }

  setStateOffline = (input) => {
    this.setState({
      isOffline: input
    })
  }

  clearScramble = () => {
    this.setState({
      multiBLDScramble: "",
      scramble: "",
      megaminxScramble: "",
    })
  }

  offline = () => {
    let isOffline = !this.state.isOffline
    this.setState({
      isOffline: isOffline
    })
    fetch("https://blooming-hollows-98248.herokuapp.com/offline", {
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
        {/* <button onClick={this.test}>removeitem</button>  */}
        { this.state.isHome 
        ? 
        (this.state.isCreateNewSession ? 
          <NewSessionOptions 
          clearScramble={this.clearScramble}
          rand={this.rand}
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
            clearScramble={this.clearScramble}
            isDisplayScrambleMedium={this.state.isDisplayScrambleMedium}
            isDisplayScrambleSmall={this.state.isDisplayScrambleSmall}
            multiBLDScramble={this.state.multiBLDScramble}
            scramble={this.state.scramble}
            megaminxScramble={this.state.megaminxScramble}
            rand={this.rand}
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
            randPreventFunction={this.randPreventFunction}
            randPrevent={this.state.randPrevent}
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
          rand={this.rand}
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
