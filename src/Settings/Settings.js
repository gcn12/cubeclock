import React, { Component } from "react"
import "./Settings.css"
import ImportSolves from "./ImportSolves"
import ImportManual from "./ImportManual"
import DownloadSolves from "./DownloadSolves"
import DownloadCSV from "./DownloadCSV"
import InspectionTime from "./InspectionTime"
import ChangeAO1 from "./ChangeAO1"
import ChangeAO2 from "./ChangeAO2"
import Toggles from "./Toggles"
import ChangeUsername from "./ChangeUsername"
import ChangePassword from "./ChangePassword"
import DeleteAccount from "./DeleteAccount"

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
        aoNum2: "",
        isInvalidAoNum: false,
        isAoSubmitted: false,
        isInvalidAoNum2: false,
        isAoSubmitted2: false,
        inspectionTime: "",
        isInspectionSubmitted: false,
        isInvalidInspection: false,
        didOnlineSyncWork: false,
        isSyncUnsuccessful: false,
    }

    aoNumInput = (e) => {
        this.setState({
            aoNum: e.target.value
        })
    }

    aoNumInput2 = (e) => {
        this.setState({
            aoNum2: e.target.value
        })
    }

    inspectionTimeToState = (e) => {
        this.setState({
            inspectionTime: e.target.value
        })
    }

    changeInspectionTime = (input) => {
        if (input < 101 && input > -1){
            this.props.changeInspectionTime(input)
            this.setState({
                isInvalidInspection: false,
                isInspectionSubmitted: true, 
            })
        }else{
            this.setState({
                isInvalidInspection: true,
                isInspectionSubmitted: false, 
            })
        }
    }

    aoNumChange = (input) => {
        if (input>3 && input<1001){
            let offline = JSON.parse(localStorage.getItem("offline"))
            if(!offline){
                fetch("https://blooming-hollows-98248.herokuapp.com/ao", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.props.id,
                        aonumber: input
                    })
                }).then(response=>response.json())
            }
            localStorage.setItem("ao", JSON.stringify(input))
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

    aoNumChange2 = (input) => {
        if (input>3 && input<1001){
            console.log(input)
            let offline = JSON.parse(localStorage.getItem("offline"))
            if(!offline){
                fetch("https://blooming-hollows-98248.herokuapp.com/ao2", {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.props.id,
                        aonumber2: input
                    })
                }).then(response=>response.json())
            }
            localStorage.setItem("ao2", JSON.stringify(input))
            this.props.aoNumChange2(input)
            this.setState({
                isInvalidAoNum2: false,
                isAoSubmitted2: true,
            })
        }else{
            this.setState({
                isInvalidAoNum2: true,
                isAoSubmitted2: false,
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

    offline = () => {
        this.props.offline()
        if(document.getElementById("offline").checked===true){
            localStorage.setItem("offline", JSON.stringify(true))
        }
        if(document.getElementById("offline").checked===false){
            localStorage.setItem("offline", JSON.stringify(false))
        }
    }

    getOffline= () => {
        if(localStorage.offline) {
            let x = JSON.parse(localStorage.getItem("offline"))
            document.getElementById("offline").checked=x
        }
    }

    offlineConfirm = () => {
        if(localStorage.offline) {
            let x = JSON.parse(localStorage.getItem("offline"))
            if(x){
                let confirmation = window.confirm("You are now going online. To reconnect, be sure to have a wifi connection.")
                if (confirmation) {
                    if(localStorage.offlinesolves){
                        let online = navigator.onLine;
                        if(online){
                            let solves = localStorage.getItem("offlinesolves")
                            fetch("https://blooming-hollows-98248.herokuapp.com/sendonline",{
                            method: "put",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                              id: this.props.id,
                              solves: {"allsolves": JSON.parse(solves).solves},
                              theme: JSON.parse(localStorage.getItem("theme")),
                              aonumber: JSON.parse(localStorage.getItem("ao")),
                              confirmsession: JSON.parse(localStorage.getItem("sessionconfirm")),
                              confirmsolve: JSON.parse(localStorage.getItem("solveconfirm")),
                              inspection: JSON.parse(localStorage.getItem("countDown")),
                              inspectiontime: JSON.parse(localStorage.getItem("inspectionTime")),
                              mobile: JSON.parse(localStorage.getItem("mobile")),
                              disabletimer: JSON.parse(localStorage.getItem("disabletimer")),
                              aonumber2: JSON.parse(localStorage.getItem("ao2")),
                              offline: JSON.parse(localStorage.getItem("offline")),
                            })
                            }).then(response=>response.json())
                            .then(response=> {
                              if(response==="unable to send online"){
                                document.getElementById("offline").checked=x
                                localStorage.setItem("offline", JSON.stringify(x))
                                alert("Unable to conncect to database. Try again.")
                                this.setState({
                                    isSyncUnsuccessful: true,
                                    didOnlineSyncWork: false,
                                    didOfflineSyncWork: false,
                                })
                              }else{
                                fetch("https://blooming-hollows-98248.herokuapp.com/offline", {
                                method: "post",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({
                                    id: this.props.id,
                                    offline: !x,
                                })
                                }).then(response=>response.json())
                                document.getElementById("offline").checked=!x
                                localStorage.setItem("offline", JSON.stringify(!x))
                                localStorage.removeItem("offlinesolves")
                                this.setState({
                                    didOnlineSyncWork: true,
                                    didOfflineSyncWork: false,
                                    isSyncUnsuccessful: false,
                                })
                              }
                            })
                        }else{
                            alert("You are offline. Try again.")
                            document.getElementById("offline").checked=x
                            localStorage.setItem("offline", JSON.stringify(x))
                        }
                    }
                }else{
                    document.getElementById("offline").checked=x
                    localStorage.setItem("offline", JSON.stringify(x))
                }
            }else{
                let confirmation = window.confirm("You are now entering offline mode. Backing up solves is highly recommended. You must remain signed in. Solve data will no longer be updated to the data base. To reconnect, be sure to have a wifi connection before turning off offline mode.")
                if (confirmation) {
                    fetch("https://blooming-hollows-98248.herokuapp.com/offline", {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.props.id,
                        offline: !x,
                    })
                    }).then(response=>response.json())
                    this.setState({
                        didOfflineSyncWork: true,
                        didOnlineSyncWork: false,
                        isSyncUnsuccessful: false,
                    })
                    document.getElementById("offline").checked=!x
                    localStorage.setItem("offline", JSON.stringify(!x))
                    localStorage.setItem("offlinesolves", JSON.stringify({"solves": [...this.props.solvesApp]}))
                }else{
                    document.getElementById("offline").checked=x
                    localStorage.setItem("offline", JSON.stringify(x))
                }
            }
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
        this.getOffline()
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
                {this.props.isBackgroundLight 
                ? <h1 className="center"><button style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" onClick={this.props.themeToDB}>Dark</button></h1> 
                : <h1 className="center"><button style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" onClick={this.props.themeToDB}>Light</button></h1>
                }

                <h1 className="center"><button onClick={this.props.signout} className="button2" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Sign Out</button></h1>
                <h1 className="center" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Preferences</h1>

                <InspectionTime 
                isBackgroundLight={this.props.isBackgroundLight}
                inspectionTime={this.props.inspectionTime}
                inspectionTimeToState={this.inspectionTimeToState}
                changeInspectionTime={this.changeInspectionTime}
                inspectionTimeFromState={this.state.inspectionTime}
                isInspectionSubmitted={this.state.isInspectionSubmitted}
                isInvalidInspection={this.state.isInvalidInspection}
                />

                <ChangeAO1 
                isBackgroundLight={this.props.isBackgroundLight}
                aoNum={this.props.aoNum}
                aoNumInput={this.aoNumInput}
                aoNumChange={this.aoNumChange}
                aoNumState={this.state.aoNum}
                isAoSubmitted={this.state.isAoSubmitted}
                isInvalidAoNum={this.state.isInvalidAoNum}
                />

                <ChangeAO2 
                isBackgroundLight={this.props.isBackgroundLight}
                aoNum2={this.props.aoNum2}
                aoNumInput2={this.aoNumInput2}
                aoNumChange2={this.aoNumChange2}
                aoNumState2={this.state.aoNum2}
                isAoSubmitted2={this.state.isAoSubmitted2}
                isInvalidAoNum2={this.state.isInvalidAoNum2}
                />

                <Toggles 
                isMobile={this.isMobile}
                isConfirmSolve={this.isConfirmSolve}
                isConfirmSession={this.isConfirmSession}
                isDisableTimer={this.isDisableTimer}
                offlineConfirm={this.offlineConfirm}
                didOnlineSyncWork={this.state.didOnlineSyncWork}
                isSyncUnsuccessful={this.state.isSyncUnsuccessful}
                didOfflineSyncWork={this.state.didOfflineSyncWork}
                />
                
                <hr></hr>
                <h1 className="center" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Export Solves</h1>

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

                <h1 className="center" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>Import Solves</h1>
                {/* {this.state.isManual ? 
                <div>
                    <h4>Time (H:M:S.MS):</h4>
                    <input id="importManualTime" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.handleImportManualTimeChange} type="text"></input>

                    <h4>Scramble:</h4>
                    <input id="importManualScramble" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.handleImportManualScrambleChange} type="text"></input>
                    <h4>
                        Date (YYYY-MM-DD): 
                    </h4>
                    <h4>
                        *Use of charts requires date
                    </h4>
                    <input id="importManualDate" rows="1" cols="10" style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className={this.props.isBackgroundLight ? "pa2 ba b--green bg-white form-input": "pa2 ba b--green bg-black form-input"} onChange={this.handleImportManualDateChange} type="text"></input>
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
                } */}
                <ImportManual 
                getPuzzleType={this.getPuzzleType}
                handleImportManualNameChange={this.handleImportManualNameChange}
                handleImportManualDateChange={this.handleImportManualDateChange}
                handleImportManualScrambleChange={this.handleImportManualScrambleChange}
                handleImportManualTimeChange={this.handleImportManualTimeChange}
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
                    
                <ImportSolves 
                handleButtonClick={this.props.handleButtonClick}
                handleImportSolvesChange={this.handleImportSolvesChange}
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
                
                
                <br></br>
                <hr></hr>
                <br></br>
                <ChangeUsername 
                isBackgroundLight={this.props.isBackgroundLight}
                username={this.props.username}
                usernameExists={this.props.usernameExists}
                isUsernameChanged={this.props.isUsernameChanged}
                changeUsername={this.props.changeUsername}
                />

                <ChangePassword 
                isBackgroundLight={this.props.isBackgroundLight}
                oldPassword={this.props.oldPassword}
                newPassword={this.props.newPassword}
                newPasswordReenter={this.props.newPasswordReenter}
                isPasswordChanged={this.props.isPasswordChanged}
                isWrongPassword={this.props.isWrongPassword}
                isPasswordMatch={this.props.isPasswordMatch}
                changePassword={this.props.changePassword}
                />
                
                <DeleteAccount 
                isBackgroundLight={this.props.isBackgroundLight}
                deleteAccountPassword={this.props.deleteAccountPassword}
                isWrongPassword2={this.props.isWrongPassword2}
                deleteAccountConfirm={this.deleteAccountConfirm}
                />
                <br></br>
                <br></br>
            </div>
        )
    }
}

export default Settings