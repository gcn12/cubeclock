import React from "react"

function compare(a,b) {
    return a-b
}

const AverageFive = props => {
    const { solves } = props
    var numSolves = solves.length
    var divisor = solves.length
    var solvesArray = []
    var totalMS = 0
    var average = ""
    if (solves.length > 4) {
        numSolves = 5
    }
    if (solves.length > 4) {
        divisor = 3
    }
    while (numSolves > 0) {
        numSolves--
        solvesArray.push(solves[numSolves].ms)
    }
    const sortedArray = solvesArray.sort(compare)
    if (solves.length>4){
        sortedArray.splice(0,1)
        sortedArray.splice(3,1)
    }
    const avg = solvesArray.map((solve) => {
        if (solve.isplustwo){
            totalMS += Number(solve.millisecondstwo)
        }else{
            totalMS += Number(solve.ms)
        }
        return(null)  
    })
    if(divisor > 0){
        totalMS = totalMS/divisor
    }
    if(1===4) {
        return(avg)
    }
    var hours = Math.floor((totalMS / 3600000))
    var minutes = Math.floor((totalMS / 60000)%60)
    var seconds = Math.floor((totalMS / 1000)%60)
    var milliseconds = Math.round(totalMS % 1000)
    if (totalMS > 3600000){
        average += hours +":"
    }
    if (totalMS > 60000){
        average += minutes +":"
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

    return(
    <div id="average">
        <h2>
            ao5: {average}
        </h2>
    </div>
    )
}

export default AverageFive