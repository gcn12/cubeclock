import React, { Component } from "react"
import "./Settings.css"
import ImportSolves from "./ImportSolves"
import ImportManual from "./ImportManual"
import DownloadSolves from "./DownloadSolves"
import DownloadCSV from "./DownloadCSV"

class Settings extends Component{

    state = {
        importSolvesTextArea: "",
        importSolves: "",
        importManualTextAreaTime: "",
        importManualTextAreaScramble: null,
        importManualTextAreaDate: null,
        importManualTextAreaName: null,
        puzzle: "3x3",
        isManual: false,
        isImportFromFile: false,
        session: 1,
        aoNum: "",
        isInvalidAoNum: false,
        isAoSubmitted: false,
    }

    aoNumInput = (e) => {
        this.setState({
            aoNum: e.target.value
        })
    }

    aoNumChange = (input) => {
        if (input>3 && input<1001){
            localStorage.setItem("ao", JSON.stringify(input))
            fetch("https://blooming-hollows-98248.herokuapp.com/ao", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.id,
                    aonumber: input
                })
            }).then(response=>response.json())
            this.props.aoNumChange(input)
            this.setState({
                isInvalidAoNum: false,
                isAoSubmitted: true,
            })
        }else{
            this.setState({
                isInvalidAoNum: true,
                isAoSubmitted: false,
            })
        }
    }
    
    isCountDownActivated = () => {
        this.props.inspection()
        if (document.getElementById("countdown").checked===true){
            localStorage.setItem("countDown", JSON.stringify(true))
        }
        if(document.getElementById("countdown").checked===false){
            localStorage.setItem("countDown", JSON.stringify(false))
        }
    }

    isConfirmSolve = () => {
        this.props.confirmSolveDelete()
        if(document.getElementById("solveconfirm").checked===true){
            localStorage.setItem("solveconfirm", JSON.stringify(true))
        }
        if(document.getElementById("solveconfirm").checked===false){
            localStorage.setItem("solveconfirm", JSON.stringify(false))
        }
    }

    isMobile = () => {
        this.props.mobileStartStop()
        if(document.getElementById("mobile").checked===true){
            localStorage.setItem("mobile", JSON.stringify(true))
        }
        if(document.getElementById("mobile").checked===false){
            localStorage.setItem("mobile", JSON.stringify(false))
        }
    }

    isConfirmSession = () => {
        this.props.confirmSessionDelete()
        if(document.getElementById("sessionconfirm").checked===true){
            localStorage.setItem("sessionconfirm", JSON.stringify(true))
        }
        if(document.getElementById("sessionconfirm").checked===false){
            localStorage.setItem("sessionconfirm", JSON.stringify(false))
        }
    }

    isDisableTimer = () => {
        this.props.disableTimer()
        if(document.getElementById("disabletimer").checked===true){
            localStorage.setItem("disabletimer", JSON.stringify(true))
        }
        if(document.getElementById("disabletimer").checked===false){
            localStorage.setItem("disabletimer", JSON.stringify(false))
        }
    }

    getMobileOnMount = () => {
        if(localStorage.mobile) {
            let x = JSON.parse(localStorage.getItem("mobile"))
            document.getElementById("mobile").checked=x
        }
    }

    getConfirmSessionOnMount = () => {
        if(localStorage.solveconfirm) {
            let x = JSON.parse(localStorage.getItem("sessionconfirm"))
            document.getElementById("sessionconfirm").checked=x
        }
    }

    getDisableTimerOnMount= () => {
        if(localStorage.disabletimer) {
            let x = JSON.parse(localStorage.getItem("disabletimer"))
            document.getElementById("disabletimer").checked=x
        }
    }

    getConfirmSolveOnMount = () => {
        if(localStorage.solveconfirm) {
            let x = JSON.parse(localStorage.getItem("solveconfirm"))
            document.getElementById("solveconfirm").checked=x
        }
    }

    getCountDownOnMount = () => {
        if(localStorage.countDown) {
            var x = localStorage.getItem("countDown")
            var y = JSON.parse(x)
            document.getElementById("countdown").checked = y
        }
    }
 

    handleImportSolvesChange = (event) => {
        this.setState({
            importSolvesTextArea: event.target.value
        })
    }

    handleImportManualTimeChange = (event) => {
        this.setState({
            importManualTextAreaTime: event.target.value
        })
    }

    handleImportManualScrambleChange = (event) => {
        this.setState({
            importManualTextAreaScramble: event.target.value
        })
    }

    handleImportManualDateChange = (event) => {
        this.setState({
            importManualTextAreaDate: event.target.value
        })
    }

    handleImportManualNameChange = (event) => {
        this.setState({
            importManualTextAreaName: event.target.value
        })
    }

    handleImportSolvesSubmit = () => {
        this.setState({
            importSolves: this.state.importSolvesTextArea
        })
        document.getElementById("importSolves").value=" "
    }

    handleImportManualSubmit = () => {
        this.setState({
            importSolves: this.state.importSolvesTextArea
        })
        document.getElementById("importManualTime").value=" "
        if (this.state.importManualTextAreaScramble) {
            document.getElementById("importManualScramble").value=" "
        }
        // if (this.state.importManualTextAreaDate) {
        //     document.getElementById("importManualDate").value=" "
        // }
    }

    isManual = () => {
        if(this.props.uniqueSessionsDB.length >0){
            const session = this.props.uniqueSessionsDB.length + 1
            this.setState({
                session: session,
            })
        }
        this.setState({
            isManual: true,
        })
    }

    isImportFromFile = () => { 
        this.setState({
            isImportFromFile: true,
        })
    }

    componentDidMount() {
        this.getCountDownOnMount()
        this.getConfirmSolveOnMount()
        this.getConfirmSessionOnMount()
        this.getMobileOnMount()
        this.getDisableTimerOnMount()
    }

    getPuzzleType = () => {
        const x = document.getElementById("puzzle")
        const y = x.options[x.selectedIndex].value
        this.setState({
            puzzle: y,
        })
    }

    deleteAccountConfirm = () => {
        let confirmation = window.confirm("Are you sure you want to DELETE your account? This cannot be undone.")
        if (confirmation) {
            this.props.deleteAccount()
        }
    }

    changeUsername = () => {
        localStorage.setItem("user", JSON.stringify(this.props.user))

    }

    render() {
        return(
            <div style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
                    <div className="center">
                        {this.props.isBackgroundLight 
                        ? <h1><button style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" onClick={this.props.themeToDB}>Dark</button></h1> 
                        : <h1><button style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" onClick={this.props.themeToDB}>Light</button></h1>
                        }
                    </div>
                    <div className="center">
                        <h1><button onClick={this.props.signout} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Sign Out</button></h1>
                    </div>

                    <div className="center">
                        <h1 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Preferences</h1>
                    </div>
                    
                    <div className="summary-center">
                        <nav  style={{display: 'flex'}}>
                            <h4>Inspection Time</h4>
                            <input type="checkbox" id="countdown" className="checkbox" onClick={this.isCountDownActivated} />  
                            <label htmlFor="countdown" className="switch"></label>
                        </nav>
                    </div>

                    <div className="center">
                        <br></br>
                        <nav style={{display: 'flex', justifyContent: "center"}}>
                        <h1><button onClick={this.props.inspectionTimeMinus} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>-1</button></h1>
                        <h4>{this.props.inspectionTime}</h4>
                        <h1><button onClick={this.props.inspectionTimePlus} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>+1</button></h1>
                        </nav>
                    </div>
                    <div className="center">
                        <h4>ao #</h4>
                        <br></br>

                        <div className="center">
                            {this.props.isBackgroundLight ? 
                            <input style={{width: "100px", color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder={this.props.aoNum} className="pa2 ba b--green bg-white form-input" onChange={this.aoNumInput} type="text"></input>
                            :
                            <input style={{width: "100px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder={this.props.aoNum} className="pa2 ba b--green bg-black form-input"  onChange={this.aoNumInput} type="number"></input>
                            }
                        </div>

                        {this.state.isAoSubmitted ? 
                        <h4 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Number has been updated</h4>
                        :
                        <h4> </h4>
                        }
                        {this.state.isInvalidAoNum ? 
                        <h4 style={{color: "red"}}>Number must be between 4 and 1000</h4>
                        :
                        <h4> </h4>
                        }
                    <h1><button onClick={()=>this.aoNumChange(this.state.aoNum)} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change AO number</button></h1>
                    </div>
                    {/* <div className="center">
                        <h4>Scramble Length</h4>
                        <br></br>
                        <nav style={{display: 'flex', justifyContent: "center"}}>
                        <h1><button onClick={this.props.scrambleQuantityMinus} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>-1</button></h1>
                        <h4>{this.props.scrambleQuantity}</h4>
                        <h1><button onClick={this.props.scrambleQuantityPlus} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>+1</button></h1>
                        </nav>
                    </div> */}

                    {/* <div className="summary-center">
                    <nav  style={{display: 'flex'}}> */}
                    {/* <h4 >Touch Start/Stop</h4> */}
                    {/* <br></br> */}
                        {/* <label for="mobile">label1</label>
                        <input type="checkbox" id="mobile" className="checkbox" onClick={this.isMobile} />  
                        <label htmlFor="mobile" className="switch"></label>
                    </nav>
                    </div>
                    <br></br> */}

                    {/* <div className="summary-center">
                    <nav  style={{display: 'flex'}}>
                    <h4 >Confirm Before Deleting Solve</h4>
                        <input type="checkbox" id="solveconfirm" className="checkbox" onClick={this.isConfirmSolve} />  
                        <label htmlFor="solveconfirm" className="switch"></label>
                        </nav>
                    </div>
                    <br></br> */}


                    {/* <div className="summary-center">
                    <nav  style={{display: 'flex'}}>
                    <h4 className="center">Confirm Before Deleting Session</h4>
                        <input type="checkbox" id="sessionconfirm" className="checkbox" onClick={this.isConfirmSession} />  
                        <label htmlFor="sessionconfirm" className="switch"></label>
                        </nav>
                    </div>
                    <br></br> */}

                    {/* <div className="summary-center">
                        <nav  style={{display: 'flex'}}>
                        <h4 className="center">Deactivate timer during solve</h4>
                        <input type="checkbox" id="disabletimer" className="checkbox" onClick={this.isDisableTimer} />  
                        <label htmlFor="disabletimer" className="switch"></label>
                        </nav>
                    </div> */}

                    <br></br>


                    <ul className="summary-center">      
                        <li>
                            <label htmlFor="mobile" className="label1"><h4>Touch start/stop</h4></label>
                            <input type="checkbox" id="mobile" className="checkbox input1" onClick={this.isMobile} />  
                            <label htmlFor="mobile" className="switch"></label>
                        </li>  
                        <br></br>
                        <li>
                            <label htmlFor="solveconfirm" className="label1"><h4>Confirm before deleting solve</h4></label>
                            <input type="checkbox" id="solveconfirm" className="checkbox input1" onClick={this.isConfirmSolve} />  
                            <label htmlFor="solveconfirm" className="switch"></label>
                        </li>  
                        <br></br>
                        <li>
                            <label htmlFor="sessionconfirm" className="label1"><h4>Confirm before deleting session</h4></label>
                            <input type="checkbox" id="sessionconfirm" className="checkbox input1" onClick={this.isConfirmSession} />  
                            <label htmlFor="sessionconfirm" className="switch"></label>
                        </li>
                        <br></br>
                        <li>
                            <label htmlFor="disabletimer" className="label1"><h4>Deactivate timer during solve</h4></label>
                            <input type="checkbox" id="disabletimer" className="checkbox input1" onClick={this.isDisableTimer} />  
                            <label htmlFor="disabletimer" className="switch"></label>
                        </li>
                    </ul>


                    <br></br>
                    <hr></hr>

                    <div className="center">
                        <h1 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Export Solves</h1>
                    </div>
                    <DownloadSolves 
                    isBackgroundLight={this.props.isBackgroundLight} 
                    solves={this.props.solves} getSolves={this.props.getSolves}
                    averageMS={this.props.averageMS}
                    getAveragesMS={this.props.getAveragesMS}
                    />
                    <DownloadCSV 
                    isBackgroundLight={this.props.isBackgroundLight}  
                    solves={this.props.solves} 
                    getSolves={this.props.getSolves}
                    />
                    <div className="center">
                    <h1 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Import Solves</h1>
                    {this.state.isManual ? 
                        <div>
                            <h4>Time (H:M:S.MS):</h4>
                            {this.props.isBackgroundLight ? 
                            <input id="importManualTime" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" onChange={this.handleImportManualTimeChange} type="text"></input>
                            :
                            <input id="importManualTime" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input"  onChange={this.handleImportManualTimeChange} type="text"></input>
                            }
                            <h4>Scramble:</h4>
                            {this.props.isBackgroundLight ? 
                            <input id="importManualScramble" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" onChange={this.handleImportManualScrambleChange} type="text"></input>
                            :
                            <input id="importManualScramble" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input"  onChange={this.handleImportManualScrambleChange} type="text"></input>
                            }
                            <h4>
                                Date (YYYY-MM-DD): 
                            </h4>
                            <h4>
                                *Use of charts requires date
                            </h4>
                            {this.props.isBackgroundLight ? 
                            <input id="importManualDate" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" onChange={this.handleImportManualDateChange} type="text"></input>
                            :
                            <input id="importManualDate" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input"  onChange={this.handleImportManualDateChange} type="text"></input>
                            }
                            <h4>Session name:</h4>
                            {this.props.isBackgroundLight ? 
                            <input id="importManualName" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" onChange={this.handleImportManualNameChange} type="text"></input>
                            :
                            <input id="importManualName" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input"  onChange={this.handleImportManualNameChange} type="text"></input>
                            }
                            <h4>Puzzle:</h4>
                            {this.props.isBackgroundLight ? 
                            <select className="pa2 ba b--green bg-white" onChange={this.getPuzzleType} id="puzzle" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}}>
                                {/* <option value ="null" ></option> */}
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
                            :
                            <select className="pa2 ba b--green bg-black"  onChange={this.getPuzzleType} id="puzzle" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}}>
                                {/* <option value ="null" ></option> */}
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
                            }
                        </div>
                        :
                        <div>
                        </div>
                        }
                        <ImportManual 
                        addToUniqueSessionsDB={this.props.addToUniqueSessionsDB}
                        getInterfaceSession={this.props.getInterfaceSession}
                        getSessionNumber={this.props.getSessionNumber}
                        manageSolveData={this.props.manageSolveData}
                        getSolves={this.props.getSolves}
                        getSolvesFromImportManual={this.props.getSolvesFromImportManual} 
                        getCategories={this.props.getCategories}  
                        puzzle={this.state.puzzle} 
                        importManualTextAreaName={this.state.importManualTextAreaName} 
                        isBackgroundLight={this.props.isBackgroundLight}  
                        session={this.state.session} 
                        isManualFunc={this.isManual} 
                        isManual={this.state.isManual} 
                        date={this.state.importManualTextAreaDate} 
                        scramble={this.state.importManualTextAreaScramble} 
                        handleImportManualSubmit={this.handleImportManualSubmit} 
                        id={this.props.id} 
                        uniqueSessionsDB={this.props.uniqueSessionsDB} 
                        time={this.state.importManualTextAreaTime}/>
                        {this.state.isImportFromFile ? 
                        <div>
                            <h4>Copy and paste .json data from .txt file</h4>
                            {this.props.isBackgroundLight ? 
                            <textarea style={{color: "rgb(25, 25, 25)"}} id="importSolves" className="pa2 ba b--green bg-white" onChange={this.handleImportSolvesChange} rows="13" cols="80"></textarea>
                            :
                            <textarea style={{color: "white"}}  id="importSolves" className="pa2 ba b--green bg-black" onChange={this.handleImportSolvesChange} rows="13" cols="80"></textarea>
                            }
                        </div>
                        :
                        <div>
                        </div>
                        }
                        <ImportSolves 
                        addToUniqueSessionsDB={this.props.addToUniqueSessionsDB}
                        getInterfaceSession={this.props.getInterfaceSession}
                        getSessionNumber={this.props.getSessionNumber}
                        manageSolveData={this.props.manageSolveData}
                        getSolvesFromImport={this.props.getSolvesFromImport}
                        getSolves={this.props.getSolves}
                        getSolvesFromImportManual={this.props.getSolvesFromImportManual}
                        getCategories={this.props.getCategories}  
                        isBackgroundLight={this.props.isBackgroundLight}  
                        isImportFromFile={this.state.isImportFromFile} 
                        isImportFromFileFunc={this.isImportFromFile} 
                        handleImportSolvesSubmit={this.handleImportSolvesSubmit} 
                        id={this.props.id} 
                        uniqueSessionsDB={this.props.uniqueSessionsDB} 
                        importSolves={this.state.importSolvesTextArea}
                        />
                    </div>
                    
                    
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <div className="center"> 
                        <h2>Change username:</h2>
                        <br></br>
                        {this.props.isBackgroundLight ? 
                        <input id="txt-input" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter new username" className="pa2 ba b--green bg-white form-input" onChange={this.props.username} type="text"></input>
                        :
                        <input id="txt-input" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter new username" className="pa2 ba b--green bg-black form-input"  onChange={this.props.username} type="text"></input>
                        }
                        {
                            this.props.usernameExists ? 
                            <h4 style={{color: "red"}}>Username unavailable</h4>
                            :
                            <h4> </h4>
                        }
                        {
                        this.props.isUsernameChanged ?
                        <h4>Username has been changed</h4> 
                        :
                        <h4> </h4>
                        }
                        <h1><button onClick={this.props.changeUsername} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change</button></h1>
                    </div>
                    <div className="center">
                        <br></br>
                        <h2>Change password:</h2>
                        <br></br>
                        {this.props.isBackgroundLight ? 
                        <input id="change2" style={{width: "200px",color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter current password" className="pa2 ba b--green bg-white form-input" onChange={this.props.oldPassword} type="password"></input>
                        :
                        <input id="change2" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter current password" className="pa2 ba b--green bg-black form-input"  onChange={this.props.oldPassword} type="password"></input>
                        }
                        <br></br>
                        <br></br>
                        {this.props.isBackgroundLight ? 
                        <input id="change" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter new password" className="pa2 ba b--green bg-white form-input" onChange={this.props.newPassword} type="password"></input>
                        :
                        <input id="change" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter new password" className="pa2 ba b--green bg-black form-input"  onChange={this.props.newPassword} type="password"></input>
                        }
                        {this.props.isBackgroundLight ? 
                        <input id="change3" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Re-enter new password" className="pa2 ba b--green bg-white form-input" onChange={this.props.newPasswordReenter} type="password"></input>
                        :
                        <input id="change3" style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Re-enter new password" className="pa2 ba b--green bg-black form-input"  onChange={this.props.newPasswordReenter} type="password"></input>
                        }
                        {this.props.isPasswordChanged ? 
                        <h4>Password has been changed</h4> 
                        :
                        <h4> </h4>
                        }
                        {
                            this.props.isWrongPassword ?
                            <h4 style={{color: "red"}}>Incorrect password</h4>
                            :
                            <h4> </h4>
                        }
                        {
                            this.props.isPasswordMatch ?
                            <h4> </h4>
                            :
                            <h4 style={{color: "red"}}>Passwords do not match</h4>
                        }
                        <h1><button type="button" onClick={this.props.changePassword} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change</button></h1>
                        <br></br>
                    </div>
                    <div className="center">
                        <h2>Delete account:</h2>
                        <br></br>
                        {this.props.isBackgroundLight ? 
                        <input style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" placeholder="Enter password" onChange={this.props.deleteAccountPassword}type="password"></input>
                        :
                        <input style={{width: "200px", color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input" placeholder="Enter password" onChange={this.props.deleteAccountPassword} type="password"></input>
                        }
                        {/* <input type="password" onChange={this.props.deleteAccountPassword} placeholder="Enter password" className="form-input" ></input>  */}
                        {
                            this.props.isWrongPassword2 ?
                            <h4 style={{color: "red"}}>Incorrect password</h4>
                            :
                            <h4> </h4>
                        }
                        <h1><button onClick={this.deleteAccountConfirm} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Delete Account</button></h1>
                    </div>
                    <br></br>
                    <br></br>
                </div>
        )
    }
}

export default Settings