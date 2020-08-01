import React, { Component } from "react"

class ImportManual extends Component{

    state={
        session: null,
        count: 0,
        pastSessionName: null,
        pastPuzzle: null,
        pastDate: null,
        isDateWrong: false,
        isSolveEntered: false,
        isTimeWrong: false,
    }

    componentDidMount(){
        this.getSession()
    }

    getSession = () => {
        this.setState({
            session: Math.max(...this.props.uniqueSessionsDB)+1
        })
    }

    sendToDB = () =>{
        let isSolveEntered = false
        if (this.props.time > 0){
            isSolveEntered = true
        }
        if (isSolveEntered){
            this.setState({
                isSolveEntered: false
            })
            let result = true
            if (this.props.date) {
                let regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
                let date = this.props.date
                result = regex.test(date)
            }
            if (result){
                if (this.state.isDateWrong){
                    this.setState({
                        isDateWrong: false,
                    })
                }
                    if (this.props.time) {
                        let regex = /^[ 0-9.,]/
                        let time = this.props.time
                        result = regex.test(time)
                    }
                    if (result){
                        if (this.state.isTimeWrong){
                            this.setState({
                                isTimeWrong: false,
                            })
                        }
                    let tempSession = this.state.session
                    if (this.state.count > 0) {
                        if (this.props.importManualTextAreaName !== this.state.pastSessionName
                            || this.props.date !== this.state.pastDate
                            || this.props.puzzle !== this.state.pastPuzzle){
                            this.setState(prevState=>({
                                session: prevState.session + 1
                            }))
                            tempSession += 1
                        }
                    }
                    var x = this.props.time
                    var y = x.match(/\d+/g)
                    var z = y.slice().reverse()
                    var ms = 0
                    z.map((number, index) =>{
                        if(index===0){
                            if (number.length===1){
                                ms+=number*100
                            }
                            if (number.length===2){
                                ms+=number*10
                            }
                            if (number.length===3){
                                ms+=number*1
                            }
                        }
                        if(index===1){
                            ms+=number*1000
                        }
                        if(index===2){
                            ms+=number*60000
                        }
                        if(index===3){
                            ms+=number*3600000
                        }
                        return(null)
                    })
                    let timeFormatted = ""
                    let one = ""
                    let two = ""
                    let three = ""
                    let four = ""
            
                    four += "." + (y[y.length-1])
                    if(y[y.length-1].length===1){
                        four += "00"
                    }
                    if(y[y.length-1].length===2){
                        four += "0"
                    }
                    if(y[y.length-2]){
                        if(y[y.length-3]){
                            if (y[y.length-2]<10){
                                if (!y[y.length-2].includes(0)){
                                    three+="0"
                                }
                            }
                        }
                        three += y[y.length-2]
                    }else{
                        three+="0"
                    }
                    if(y[y.length-3]){
                        if(y[y.length-4]){
                            if (y[y.length-3]<10){
                                if (!y[y.length-3].includes(0)){
                                    two+="0"
                                }
                            }
                        }
                        two += y[y.length-3]
                        two+=":"
                    }
                    if(y[y.length-4]){
                        one += y[y.length-4]
                        one+=":"
                    }
                    timeFormatted += one + two + three + four
                    let msTwo = ms + 2000
                    let msTwoFinal = ""
                    const hours = Math.floor(msTwo / 3600000)
                    const minutes = Math.floor((msTwo / 60000)%60)
                    const seconds = Math.floor((msTwo / 1000)%60)
                    const milliseconds = (msTwo % 1000)
                    if (hours>0){
                        msTwoFinal +=  hours + ":"
                    }
                    if (minutes>0) {
                        if (minutes < 10){
                            msTwoFinal += "0"
                        }
                        msTwoFinal +=  minutes + ":"
                        if (seconds < 10){
                            msTwoFinal += "0"
                        }
                    }
                    if (minutes === "0" || minutes==="00"){
                        msTwoFinal += "0:"
                    }
                    if (seconds > 0) {
                        msTwoFinal += seconds + "."
                    }
                    msTwoFinal += milliseconds
                    
                    
                    var unix = null
                    if (this.props.date){
                        unix = new Date(this.props.date).getTime() / 1000
                    }
                    
                    let solveid = ""
                    solveid+=Date.now()
                    
                    let solvesToAppState = {}
                    
                    let scramble = ""

                    if(this.props.puzzle==="Multi-BLD"){
                        let multiScramble = this.props.scramble.split(" ")
                        for (const letter of multiScramble){
                            if(letter.includes(")")){
                                scramble += "\n" 
                            }
                            scramble += letter
                            scramble+=" "
                        }
                    }else if(this.props.puzzle==="Megaminx"){
                        let megaminxScramble = this.props.scramble.split(" ")
                        for (const letter of megaminxScramble) { 
                            scramble += letter
                            if (letter ==="U" || letter==="U'"){
                                scramble += "\n"
                            }
                            scramble+=" "
                        }
                    }else{
                        scramble=this.props.scramble
                    }

                    solvesToAppState["scramble"] = scramble

                    solvesToAppState["id"] = this.props.id
                    
                    solvesToAppState["session"] = tempSession
                    if(this.props.date===null){
                        solvesToAppState["date"] = null
                    }else{
                        solvesToAppState["date"] = this.props.date
                    }
                    solvesToAppState["solve"] = timeFormatted
                    solvesToAppState["unix"] = String(unix)
                    solvesToAppState["puzzle"] = this.props.puzzle
                    solvesToAppState["milliseconds"] = ms
                    solvesToAppState["sessionname"] = this.props.importManualTextAreaName
                    solvesToAppState["solveid"] = solveid
                    solvesToAppState["plustwo"] = msTwoFinal
                    solvesToAppState["isdnf"] = false
                    solvesToAppState["isplustwo"] = false
                    solvesToAppState["millisecondstwo"] = ms + 2000
            
                    this.props.getSolvesFromImportManual(solvesToAppState)
                    this.props.handleImportManualSubmit()
                    this.setState({
                        pastSessionName: this.props.importManualTextAreaName,
                        pastPuzzle: this.props.puzzle,
                        pastDate: this.props.date,
                    })
                    this.setState(prevState=>({
                        count: prevState.count + 1
                    }))
                    setTimeout(()=>this.props.getSolves(),100)
                    setTimeout(()=>this.props.manageSolveData(), 100)
                    setTimeout(()=>this.props.addToUniqueSessionsDB(this.state.session), 50)
                    setTimeout(()=>this.props.getSessionNumber(this.state.session), 100)
                    setTimeout(()=>this.props.getInterfaceSession(this.props.uniqueSessionsDB.length), 100)
                }else{
                    this.setState({
                        isDateWrong: true,
                    })
                }
            }else{
                this.setState({
                    isDateWrong: true,
                })
            }
        }else{
            this.setState({
                isTimeWrong: true,
            })
        }
    }

        

