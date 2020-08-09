import React from "react" 



const compare = (a, b) => {
    if (a.solveid > b.solveid){
        return -1
    }
    if (a.solveid < b.solveid){
        return 1
    }
    return 0
}

const compare2 = (a,b) => {
    return a-b
}




const Body = (props) => {
    let id 
    if (props.id.length){
        id=true
    }else{
        id=false
    }
    let finalAverages = []
    let solves = [...props.solves].sort(compare)
    let loopNumber = props.solves.length - (props.aoNum-1)
    while(loopNumber>0){
        let divisor = 0
        let totalMS = 0
        let solvesArray = []
        let averageMS = 0
        let dnfCount = 0
        for (let i = 0; i < props.aoNum; i++){
            divisor++
            if(solves[i].isplustwo){
                solvesArray.push(Number(solves[i].millisecondstwo))
            }else if (solves[i].isdnf) {
                dnfCount++
            }else{
                solvesArray.push(Number(solves[i].milliseconds))
            }
        }
        solvesArray.sort(compare2)
        if(dnfCount===0){
            solvesArray.pop()
        }
        solvesArray.shift()
        for (const milliseconds of solvesArray){
            totalMS += Number(milliseconds)
        }
        loopNumber--
        averageMS = totalMS / (divisor-2)
        solves.shift()  
        let finalAverage = ""
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
        finalAverages.push(finalAverage)
    }



    let finalAverages2 = []
    let solves2 = [...props.solves].sort(compare)
    let loopNumber2 = props.solves.length - (props.aoNum2-1)
    while(loopNumber2>0){
        let divisor = 0
        let totalMS = 0
        let solvesArray = []
        let averageMS = 0
        let dnfCount = 0
        for (let i = 0; i < props.aoNum2; i++){
            divisor++
            if(solves2[i].isplustwo){
                solvesArray.push(Number(solves2[i].millisecondstwo))
            }else if (solves2[i].isdnf) {
                dnfCount++
            }else{
                solvesArray.push(Number(solves2[i].milliseconds))
            }
        }
        solvesArray.sort(compare2)
        if(dnfCount===0){
            solvesArray.pop()
        }
        solvesArray.shift()
        for (const milliseconds of solvesArray){
            totalMS += Number(milliseconds)
        }
        loopNumber2--
        averageMS = totalMS / (divisor-2)
        solves2.shift()  
        let finalAverage = ""
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
        
        finalAverages2.push(finalAverage)
    }
    
    
    let solveNumber = props.solves.length 
    const rows = props.solves.sort(compare).map((row, index) => {
        solveNumber --
        return (
            <tr key={index}>
                <td className="tableIndex"><h2>{solveNumber+1 +  "."}</h2></td>
                {row.isplustwo 
                ? 
                <td><h2>{row.plustwo}</h2></td>
                :
                <td><h2>{row.solve}</h2></td>
                }
                <td><h2>
                    <button style={{color: props.styles ? "rgb(23, 23, 23)" : "whitesmoke", 
                    backgroundColor: props.styles ? "whitesmoke" : "rgb(23, 23, 23)", 
                    borderColor: props.styles ?  "rgb(23, 23, 23)" : "whitesmoke"}} 
                    className="button2 remove" onClick={row.isplustwo ? ()=>props.removeTime(index, row.solveid, row.milliseconds, row.plustwo, (props.solves.length - index) +  ".") : ()=>props.removeTime(index, row.solveid, row.milliseconds, row.solve, (props.solves.length - index) +  ".")}>Remove</button>
                
                </h2></td>
                <td><h2>
                    <button type="button" style={{color: 
                    props.styles 
                        ? 
                        (row.isplustwo ? "whitesmoke":"rgb(23, 23, 23)" )
                        : 
                        (row.isplustwo ?"rgb(23, 23, 23)":"whitesmoke" ), 
                    backgroundColor: props.styles 
                        ? 
                        (row.isplustwo ? "rgb(23, 23, 23)" : "whitesmoke")
                        : 
                        (row.isplustwo ? "whitesmoke" : "rgb(23, 23, 23)"), 
                    borderColor: props.styles 
                        ? 
                        (row.isplustwo ? "whitesmoke": "rgb(23, 23, 23)" )
                        : 
                        (row.isplustwo ?"rgb(23, 23, 23)":"whitesmoke") }} 
                    className="button2 remove2" onClick={()=>props.togglePlusTwo(row.solveid)}>+2</button>
                </h2></td>

                <td><h2>
                <button style={{color: props.styles 
                        ? 
                        (row.isdnf ? "whitesmoke":"rgb(23, 23, 23)" )
                        : 
                        (row.isdnf ? "rgb(23, 23, 23)":"whitesmoke" ), 
                    backgroundColor: props.styles 
                        ? 
                        (row.isdnf ? "rgb(23, 23, 23)" : "whitesmoke")
                        : 
                        (row.isdnf ? "whitesmoke"  : "rgb(23, 23, 23)"), 
                    borderColor: props.styles 
                        ? 
                        (row.isdnf ? "whitesmoke" : "rgb(23, 23, 23)" )
                        : 
                        (row.isdnf ? "rgb(23, 23, 23)": "whitesmoke" ) }}  
                    className="button2 remove3" onClick={()=>props.toggleDNFInterface(row.solveid)}>DNF</button>
                </h2></td>

                {id ? 
                <td><h2>
                    {finalAverages[index]}
                </h2></td>
                :
                <td> </td>
                }
                {id ? 
                <td><h2>
                    {finalAverages2[index]}
                </h2></td>
                :
                <td> </td>
                }
            </tr>
        )
    })


    // console.log(props.solvesApp)
    // if(props.solvesApp){
    //     if(props.solvesApp==="loading..."){
    //         return <h1><tbody>Loading...</tbody></h1>
    //     }else{
    //         return <tbody>{rows}</tbody>
    //     }
    // }

    return <tbody>{rows}</tbody>

}

const Table = props => {
    const {solves, removeTime, plusTwo} = props
    return(
    props.solvesApp==="loading..." ? 
    <h1 className="light">Loading...</h1>
    :
        <table id="hello" className="light">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    {props.id.length>2 ? 
                    (
                    props.solves.length > props.aoNum-1 ? 
                    <th>
                        <h2>ao{props.aoNum}</h2>
                    </th>
                    :
                    <th></th>
                    )
                    :
                    <th></th>
                    }
                    {props.id.length ? 
                    (
                    props.solves.length>props.aoNum2-1 ? 
                    <th>
                        <h2>ao{props.aoNum2}</h2>
                    </th>
                    :
                    <th></th>
                    )
                    :
                    <th></th>
                    }
                    </tr>
            </thead>
            <Body 
            solvesApp={props.solvesApp}
            id={props.id}
            aoNum={props.aoNum}
            aoNum2={props.aoNum2}
            toggleDNFInterface={props.toggleDNFInterface}
            togglePlusTwo={props.togglePlusTwo}
            plusTwo={plusTwo} 
            solves={solves} 
            removeTime={removeTime} 
            styles={props.styles}
            />
        </table>
    )
}


export default Table