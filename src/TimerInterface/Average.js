import React from "react";

const Average = (props) => {
    var totalMS = 0
    var divisor = 0
    var avgMS = 0
    var average = "0.000"
    const avg = props.solves.map(solve=>{
        if (solve.isdnf){
            // dnfDivisor ++
        }
        if (solve.isplustwo && !solve.isdnf){
            totalMS += Number(solve.millisecondstwo)
            divisor += 1
        }else if(solve.isdnf){
            totalMS += 0
        }else{
            totalMS += Number(solve.milliseconds)
            divisor += 1
        }
        return(null)
    })
    if (divisor > 0){
        if (divisor !== 0){
            avgMS = (totalMS/divisor)
        }
        var hours = Math.floor((avgMS / 3600000))
        var minutes = Math.floor((avgMS / 60000)%60)
        var seconds = Math.floor((avgMS / 1000)%60)
        var milliseconds = Math.round(avgMS % 1000)
        average = ""
        if (avgMS > 3600000){
            average += hours +":"
        }
        if (avgMS > 60000){
            average += minutes +":"
            if (seconds<10){
                average += 0
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
    if (divisor >= 0){
        return(
            <div id="average"><h2>
                Average: {average}
            </h2></div>
        )
    } 
    if (divisor === 0){
        return(
            <div id="average"><h2>
                Average: 0.000
            </h2></div>
        )
    }
    if (divisor===-1){
        return({avg})
    } 
}


export default Average