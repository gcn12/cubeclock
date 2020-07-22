import React, { Component } from "react"



class DownloadSolves extends Component{

    state = {
        solves: [],
        formattedSolves: [],
        finalOutput: []
    }

    export2csv = () => {
        let data = "";
        const tableData = [];
        const rows = this.state.finalOutput
        for (const row of rows) {
            const rowData = [];
            for (const column of row) {
                rowData.push(column);
            }
            tableData.push(rowData.join(","));
        }
        data += tableData.join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
        a.setAttribute("download", "solves.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    getSolvesFromDashboard = () => {
        let sortedSolves = []
        for (const solve of this.props.solves){
            sortedSolves = [solve, ...sortedSolves]
        }
        this.setState({
            solves: sortedSolves
        })
        this.formattedSolves()
    }



    formattedSolves = () => {
        var session = []
        var header = [] 
        header.push("session")
        header.push("session name")
        header.push("solve")
        header.push("time")
        header.push("scramble")
        header.push("date")
        session.push(header)
        this.state.solves.map((solves, index) => {
            var solveArray = []
            solves.map((solve, i) => {
                var solveArray = []
                solveArray.push(index + 1)
                solveArray.push(solve.sessionname)
                solveArray.push(i + 1)
                solveArray.push(solve.solve)
                let scramble = "\""
                scramble+=solve.scramble + "\""
                // solveArray.push(solve.scramble)
                solveArray.push(scramble)
                if (solve.date){
                    var date = solve.date
                    var date2 = date.substring(5,7) + "-" + date.substring(8,10) + "-" + date.substring(0,4)
                }
                solveArray.push(date2)
                session.push(solveArray)
                return(null)
            }) 
            session.push(solveArray)
            return(null)
        })
        this.setState({
            finalOutput: session
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
                {/* <h1><button onClick={()=>this.download("solves", this.state.finalOutput)} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Export CSV</button></h1>  */}
                {/* <h1><button onClick={()=>this.download("hello", this.state.finalOutput )} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Export CSV</button></h1>  */}
                <h1><button onClick={this.export2csv} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2" >Export CSV</button></h1> 
                </div>
                
            </div>
        )
    }
}

export default DownloadSolves