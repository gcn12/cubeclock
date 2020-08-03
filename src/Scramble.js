import React, { Component } from "react"
import App from "./App";

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

class Scramble extends Component{


    state = {
        isDisplayScrambleMedium: false,
        isDisplayScrambleSmall: false,
        multiBLDScramble: "",
        scramble: "",
        megaminxScramble: "",
    }
    
    scramble = (input) => {
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

    render(){
        return(
            <div>
                <App 
                scramble={this.scramble}
                isDisplayScrambleMedium={this.state.isDisplayScrambleMedium}
                isDisplayScrambleSmall={this.state.isDisplayScrambleSmall}
                multiBLDScramble={this.state.multiBLDScramble}
                scrambleRegular={this.state.scramble}
                megaminxScramble={this.state.megaminxScramble}
                />
            </div>
        )
    }
}

export default Scramble