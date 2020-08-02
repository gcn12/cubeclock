import React, { Component } from "react";




class Card extends Component {
    deleteSession=()=>{
        this.props.removeSessionFromState(this.props.session)
        let solvesToDB = this.props.solves.filter(sessions=>{
            return sessions.session!==this.props.uniqueSession
        })
        this.props.send(solvesToDB)
        let offline = JSON.parse(localStorage.getItem("offline"))
        if(offline){
            localStorage.setItem("offlinesolves", JSON.stringify({"solves": [...solvesToDB]}))
        }
        this.props.removeFromSolvesInterface(this.props.uniqueSession)
        this.props.removeFromSolves(this.props.uniqueSession)
        let x = this.props.uniqueSessionsDB
        x.splice(x.indexOf(this.props.uniqueSession), 1)
        if (x.length===0){
            this.props.getSessionNumber(1)
            this.props.getInterfaceSession(1)
            this.props.getSessionNameOnLoad(null, "3x3")
        }else if (this.props.uniqueSession===this.props.sessions) {
            let c = x.length 
            // this.props.getSessionNumber(Math.max(...x))
            // this.props.getInterfaceSession(c)
            this.props.loadPastSessionSolveDataDeleteSession(Math.max(...x), c)
        } else {
            let a = [...x].sort(this.compare).indexOf(this.props.sessions)
            this.props.getInterfaceSession(a+1)
        }
    }

    deleteSessionWithConfirm = () =>{
        if (this.props.isConfirmSessionDelete){
            let confirm = window.confirm("Are you sure you would like to remove this session? Action cannot be undone.")
            if (confirm) {
                this.deleteSession()
            }
        }else{
            this.deleteSession()
        }
    }

    removeSessionDB = () =>{
        this.props.removeFromUniqueSessionsDB(this.props.uniqueSession) 
    }

    deleteFunc = () => {
        const runDelete = async () => {
            await this.deleteSession()
            await this.removeSessionDB()
            await this.props.getSolves()
        };
        if (this.props.isConfirmSessionDelete){
            let confirm = window.confirm("Are you sure you would like to remove this session? Action cannot be undone.")
            if (confirm) {
                runDelete()
            }
        }else{
            runDelete()
        }
    };

    compare = (a,b) => {
        return a-b
    }

    test = () => {
        console.log(this.props.uniqueSessionsDB)
    }
    
    render() {
        return(
            <div className="summary-center">
                {/* <button onClick={this.test}>Card</button> */}
                <div id="max-width" className={this.props.isBackgroundLight ? " bg-white dib br3 pa3 ma2 bw2 shadow-5" : " bg-black dib br3 pa3 ma2 bw2 shadow-5"}>
                    
                    

                    {this.props.puzzle ? 
                    <h2 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Session: {this.props.sessionDisplayName} | {this.props.puzzle}</h2>
                    :
                    <h2 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Session: {this.props.sessionDisplayName}</h2>

                    }
                    {this.props.isSessionName ? 
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Name: {this.props.sessionname}</h4>
                    :
                    <h4> </h4>
                    }
                    {this.props.date ? 
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Date: {this.props.date}</h4>
                    :
                    <h4> </h4>
                    }
                    <h4 className="display-linebreak" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>{this.props.row}</h4>
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Average: {this.props.average}</h4>
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Best single: {this.props.puzzleBest}</h4>
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Worst single: {this.props.puzzleWorst}</h4>
                    <div className="tc">
                    {
                        this.props.ao5 ? 
                    <table className="summary-center">
                        <thead>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <h4>Current:</h4>
                                </td>
                                <td>
                                    <h4>Best:</h4>
                                </td>
                                <td>
                                    <h4>Worst:</h4>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.mo3 ? 
                        <tr>
                            <td>
                                <h4>
                                mo3
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao5 ? 
                        <tr>
                            <td>
                                <h4>
                                ao5
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao12 ? 
                        <tr>
                            <td>
                                <h4>
                                ao12
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao12}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao12BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao12BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao25 ? 
                        <tr>
                            <td>
                                <h4>
                                ao25
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao25}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao25BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao25BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao50 ? 
                        <tr>
                            <td>
                                <h4>
                                ao50
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao50}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao50BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao50BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao100 ? 
                        <tr>
                            <td>
                                <h4>
                                ao100
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao100}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao100BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao100BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao200 ? 
                        <tr>
                            <td>
                                <h4>
                                ao200
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao200}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao200BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao200BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao500 ? 
                        <tr>
                            <td>
                                <h4>
                                ao500
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao500}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao500BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao500BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao1000 ? 
                        <tr>
                            <td>
                                <h4>
                                ao1000
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao1000}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao1000BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao1000BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao5000 ? 
                        <tr>
                            <td>
                                <h4>
                                ao5000
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5000}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5000BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao5000BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        {this.props.ao10000 ? 
                        <tr>
                            <td>
                                <h4>
                                ao10000
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao10000}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao10000BestAndWorst[1]}
                                </h4>
                            </td>
                            <td>
                                <h4>
                                {this.props.ao10000BestAndWorst[0]}
                                </h4>
                            </td>
                        </tr>
                        :
                        <tr></tr>
                        }
                        </tbody>
                    </table>
                        :
                        <table></table>
                        }
                        <h1><button className="button2" onClick={()=>this.props.loadPastSessionSolveData(this.props.uniqueSession, this.props.ind)} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "white" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Resume Session</button></h1>
                        <button className="button2" onClick={this.deleteFunc} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "white" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Delete Session</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;