    render(){
        return(
            <div className="center">
                {this.props.isManual ? 
                <div>
                    <h4>Time (H:M:S.MS):</h4>
                    <input id="importManualTime" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.props.handleImportManualTimeChange} type="text"></input>

                    <h4>Scramble:</h4>
                    <input id="importManualScramble" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.props.handleImportManualScrambleChange} type="text"></input>
                    <h4>
                        Date (YYYY-MM-DD): 
                    </h4>
                    <h4>
                        *Use of charts requires date
                    </h4>
                    <input id="importManualDate" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.props.handleImportManualDateChange} type="text"></input>
                    <h4>Session name:</h4>
                    <input id="importManualName" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.handleImportManualNameChange} type="text"></input>
                    <h4>Puzzle:</h4>

                    <select className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.getPuzzleType} id="puzzle" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}}>
                        <option value="3x3">3x3</option>
                        <option value="2x2">2x2</option>
                        <option value="4x4">4x4</option>
                        <option value="5x5">5x5</option>
                        <option value="6x6">6x6</option>
                        <option value="7x7">7x7</option>
                        <option value="Pyraminx">Pyraminx</option>
                        <option value="Megaminx">Megaminx</option>
                        <option value="Skewb">Skewb</option>
                        <option value="Square-1">Square-1</option>
                        <option value="Clock">Clock</option>
                        <option value="3x3 BLD">3x3 BLD</option>
                        <option value="3x3 OH">3x3 OH</option>
                        <option value="4x4 BLD">4x4 BLD</option>
                        <option value="5x5 BLD">5x5 BLD</option>
                        <option value="Multi-BLD">Multi-BLD</option>
                    </select>
                </div>
                :
                <div></div>
                }
                {this.state.isDateWrong ? 
                <h4 style={{color: "red"}}>Invalid date format</h4>
                :
                <h4> </h4>
                }
                {this.state.isTimeWrong ? 
                <h4 style={{color: "red"}}>Invalid time format</h4>
                :
                <h4> </h4>
                }
                {this.state.isSolveEntered ? 
                <h4 style={{color: "red"}}>You must enter a solve time</h4>
                :
                <h4> </h4>
                }
                {this.props.isManual ? 
                <h1><button onClick={this.sendToDB} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Import</button></h1>
                :
                <h1><button onClick={this.props.isManualFunc} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Import Manually</button></h1>
                }
            </div>
        )
    }
}

export default ImportManual