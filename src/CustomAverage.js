import React from "react"

function compare(a,b) {
    return a-b
}

const CustomAverage = props => {
    const { solves } = props
    var divisor = 0
    var solvesArray = []
    var totalMS = 0
    let dnfCount = 0
    var average = ""
    let allSolves = []
    
    solves.map(solve=>{
        if(solve.isplustwo){
            allSolves = [...allSolves, String(solve.millisecondstwo)]
        }else{
            allSolves = [...allSolves, String(solve.milliseconds)]
        }
        if (solve.isdnf){
            solvesArray = [...solvesArray, "dnf"]
        }else if (solve.isplustwo && (!solve.isdnf)){
            solvesArray = [...solvesArray, String(solve.millisecondstwo)]
            divisor++
        }else{
            solvesArray = [...solvesArray, String(solve.milliseconds)]
            divisor++
        }
        return(null)
    })
    allSolves = allSolves.slice(0,props.aoNum).sort(compare)
    if (solves.length > props.aoNum-1) {
        divisor = props.aoNum-2
    }
    const sortedArray = solvesArray.slice(0,props.aoNum).sort(compare)
    if (sortedArray.includes(String(Math.max(...allSolves)))){
        let newSortedArray = sortedArray.filter(solve=>{
            if (solve === "dnf"){
                dnfCount++
            }
            return(solve !== "dnf")
        })
        if (solves.length>props.aoNum-1){
            newSortedArray.splice(0,1)
            newSortedArray.splice(props.aoNum-2,1)  
        }
        newSortedArray.map((solve) => {
            totalMS += Number(solve)
            return(null)  
        })
        if(divisor > 0){
            totalMS = totalMS/divisor
        }
    }else{
        let newSortedArray = sortedArray.filter(solve=>{
            if (solve === "dnf"){
                dnfCount++
            }
            return(solve !== "dnf")
        })
        if (solves.length>props.aoNum-1){
            newSortedArray.splice(0,1)
            // sortedArray.splice(props.aoNum-2,1)
            
        }
        newSortedArray.map((solve) => {
            totalMS += Number(solve)
            return(null)  
        })
        if(divisor > 0){
            totalMS = totalMS/divisor
        }
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

    if (dnfCount<2){
        return(
        <div id="average">
            <h2>
                ao{props.aoNum}: {average}
            </h2>
        </div>
        )
    }else{
        return(
            <div id="average">
                <h2>
                    ao{props.aoNum}: DNF
                </h2>
            </div>
            )
    }
}

export default CustomAverage