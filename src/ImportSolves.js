import React, { Component } from "react"

class ImportSolves extends Component{

    state={
        solve: "",
        scramble: "",
        session: "",
        hours: "",
        minutes: "", 
        secondsTwo: "", 
        seconds: "",
        milliseconds: "",
        displayTimeFormatted: "",
        isIncorrectFormat: false, 
    }

    jsonError = (input) => {
        try {
            return JSON.parse(input);
        } catch (err) {
            return false;
        }
    }   

    importLoop = () => {
        let sessionArray = [...this.props.uniqueSessionsDB].reverse()
        let session = 0 
        if (this.props.uniqueSessionsDB.length>0){
            session = Math.max(...this.props.uniqueSessionsDB) 
        }
        let error = this.jsonError(this.props.importSolves)
        if (error !== false){
            this.setState({
                isIncorrectFormat: false,
            })
            let x = JSON.parse(this.props.importSolves)
            delete x["properties"]
            let y = JSON.parse(this.props.importSolves)
            let propertiesArray = []
            if (y["properties"]){
                let z = JSON.parse(y["properties"]["sessionData"])
                for (const value of Object.values(z)){
                    propertiesArray.push(value)
                }
            }
            let solvesArray = []
            var values1 = []
            for (const value of Object.values(x)) {
                if(value.length>0){
                    values1.push(value)
                }
            }
            
            propertiesArray.reverse()
            values1.map((solve1,index)=>{
                session++
                sessionArray.push(session)
                let puzzleType = ""
                let sessionName = ""
                if (propertiesArray[index]){
                    if (propertiesArray[index]["opt"]['scrType']){
                        puzzleType = propertiesArray[index]["opt"]['scrType']
                    }else{
                        puzzleType = ""
                    }
                    if (propertiesArray[index]["name"]){
                        sessionName = propertiesArray[index]["name"]
                    }else{
                        sessionName = ""
                    }
                }
                solve1.map(solve=>{
                    let solveToDB = {}
                    if (puzzleType === ""){
                        solveToDB["puzzle"]= "3x3"
                    }
                    if (puzzleType === "mgmp"){
                        solveToDB["puzzle"] = "Megaminx"
                    }
                    if (puzzleType === "777wca"){
                        solveToDB["puzzle"] = "7x7"
                    }
                    if (puzzleType === "222so"){
                        solveToDB["puzzle"] = "2x2"
                    }
                    if (puzzleType === "444bld"){
                        solveToDB["puzzle"] = "4x4 BLD"
                    }
                    if (puzzleType === "555bld"){
                        solveToDB["puzzle"] = "5x5 BLD"
                    }
                    if (puzzleType === "sqrs"){
                        solveToDB["puzzle"] = "Square-1"
                    }
                    if (puzzleType === "skbso"){
                        solveToDB["puzzle"] = "Skewb"
                    }
                    if (puzzleType === "pyrso"){
                        solveToDB["puzzle"] = "Pyraminx"
                    }
                    if (puzzleType === "clkwca"){
                        solveToDB["puzzle"] = "Clock"
                    }
                    if (puzzleType === "333oh"){
                        solveToDB["puzzle"] = "3x3 OH"
                    }
                    if (puzzleType === "333ni"){
                        solveToDB["puzzle"] = "3x3 BLD"
                    }
                    if (puzzleType === "666wca"){
                        solveToDB["puzzle"] = "6x6"
                    }
                    if (puzzleType === "555wca"){
                        solveToDB["puzzle"] = "5x5"
                    }
                    if (puzzleType === "444wca"){
                        solveToDB["puzzle"] = "4x4"
                    }
                    if (puzzleType === "r3ni"){
                        solveToDB["puzzle"] = "Multi-BLD"
                    }
                    
                    const hours = Math.floor(solve[0][1] / 3600000)
                    const minutes = Math.floor((solve[0][1] / 60000)%60)
                    const seconds = Math.floor((solve[0][1] / 1000)%60)
                    const milliseconds = (solve[0][1] % 1000)
                    let msTwo = Number(solve[0][1]) + 2000
                    const hoursTwo = Math.floor(msTwo / 3600000)
                    const minutesTwo = Math.floor((msTwo / 60000)%60)
                    const secondsTwo = Math.floor((msTwo / 1000)%60)
                    const millisecondsTwo = (msTwo % 1000)
                    var time = ""
                    let timeTwo = ""
                    if (hours > 0){
                        time += hours + ":"
                    }
                    if(minutes>0){
                        time += minutes 
                        time += ":"
                        if(seconds<10){
                            time+="0"
                        }
                    }
                    time += seconds  + "."
                    if (milliseconds < 10){
                        time += "00"
                    }
                    if (milliseconds < 100){
                        if (milliseconds > 9){
                            time += "0"
                        }
                    }
                    time += milliseconds
                    
                    if (hoursTwo > 0){
                        timeTwo += hoursTwo + ":"
                    }
                    if(minutesTwo>0){
                        timeTwo += minutesTwo 
                        timeTwo += ":"
                        if(secondsTwo<10){
                            timeTwo+="0"
                        }
                    }
                    timeTwo += secondsTwo  + "."
                    if (millisecondsTwo < 10){
                        timeTwo += "00"
                    }
                    if (millisecondsTwo < 100){
                        if (millisecondsTwo > 9){
                            timeTwo += "0"
                        }
                    }
                    timeTwo += millisecondsTwo
                    
                    let solveid = ""
                    solveid += Date.now() 
                    
                    if (solve[0][0]===2000){
                        solveToDB["isplustwo"] = true
                    }
                    if (solve[0][0]===0){
                        solveToDB["isplustwo"] = false
                    }
                    if (solve[0][0]===-1){
                        solveToDB["isdnf"] = true
                    }else{
                        solveToDB["isdnf"] = false
                    }
                    solveToDB["solve"]=time
                    solveToDB["plustwo"] = String(timeTwo)
                    solveToDB["milliseconds"]=solve[0][1]
                    solveToDB["millisecondstwo"] = String(Number(solve[0][1]) + 2000)
                    if (solve[1]===null){
                        solveToDB["scramble"]=null
                    }else{
                        solveToDB["scramble"]=solve[1]
                    }
                    var abc2 = solve[3]*1000
                    if (solve[3] === null){
                        solveToDB["date"]=null
                    }else{
                        let date = new Date(abc2).toISOString()
                        date = date.slice(0,10)
                        date += "T07:00:00.000Z"
                        solveToDB["date"]= date
                    }
                    solveToDB["session"]=session
                    solveToDB["id"]=this.props.id
                    if (solve[3] === null){
                        solveToDB["unix"]= null
                    }else{
                        solveToDB["unix"]=solve[3]
                    }
                    solveToDB["sessionname"]=sessionName
                    if (solve[4]!==null){
                        solveToDB["sessionname"]=solve[4]
                    }else{
                        solveToDB["sessionname"]=null
                    }
                    if (solve[5]){
                        solveToDB["puzzle"] = solve[5]
                    }
                    solveToDB["solveid"] = solveid
                    solvesArray.push(solveToDB)
                    this.importResults(solveToDB)
                    return(null)
                })
                return(null)
            }) 
            this.props.getSolvesFromImport(solvesArray)
            this.props.addToUniqueSessionsDB(sessionArray)
            setTimeout(()=>this.props.manageSolveData(),100)
            setTimeout(()=>this.props.getInterfaceSession(sessionArray.length),100)
            setTimeout(()=>this.props.getSessionNumber(session),100)
        }else{
            this.setState({
                isIncorrectFormat: true,
            })
        }
    }

    handleButtonClick = () => {
        const test1 = async () => {
            await this.importLoop()
            await this.props.handleImportSolvesSubmit()
            await setTimeout(()=>this.props.getSolves(),1)
        };
        test1();
    };

    sessionNumber = () => {
        this.setState({
            session: Math.max(...this.props.uniqueSessionsDB)
        })
    }
    
    importResults = (input) => {
        // sends each solve to db when called
        fetch("https://blooming-hollows-98248.herokuapp.com/import",{
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            input: input,
          })
        })
        .then(response => response.json())
    }

    componentDidMount() {
        setTimeout(()=>this.sessionNumber(),10)
    }

    render() {
        return(
            <div>
                {this.state.isIncorrectFormat ? 
                <h4 style={{color: "red"}}>unreadable format</h4>
                :
                <h4> </h4>
                }
                {this.props.isImportFromFile ? 
                <h1><button onClick={this.handleButtonClick} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Import</button></h1>
                :
                <h1><button onClick={this.props.isImportFromFileFunc} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Import From File</button></h1>
                }
            </div>
        )
    }
}

export default ImportSolves