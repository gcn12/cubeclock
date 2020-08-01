import React, { Component } from "react"

class DownloadSolves extends Component{

    state = {
        solves: [],
        formattedSolves: [],
        finalOutput: {}
    }
    
    download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    getSolvesFromDashboard = () => {
        let solves = [...this.props.solves].reverse()
        this.setState({
            solves: solves
        })
        this.formattedSolves()
    }

    formattedSolves = () => {
        // let properties = {}
        var masterObject = {}
        let sessionData = {}
        this.state.solves.map((solves, index) => {
            let puzzleType = (solves[0].puzzle)
            let puzzle = ""
            if (puzzleType === "3x3"){
                puzzle = ""
            }
            if (puzzleType === "megaminx"){
                puzzle = "mgmp"
            }
            if (puzzleType === "7x7"){
                puzzle = "777wca"
            }
            if (puzzleType === "2x2"){
                puzzle = "222so"
            }
            if (puzzleType === "4x4 BLD"){
                puzzle = "444bld"
            }
            if (puzzleType === "5x5 BLD"){
                puzzle = "555bld"
            }
            if (puzzleType === "Square-1"){
                puzzle = "sqrs"
            }
            if (puzzleType === "skewb"){
                puzzle = "skbso"
            }
            if (puzzleType === "pyraminx"){
                puzzle = "pyrso"
            }
            if (puzzleType === "Clock"){
                puzzle = "clkwca"
            }
            if (puzzleType === "3x3 OH"){
                puzzle = "333oh"
            }
            if (puzzleType === "3x3 BLD"){
                puzzle = "333ni"
            }
            if (puzzleType === "6x6"){
                puzzle = "666wca"
            }
            if (puzzleType === "5x5"){
                puzzle = "555wca"
            }
            if (puzzleType === "4x4"){
                puzzle = "444wca"
            }
            var session = []
            let i = index + 1
            let objTest = {
                "name": i,
                "opt": {
                    "scrType": puzzle
                },
                "rank": i,
                "stat": [1,0,890],
                "date": [1594487042,1594487046],
            } 
            sessionData[i] = objTest 


            // let opt = {}
            // let newOb = {}
            // let name = {}
            // sessionData["name"] = index + 1
            // opt["scrType"] = puzzle 
            // sessionData["opt"] = opt
            solves.map(solve => {
                var solveArray = []
                var time = []
                if (solve.isplustwo){
                    time.push(2000, Number(solve.milliseconds))
                }else if (solve.isdnf){
                    time.push(-1, Number(solve.milliseconds))
                }else{
                    time.push(0, Number(solve.milliseconds))
                }
                solveArray.push(time)
                solveArray.push(solve.scramble)
                solveArray.push("")
                solveArray.push(solve.unix)
                solveArray.push(solve.sessionname)
                solveArray.push(solve.puzzle)
                session.push(solveArray)
                return(null)
            }) 
            masterObject["session" + (index +1)] = session
            return(null)
        })
        
        // properties["sessionData"] = sessionData
        // masterObject["properties"] = properties
        this.setState({
            finalOutput: JSON.stringify(masterObject)
        })
    }
    

    componentDidMount() {
        // this.props.getSolves()
        setTimeout(()=>this.getSolvesFromDashboard(), 500)
    }
        
    render() {
        return(
            <div className="center">
                <div>
                <h1><button onClick={()=>this.download("solves", this.state.finalOutput)} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Export Solves</button></h1> 
                </div>
                
            </div>
        )
    }
}

export default DownloadSolves