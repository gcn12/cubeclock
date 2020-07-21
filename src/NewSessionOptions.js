import React, { Component } from "react"

class NewSessionOptions extends Component{
    state = {
        sessionName: null,
    }

    newSession = () => {
        const x = document.getElementById("puzzle")
        const y = x.options[x.selectedIndex].value
        const newSession = Math.max(...this.props.uniqueSessionsDB)
        const sessionLength = this.props.uniqueSessionsDB.length
        if (y.length>0){
            this.props.createNewSession(y)
        } 
        this.props.sessionNameOnChange(this.state.sessionName)
        this.props.isSessionName(this.state.sessionName)
        if(this.props.solves.length===0){
            this.props.getInterfaceSession(sessionLength)
        }else{
            if (this.props.isNewSession){
                this.props.getInterfaceSession(sessionLength)
            }else{
                this.props.getSessionNumber(newSession+1)
                this.props.addToUniqueSessionsDB(newSession+1)
                this.props.getInterfaceSession(sessionLength + 1)
            }
        }

        this.props.isNewSessionFunction(true)
    }
    
    sessionOnChange = (event) =>{
        this.setState({
            sessionName: event.target.value
        })
    }

    render() {
        return(
            <div className="absolute-center tc">
                <h2 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}} >Puzzle:</h2>
                {this.props.isBackgroundLight ? 
                <select style={{color: "rgb(23, 23, 23)"}} className="pa1 ba b--green bg-white" id="puzzle" >
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
                <select style={{color: "white"}} className="pa1 ba b--green bg-black" id="puzzle" >
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
                <h2 style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}} >Session name (optional):</h2>
                {this.props.isBackgroundLight ? 
                <input style={{color: this.props.isBackgroundLight ? "rgb(25, 25, 25)" : "whitesmoke"}} className="pa1 ba b--green bg-white" onChange={this.sessionOnChange} type="text"></input>
                :
                <input style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}} className="pa1 ba b--green bg-black" onChange={this.sessionOnChange} type="text"></input>
                }
                <h1><button onClick={this.newSession} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Create session</button> </h1>
            </div>
        )
    }
}

export default NewSessionOptions