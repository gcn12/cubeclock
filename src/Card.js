import React, { Component } from "react";




class Card extends Component {
    deleteSession=()=>{
        this.props.removeSessionFromState(this.props.session)
        fetch("https://blooming-hollows-98248.herokuapp.com/deletesession", {
            method: "delete",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                session: this.props.uniqueSession,
                id: this.props.id,
            })
        }).then(null)
        this.props.removeFromSolves(this.props.uniqueSession)
        setTimeout(()=>this.props.getSolves(),400)
        let x = this.props.uniqueSessionsDB
            x.splice(x.indexOf(this.props.uniqueSession), 1)
        if (x.length===0){
            this.props.getSessionNumber(1)
            this.props.getInterfaceSession(1)
            this.props.getSessionNameOnLoad(null, "3x3")
        }else if (this.props.uniqueSession===this.props.sessions) {
            let c = x.length 
            this.props.getSessionNumber(Math.max(...x))
            this.props.getInterfaceSession(c)
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
                <div className={this.props.isBackgroundLight ? " bg-white dib br3 pa3 ma2 bw2 shadow-5" : " bg-black dib br3 pa3 ma2 bw2 shadow-5"}>
                    
                    

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
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Best: {this.props.puzzleBest}</h4>
                    <h4 className="tc" style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Worst: {this.props.puzzleWorst}</h4>
                    <div className="tc">
                    {/* <table className="summary-center">
                        <thead>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <h4>
                                Current:
                                    </h4>
                                </td>
                                <td>
                                    <h4>
                                    Best:
                                    </h4>
                                </td>
                                <td>
                                    <h4>
                                    Worst:
                                    </h4>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <h4>
                                Average
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                mo3
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao5
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao12
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao25
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao50
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao100
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao200
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao500
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao1000
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao5000
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>
                                ao10000
                                </h4>
                            </td>
                        </tr>
                        </tbody>
                    </table> */}
                        <h1><button className="button2" onClick={()=>this.props.loadPastSessionSolveData(this.props.uniqueSession, this.props.ind)} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "white" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Resume Session</button></h1>
                        <button className="button2" onClick={this.deleteFunc} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "white" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Delete Session</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;