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

const Body = (props) => {
    var solveNumber = props.solves.length 
    const rows = props.solves.sort(compare).map((row, index) => {
        let isMegaminx = false
        let isMultiBLD = false
        let isRegular = false
        if (row.scramble){
            if (row.scramble.includes("--")||row.scramble.includes("++")){
                isMegaminx=true
            }else if (row.puzzle==="Multi-BLD"){
                isMultiBLD=true
            }else{
                isRegular=true
            }
        }
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
                    className="button2 remove" onClick={()=>props.removeTime(index, row.solveid, row.ms)}>Remove</button>
                </h2></td>
                {isRegular ? 
                <td className="small-scramble display-linebreak"><h2 className="mobileNoScramble">{row.scramble}</h2></td>
                :
                <td className="small-scramble display-linebreak"><h4> </h4></td>
                }
                {isMegaminx ? 
                // <div id="test">
                    <td className="small-scramble display-linebreak min-width2"><h4 className="megaminx megaminxSmall">{row.scramble + "\n"}</h4></td>
                // </div>
                :
                <td className="small-scramble display-linebreak"><h2> </h2></td>
                }
                {isMultiBLD ? 
                <td className="small-scramble display-linebreak"><h4 className="mobileNoScramble">{row.scramble + "\n"}</h4></td>
                :
                <td className="small-scramble display-linebreak mobileNoScramble"><h2> </h2></td>
                }
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
            </tr>
        )
    })
    return <tbody>{rows}</tbody>

}

const Table = props => {
        const {solves, removeTime, plusTwo} = props
        return(
            <table id="hello">
                <Body 
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