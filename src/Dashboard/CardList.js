import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
    compare = (a,b) => {
        return b - a
    } 

    average = (solve, ao) => {
        let timesMS = []
        let divisor = 0
        let dnfCount = 0
        let totalMS = 0
        let finalAverage = ""
        let solves = [...solve].reverse()
        for(let i = 0; i<ao; i++){
            divisor++
            if(solves[i].isplustwo){
                timesMS.push(Number(solves[i].millisecondstwo))
            }else if (solves[i].isdnf) {
                dnfCount++
            }else{
                timesMS.push(Number(solves[i].milliseconds))
            }
        }
        timesMS.sort(this.compare)
        if(dnfCount===0){
            timesMS.pop()
        }
        timesMS.shift()
        for (const milliseconds of timesMS){
            totalMS += Number(milliseconds)
        }
        let averageMS = totalMS / (divisor-2)
        if(dnfCount>1){
            finalAverage+="DNF"
        }else{
            let hours = Math.floor((averageMS / 3600000))
            let minutes = Math.floor((averageMS / 60000)%60)
            let seconds = Math.floor((averageMS / 1000)%60)
            let milliseconds = Math.round(averageMS % 1000)
            finalAverage = ""
            if (hours > 0){
                finalAverage += hours +":"
            }
            if (minutes > 0){
                finalAverage += minutes +":"
                if(seconds<10){
                    finalAverage+="0"
                }
            }
            finalAverage += seconds + "."
            if (milliseconds < 10){
                finalAverage += "00"
            }
            if (milliseconds < 100){
                if (milliseconds > 9){
                    finalAverage += "0"
                }
            }
            finalAverage += milliseconds
        }
        return finalAverage
    }



    bestWorstAverage = (solve, ao) => {
        let finalAverages = []
        let solves = [...solve].reverse()
        let loopNumber = solves.length - (ao-1)
        let averagesMS = []
        while(loopNumber>0){
            let divisor = 0
            let totalMS = 0
            let solvesArray = []
            let averageMS = 0 
            let dnfCount = 0
            for (let i = 0; i < ao; i++){
                divisor++
                if(solves[i].isplustwo){
                    solvesArray.push(Number(solves[i].millisecondstwo))
                }else if (solves[i].isdnf) {
                    dnfCount++
                }else{
                    solvesArray.push(Number(solves[i].milliseconds))
                }
            }
            solvesArray.sort(this.compare)
            if(dnfCount===0){
                solvesArray.pop()
            }
            solvesArray.shift()
            for (const milliseconds of solvesArray){
                totalMS += Number(milliseconds)
            }
            loopNumber--
            averageMS = totalMS / (divisor-2)
            if(dnfCount<2){
                averagesMS.push(averageMS)
            }
            solves.shift()  
            // finalAverages.push(finalAverage)
        }
        let bestAndWorst = []
        bestAndWorst.push(Math.max(...averagesMS))
        bestAndWorst.push(Math.min(...averagesMS))
        for (let i = 0; i<2; i++){
            let finalAverage = ""
            let hours = Math.floor((bestAndWorst[i] / 3600000))
            let minutes = Math.floor((bestAndWorst[i] / 60000)%60)
            let seconds = Math.floor((bestAndWorst[i] / 1000)%60)
            let milliseconds = Math.round(bestAndWorst[i] % 1000)
            finalAverage = ""
            if (hours > 0){
                finalAverage += hours +":"
            }
            if (minutes > 0){
                finalAverage += minutes +":"
                if(seconds<10){
                    finalAverage+="0"
                }
            }
            finalAverage += seconds + "."
            if (milliseconds < 10){
                finalAverage += "00"
            }
            if (milliseconds < 100){
                if (milliseconds > 9){
                    finalAverage += "0"
                }
            }
            finalAverage += milliseconds
            finalAverages.push(finalAverage)
        }
        return finalAverages
    }
 
    render() {
        let sessionDisplayName = (this.props.solvesSorted.length+1)
        console.log(sessionDisplayName)
        return(
            <div>
                {
                this.props.solvesSorted.map((solve,i)=>{
                    this.bestWorstAverage(solve, 5)
                    let ao5 
                    let ao12
                    let ao25
                    let ao50
                    let ao100
                    let ao200
                    let ao500
                    let ao1000
                    let ao5000
                    let ao10000
                    let ao5BestAndWorst
                    let ao12BestAndWorst
                    let ao25BestAndWorst
                    let ao50BestAndWorst
                    let ao100BestAndWorst
                    let ao200BestAndWorst
                    let ao500BestAndWorst
                    let ao1000BestAndWorst
                    let ao5000BestAndWorst
                    let ao10000BestAndWorst 
                    if(solve.length>4){
                        ao5 = this.average(solve, 5)
                        ao5BestAndWorst = this.bestWorstAverage(solve,5)
                    }
                    if(solve.length>11){
                        ao12 = this.average(solve, 12)
                        ao12BestAndWorst = this.bestWorstAverage(solve,12)
                    }
                    if(solve.length>24){
                        ao25 = this.average(solve, 25)
                        ao25BestAndWorst = this.bestWorstAverage(solve,25)
                    }
                    if(solve.length>49){
                        ao50 = this.average(solve, 50)
                        ao50BestAndWorst = this.bestWorstAverage(solve,50)
                    }
                    if(solve.length>99){
                        ao100 = this.average(solve, 100)
                        ao100BestAndWorst = this.bestWorstAverage(solve,100)
                    }
                    if(solve.length>199){
                        ao200 = this.average(solve, 200)
                        ao200BestAndWorst = this.bestWorstAverage(solve,200)
                    }
                    if(solve.length>499){
                        ao500 = this.average(solve, 500)
                        ao500BestAndWorst = this.bestWorstAverage(solve,500)
                    }
                    if(solve.length>999){
                        ao1000 = this.average(solve, 1000)
                        ao1000BestAndWorst = this.bestWorstAverage(solve,1000)
                    }
                    if(solve.length>4999){
                        ao5000 = this.average(solve, 5000)
                        ao5000BestAndWorst = this.bestWorstAverage(solve,5000)
                    }
                    if(solve.length>9999){
                        ao10000 = this.average(solve, 10000)
                        ao10000BestAndWorst = this.bestWorstAverage(solve,10000)
                    }
                    // console.log(sessionDisplayName-2)
                    // let puzzleBest = [...this.props.puzzleBest].reverse()[sessionDisplayName-2]
                    // let puzzleBest = this.props.puzzleBest[i]
                    // console.log(this.props.puzzleBest)
                    // let puzzleWorst = this.props.puzzleWorst[i]
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
                    let isSessionName=false
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
                                    <h4 className="megaminx megaminxSmallCardListScramble min-width">
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
                        loadPastSessionSolveData={this.props.loadPastSessionSolveData}
                        removeFromSolvesInterface={this.props.removeFromSolvesInterface}
                        send={this.props.send}
                        ao5BestAndWorst={ao5BestAndWorst}
                        ao12BestAndWorst={ao12BestAndWorst}
                        ao25BestAndWorst={ao25BestAndWorst}
                        ao50BestAndWorst={ao50BestAndWorst}
                        ao100BestAndWorst={ao100BestAndWorst}
                        ao200BestAndWorst={ao200BestAndWorst}
                        ao500BestAndWorst={ao500BestAndWorst}
                        ao1000BestAndWorst={ao1000BestAndWorst}
                        ao5000BestAndWorst={ao5000BestAndWorst}
                        ao10000BestAndWorst ={ao10000BestAndWorst}
                        ao5={ao5}
                        ao12={ao12}
                        ao25={ao25}
                        ao50={ao50}
                        ao100={ao100}
                        ao200={ao200}
                        ao500={ao500}
                        ao1000={ao1000}
                        ao5000={ao5000}
                        ao10000={ao10000}
                        puzzleBest={[...this.props.puzzleBest].reverse()}
                        puzzleWorst={[...this.props.puzzleWorst].reverse()}
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
                        date={date}
                        sessionDisplayName={sessionDisplayName}
                        removeSessionFromState={this.props.removeSessionFromState}
                        average={average}
                        isBackgroundLight={this.props.isBackgroundLight}
                        key={i}
                        session={session} 
                        row={row} 
                        id={this.props.id}
                        solves={this.props.solves}
                        />
                    );
                }) 
                }
            </div>
        );
    }
}



export default CardList;


