import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
    compare = (a,b) => {
        return b - a
    } 

    render() {
        let sessionDisplayName = (this.props.solvesSorted.length+1)
        return(
            <div>
                {
                this.props.solvesSorted.map((solve,i)=>{
                    let session = -1
                    let date = ""
                    let rawDate2 = ""
                    let rawDate3 = ""
                    let rawDate4 = ""
                    session++
                    sessionDisplayName--
                    let totalMS = 0
                    let divisor = 0
                    let avgMS = 0
                    let average = "0.000"
                    let uniqueSessions = ""
                    let ind = this.props.solvesSorted.length-i
                    let sessionname = ""
                    let isSessionName=""
                    let puzzle = ""
                    let solveNumber = 0
                    let solveid = []
                    const row = solve.map((solve2, index)=>{
                    uniqueSessions = solve2.session
                    if (Object.keys(this.props.interfaceSession).length>0){
                        if (solve2.session in this.props.interfaceSession){
                            sessionDisplayName = this.props.interfaceSession[solve2.session]
                            ind=this.props.interfaceSession[solve2.session]
                        }
                    }
                    solveid = [...solveid, solve2.solveid]
                    solveNumber = solve2.solvenumber
                    if (index===0){
                        if (solve2.sessionname){
                            sessionname = solve2.sessionname
                            isSessionName = true
                        }else{
                            isSessionName=false
                        }
                        puzzle = solve2.puzzle
                        date=""
                        if (solve2.date){
                            let rawDate = solve2.date
                            rawDate2 = rawDate.slice(5,7)
                            rawDate3 = rawDate.slice(8,10)
                            rawDate4 = rawDate.slice(0,4)
                            date += rawDate2 + "-"
                            date += rawDate3 + "-"
                            date += rawDate4
                        }  
                    }
                    if (solve2.isdnf){
                    
                    }else if (solve2.isplustwo){
                        totalMS += Number(solve2.millisecondstwo)
                        divisor += 1

                    }else{
                        totalMS += Number(solve2.milliseconds)
                        divisor += 1
                    }
                    if (divisor > 0){
                        avgMS = (totalMS/divisor)
                        let hours = Math.floor((avgMS / 3600000))
                        let minutes = Math.floor((avgMS / 60000)%60)
                        let seconds = Math.floor((avgMS / 1000)%60)
                        let milliseconds = Math.round(avgMS % 1000)
                        average = ""
                        if (hours > 0){
                            average += hours +":"
                        }
                        if (minutes > 0){
                            average += minutes +":"
                            if(seconds<10){
                                average+="0"
                            }
                        }
                        average += seconds + "."
                        if (milliseconds < 10){
                            average += "00"
                        }
                        if (milliseconds < 100){
                            if (milliseconds > 9){
                                average += "0"
                            }
                        }
                        average += milliseconds
                    }
                    return(
                    <table key={index}>
                        <tbody>
                            <tr>
                                <td>
                                    {index+1}.
                                </td>
                                <td>
                                    {solve2.isplustwo ?
                                    solve2.plustwo
                                    :
                                    solve2.solve
                                    }
                                </td>
                                {solve2.scramble ? 
                                (solve2.scramble.includes("++")? 
                                <td>
                                    <h4 className="megaminx min-width">
                                    {solve2.scramble}
                                    </h4>
                                </td>
                                :
                                <td>
                                    <h4>
                                    {solve2.scramble}
                                    </h4>
                                </td>
                                )
                                :
                                <td></td>
                                }
                                <td>
                                    {solve2.isdnf ?
                                    "(DNF)"
                                    :
                                    ""
                                    }
                                </td>
                                <td>
                                    {solve2.isplustwo ?
                                    "(+2)"
                                    :
                                    ""
                                    }
                                </td>
                            </tr>
                        </tbody> 
                    </table>
                    )
                }) 
                    return(<Card
                        getSessionNameOnLoad={this.props.getSessionNameOnLoad}
                        isConfirmSessionDelete={this.props.isConfirmSessionDelete}
                        isConfirmSolveDelete={this.props.isConfirmSolveDelete}
                        getSolves = {this.props.getSolves}
                        solveNumber={solveNumber}
                        removeFromSolves={this.props.removeFromSolves}
                        puzzle={puzzle}
                        isSessionName={isSessionName}
                        sessionname={sessionname}
                        ind={ind}
                        sessions={this.props.sessions}
                        getSessionNumber={this.props.getSessionNumber}
                        getInterfaceSession={this.props.getInterfaceSession}
                        removeFromUniqueSessionsDB={this.props.removeFromUniqueSessionsDB}
                        uniqueSessionsDB={this.props.uniqueSessionsDB} 
                        uniqueSession={uniqueSessions}
                        loadPastSessionSolveData={this.props.loadPastSessionSolveData}
                        date={date}
                        sessionDisplayName={sessionDisplayName}
                        removeSessionFromState={this.props.removeSessionFromState}
                        average={average}
                        isBackgroundLight={this.props.isBackgroundLight}
                        key={i}
                        session={session} 
                        row={row} 
                        id={this.props.id}
                        />
                    );
                }) 
                }
            </div>
        );
    }
}



export default CardList;


