import React from "react"

const Average = (props) => {
    var totalMS = 0
    var divisor = 0
    var avgMS = 0
    var average = "0.000"
    if (props.solves.length > 0) {
        const avg = props.solves.map((solve, index)=>{
            totalMS += solve.milliseconds
            divisor += 1
            return(null)
        })
        if (divisor > 0){
            avgMS = (totalMS/divisor)
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
                <div>
                    Average: {average}
                </div>
            )
        } if (divisor===-1){
            return({avg})
        } 
    } else{
        return(null)
    }
}

const TableRows = (props) => {
    if (props.solves.length > 0) {
        const rows = props.solves.map((row, index) =>{
            return (
            <tr key={index}>
                <td>
                    {index + 1 + "."}
                </td>
                <td>
                    {row.solve}
                </td>
                <td>
                    {row.scramble}
                </td>
            </tr>
            )
        })
        return(
            <tbody>
                {rows}
            </tbody>
        )
    } else {
        return(null)
    }
}

const Table = (props) => {
    return(
        <div>
            <table>
                <TableRows solves={props.solves}/>
            </table>
            <Average solves={props.solves}/>
        </div>
    )
}

export default Table