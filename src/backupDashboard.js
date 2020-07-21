// loadPastSessionSolveData = (session) => {
//     //when component mounts, session saved on local storage is displayed
//     if(this.props.id){
//       this.setState({
//         solves: []
//       })
//       fetch("http://localhost:3003/loadpast", {
//         method: "post",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           id: this.props.id,
//           session: session
//         })
//       }).then(response=>response.json())
//       .then(data=>{
//         data.map(solve=>{
//           const solveData = {}
//           solveData["solve"] = solve.solve
//           solveData["scramble"] = solve.scramble
//           solveData["ms"] = solve.milliseconds
//           solveData["isplustwo"] = solve.isplustwo
//           solveData["isdnf"] = solve.isdnf
//           solveData["plustwo"] = solve.plustwo
//           solveData["date"] = solve.date
//           solveData["solveid"] = solve.solveid
//           solveData["session"] = solve.session
//           solveData["sessionname"] = solve.sessionname
//           solveData["unix"] = solve.unix
//           solveData["millisecondstwo"]=Number(solve.milliseconds) + 2000
//           this.setState({
//             solves: [solveData, ...this.state.solves],
//           })
//           this.props.getSessionNameOnLoad(solve.sessionname, solve.puzzle)
//           this.props.isSessionNameFunc(solve.sessionname)
//           return(null)
//         })
//       })
//     }
//   }



// loadPastSessionSolveData = (session, index) => {
//     //resumes session from saved solves list when clicked
//     console.log("working!!!")
//     this.setState({
//       pastSessionSolves: []
//     })
    
//         this.setState({
//           pastSessionSolves: [solveData, ...this.state.pastSessionSolves],
//           isHome: true,
//           isDashboard: false,
//           sessions: session,
//           sessionInterface: index,
//           sessionName: solve.sessionname,
//           puzzleType: solve.puzzle,
//         })
//         this.isSessionName(solve.sessionname)
//         return(null)
//   }


//dashboard
// import React, { Component } from "react"
// import "./Dashboard.css"
// import CardList from "./CardList"
// // import Graph from "./Graph"
// import GraphNumberSolves from "./GraphNumberSolves"
// import Settings from "./Settings"
// import GraphTest from "./GraphTest"

// class Dashboard extends Component{

//     state = {
//         username: "",
//         newPassword: "",
//         oldPassword: "",
//         solves: [],
//         solvesSorted: [],
//         sessions: 0,
//         isAnalytics: true,
//         deleteAccountPassword: "",
//         isWrongPassword: false,
//         isWrongPassword2: false,
//         isUsernameChanged: false,
//         sessionsDBunique: [],
//         datesDBunique: [],
//         dateMillisecondsSorted: [],
//         uniqueDatesQuantity: 0,
//         dateAverages: [],
//         isSolves: true,
//         usernameExists: false,
//         countNumberSolves: [],
//         latestSession: "",
//         categories: [],
//         puzzles: [],
//         categoryDates: [],
//     }


//     removeFromSolves = (input) => {
//         //called when user deletes solve from dashboard 
//         //used so that graphs can update in background 
//         let solves2 = []
//         console.log("input", input)
//         this.state.solves.map(solve=>{
//             if (solve.session!==input){
//                 solves2 = [...solves2, solve]
//             }
//             return(null)
//         })
//         this.setState({
//             dateAverages: [],
//             solves: solves2,
//         })
//     }
    
//     getSolves = () => {
//         this.setState({
//             solves: [],
//             solvesSorted: [],
//             datesDBunique: [],
//             categories: [],
//             puzzles: [],
//             categoryDates: [],
//         })
//         //gets all solves, dates, sessions from database
//         fetch("http://localhost:3003/getsolves", {
//             method: "post",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id
//             })
//         })
//         .then(response=>response.json())
//         //solves
//         .then(data=>{
//             this.setState({
//                 solves: data
//             })
//             //sessions
//             const sessionArray = []
//             this.state.solves.map(solve=> {
//                 sessionArray.push(solve.session)
//                 return(null)
//             })
//             const distinctSessions = [...new Set(sessionArray)]
//             this.setState({
//                 sessions: distinctSessions.length
//             })
//             const allSessions = []
//             data.map(solve=> {
//                 allSessions.push(solve.session)
//                 return(null)
//             })
//             var uniqueSessions = [...new Set(allSessions)]
//             this.setState({
//                 sessionsDBunique: uniqueSessions,
//                 sessionsDBuniqueLength: uniqueSessions.length,
//             })
//             //dates
//             const allDates = []
//             data.map(solves=>{
//                 allDates.push(solves.date)
//                 return(null)
//             })
//             var uniqueDates = [...new Set(allDates)]
//             uniqueDates.sort((a,b)=>{
//                 return a > b
//             })
//             if(this.state.datesDBunique.length===0){
//                 this.setState({
//                     datesDBunique: [uniqueDates, ...this.state.datesDBunique],
//                 })
//             }
//             this.setState({
//                 uniqueDatesQuantity: uniqueDates.length 
//             })
//             this.sortSolves()
//             this.sortDates()
//             this.getCategories()
//             // this.clearDates()
            
//         }) 
//     }

//     clearDates = () => {
//         this.setState({
//             datesDBunique: [],
//         })
//         this.getDates()
//     }

//     getDates = () => {

//         let uniqueDates = []
        
//         this.state.solves.map(solve=>{
//             uniqueDates.push(solve.date)
//             return(null)
//         })
        
//         let uniqueDates2 = new Set(uniqueDates)
//         let uniqueDates3 = Array.from(uniqueDates2)
//         this.setState({
//             datesDBunique: [uniqueDates3, ...this.state.datesDBunique]
//         })
//         // console.log(this.state.datesDBunique)
//         this.sortDates()
//     } 

//     getPuzzles = () => {
//         let puzzles = []
//         this.state.solves.map(solves=>{
//             puzzles = [...puzzles, solves.puzzle]
//             return(null)
//         })
//         puzzles = new Set(puzzles)
//         puzzles = Array.from(puzzles)
//         this.setState({
//             puzzles: puzzles
//         })
//         puzzles.map(puzzle=>{
//             this.setState({
//                 categories: [...this.state.categories, puzzle]
//             })
//             return(null)
//         })
//         setTimeout(()=>this.sortPuzzles(),100)
//     }

//     getCategories = () => {
//         this.setState({

//         })


//         let categories = []
//         this.state.solves.map(solves=>{
//             if (solves.sessionname !== null && solves.sessionname.length>0){
//                 categories=[...categories, solves.sessionname]
//             }
//             return(null)
//         })
//         categories = new Set(categories)
//         categories = Array.from(categories)
//         this.setState({
//             categories: categories
//         })
//         setTimeout(()=>this.sortCategories(),100)
        
//     }

//     sortCategories = () => {
//         this.state.categories.map(category=>{
//             let categoryDates = []
//             let categorySolves = []
//             let solves = []
//             this.state.datesDBunique[0].map(date =>{
//                 let totalMS = 0
//                 let count = 0
//                 this.state.solves.map(solve=>{
//                     if (solve.date===date && solve.sessionname===category){
//                         // solves.push(solve)
//                         totalMS += Number(solve.milliseconds)
//                         count ++
//                         categoryDates.push(date)
//                     }
//                     return(null)
//                 })
//                 let average = Number((totalMS/count/1000).toFixed(3))
//                 if(average>0){
//                     categorySolves.push(average)
//                 }
//                 return(null)
//             })
//             categoryDates = new Set(categoryDates)
//             categoryDates = Array.from(categoryDates)
//             if(solves.length>0){
//                 categorySolves = [...categorySolves, solves]
//             }
//             this.setState({
//                 dateAverages: [...this.state.dateAverages, categorySolves],
//                 datesDBunique: [...this.state.datesDBunique, categoryDates]
//             })
//             return(null)
//         })
//         this.getPuzzles()
//     }

//     sortPuzzles = () => {
//         this.state.puzzles.map(puzzle=>{
//             let puzzleSolves = []
//             let puzzleDates = []
//             // let solves = []
//                 this.state.datesDBunique[0].map(date =>{
//                 let totalMS = 0
//                 let count = 0
//                 this.state.solves.map(solve=>{
//                     if (solve.date===date && solve.puzzle===puzzle){
//                         // solves.push(solve)
//                         totalMS += Number(solve.milliseconds)
//                         count ++
//                         puzzleDates.push(date)
//                     }
//                     return(null)
//                 })
//                 let average = Number((totalMS/count/1000).toFixed(3))
//                 if(average>0){
//                     puzzleSolves.push(average)
//                 }
//                 return(null)
//             })
//             puzzleDates = new Set(puzzleDates)
//             puzzleDates = Array.from(puzzleDates)
//             //may not need
//             // if(solves.length>0){
//             //     puzzleSolves = [...puzzleSolves, solves]
//             // }
//             this.setState({
//                 dateAverages: [...this.state.dateAverages, puzzleSolves],
//                 datesDBunique: [...this.state.datesDBunique, puzzleDates] 
//             })
//             return(null)
//         })
//     }

//     sortSolves = () => {
//         //sorts solves by session
//         while (this.state.sessions > 0){
//             const solves = []
//             this.state.solves.map(solve =>{
//                 if (solve.session === this.state.sessionsDBunique[this.state.sessionsDBuniqueLength-1]){
//                     solves.push(solve)
//                 }
//                 return(null)
//             })
//             this.setState({
//                 solvesSorted: [...this.state.solvesSorted, solves]
//             })
//             this.setState(prevState=>({
//                 sessions: prevState.sessions - 1,
//                 sessionsDBuniqueLength: prevState.sessionsDBuniqueLength - 1,
//             }))
//         }
//     }

//     sortDates = () => {
//         //sorts all solves by date
//         while(this.state.uniqueDatesQuantity > 0) {
//             const masterArray = []
//             this.state.solves.map(solve =>{
//                 //careful here: watch for when datesDBunique is updated
//                 if (solve.date === this.state.datesDBunique[0][this.state.uniqueDatesQuantity-1]){
//                     masterArray.push(solve.milliseconds)
//                 }
//                 return(null)
//             })
//             this.setState({
//                 dateMillisecondsSorted: [masterArray, ...this.state.dateMillisecondsSorted],
//                 countNumberSolves: [masterArray.length, ...this.state.countNumberSolves]
//             })
//             this.setState(prevState=>({
//                 uniqueDatesQuantity: prevState.uniqueDatesQuantity - 1,
//             }))
//         }
//         this.dateAverage()
//     }

//     dateAverage = () => {
//         //gets average of solves by date
//         let finalAverages  = []
//         var allAverages = []
//         this.state.datesDBunique[0].map((date)=>{
//             let solvesArray = []
//             this.state.solves.map(solve=>{
//                 if (solve.date===date){
//                     solvesArray.push(solve.milliseconds)
//                 }
//                 return(null)
//             })
//             allAverages.push(solvesArray)
//             return(null)
//         })
//         allAverages.map(array1 => {
//             var totalMS = 0
//             var divisor = 0
//             array1.map(time => {
//                 totalMS += Number(time)
//                 divisor ++
//                 return(null)
//             })
//             let avg = (totalMS/divisor)/1000
//             finalAverages.push(Number(avg.toFixed(3)))
//             return(null)
//         })

//         this.setState({
//             dateAverages: [finalAverages, ...this.state.dateAverages]
//         })
//     }

//     username = (event) => {
//         this.setState({
//             username: event.target.value
//         })
//     }

//     newPassword = (event) => {
//         this.setState({
//             newPassword: event.target.value
//         })
//     }

//     oldPassword = (event) => {
//         this.setState({
//             oldPassword: event.target.value
//         })
//     }

//     removeSessionFromState = index => {
//         const { solvesSorted } = this.state;
//         this.setState({
//             solvesSorted: solvesSorted.filter((solve, i) => { 
//                 return i !== index;
//             })
//         });
//     }

//     changeUsername = () => {
//         if (this.state.username.length>0){
//             fetch("http://localhost:3003/updateusername", {
//                 method: "put",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({
//                     newUsername: this.state.username,
//                     id: this.props.id
//                 })
//             })
//             .then(response=>response.json())
//             .then(data=>{
//                 if (data === "username exists"){
//                     this.setState({
//                         usernameExists: true, 
//                     })
//                 }else{
//                     this.props.loadUser(data)
//                     this.usernameChanged()
//                     document.getElementById('txt-input').value='';
//                     this.setState({
//                         usernameExists: false, 
//                     })
//                 }
//             })
//         }
//     }

//     usernameChanged = () => {
//         this.setState({
//             isUsernameChanged: true,
//         })
//     }

//     changePassword = () => {
//         fetch("http://localhost:3003/updatepassword",{
//             method: "put",
//             headers: {"Content-Type":"application/json"},
//             body: JSON.stringify({
//                 id: this.props.id,
//                 oldPassword: this.state.oldPassword,
//                 newPassword: this.state.newPassword,
//             }) 
//         })
//         .then(response=>response.json())
//         .then(data=>{
//             if(data==="incorrect password") {
//                 this.setState({
//                     isWrongPassword: true,
//                 })
//             }else{
//                 this.props.loadUser(data)
//                 document.getElementById("change").value=""
//                 document.getElementById("change2").value=""
//             }
//         })
//     }  

//     deleteSolves = () =>{
//         fetch("http://localhost:3003/deletesolves", {
//             method: "delete",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id
//             })
//         })
//         .then(response=>response.json())
//         this.setState({
//             solves: []
//         })
//     }

//     deleteAccount = () => {
//         fetch("http://localhost:3003/deleteaccount", {
//             method: "delete",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 password: this.state.deleteAccountPassword,
//                 id: this.props.id,
//             })
//         }).then(response=> response.json())
//         .then(data=> {
//             if(data==="incorrect password"){
//                 this.setState({
//                     isWrongPassword2: true,
//                 })
//             }
//             else{
//                 this.props.signIn()
//                 this.props.signedIn()
//                 sessionStorage.removeItem("solvesStored")
//                 localStorage.removeItem("scrambleLength")
//                 this.props.signout()
//             }
//         })
//     }

//     deleteAccountPassword = (event) => {
//         this.setState({
//             deleteAccountPassword: event.target.value
//         })
//     }

//     themeToDB = () => {
//         if (this.props.isBackgroundLight){
//             this.props.light()
//         }else {
//             this.props.dark()
//         }
//         fetch("http://localhost:3003/theme", {
//             method: "put",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id,
//                 theme: !this.props.isBackgroundLight
//             })
//         }).then(res=>res.json())
//     }

//     analytics = () => {
//         this.setState({
//             isAnalytics: true,
//             isSolves: false,
//         })
//     }

//     settings = () => {
//         this.setState({
//             isAnalytics: false,
//         })
//     }

//     solvesRoute = () => {
//         this.setState({
//             isSolves: true,
//             isAnalytics: true,
//         })
//     }

//     componentDidMount(){
//         setTimeout(()=>this.props.getSessions(),1)
//         // this.getSessions2()
//         this.getSolves()
//     }

//     getSolvesFromImportManual = (input) => {
//         this.setState({
//             solves: [...this.state.solves, input]
//         })
//     }

//     test = () => {
//         // console.log(this.state.solves)
//         console.log(this.state.dateAverages)
//         console.log(this.state.datesDBunique)
//         console.log(this.state.categories)
//     }



//     render() {
//         return(
//             <div>
//                 <button onClick={this.test}>push</button>
//                 <h1 id="light">
//                     <nav id="padRight" style={{display: 'flex', justifyContent: 'flex-end'}}>
//                         <button onClick={this.props.signIn} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Home</button> 
//                     </nav>
//                 </h1>
//                 <h1><nav style={{display: 'flex', justifyContent: "center"}}>
//                 <button onClick={this.solvesRoute} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Solves</button> 
//                 <button onClick={this.analytics} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Analytics</button> 
//                 <button onClick={this.settings} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Settings</button> 
//                 </nav></h1>
//                 {this.state.isAnalytics 
//                 ?
//                 (this.state.isSolves ?
//                 <div style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
//                     <CardList getDates={this.clearDates} getCategories={this.getCategories} removeFromSolves={this.removeFromSolves} getSessions={this.props.getSessions} sessionInterface={this.props.sessionInterface} getSessionAfterDelete={this.props.getSessionAfterDelete} sessions={this.props.sessions} getInterfaceSessionAfterDelete={this.props.getInterfaceSessionAfterDelete} removeFromUniqueSessionsDB={this.props.removeFromUniqueSessionsDB} uniqueSessionsDB={this.props.uniqueSessionsDB} loadPastSessionSolveData={this.props.loadPastSessionSolveData} removeSessionFromState={this.removeSessionFromState} sortSolves={this.sortSolves} getSolves={this.getSolves} id={this.props.id} solvesSorted={this.state.solvesSorted} isBackgroundLight={this.props.isBackgroundLight}/>                
//                 </div>
//                 :
//                 <div>
//                     <GraphTest categories={this.state.categories} getSolves={this.getSolves} isBackgroundLight={this.props.isBackgroundLight} averages={this.state.dateAverages} dates={this.state.datesDBunique} />
//                    {/* <Graph isBackgroundLight={this.props.isBackgroundLight} averages={this.state.dateAverages} dates={this.state.datesDBunique}/> */}
//                     <GraphNumberSolves isBackgroundLight={this.props.isBackgroundLight} averages={this.state.countNumberSolves} dates={this.state.datesDBunique}/>
//                 </div>                    
//                 )
//                 :
//                 <Settings getSolvesFromImportManual={this.getSolvesFromImportManual} getDates={this.clearDates} getCategories={this.getCategories} solves={this.state.solvesSorted} getSolves={this.getSolves} scrambleQuantityMinus={this.props.scrambleQuantityMinus}  scrambleQuantityPlus={this.props.scrambleQuantityPlus} aoNumChangePlus={this.props.aoNumChangePlus} aoNumChangeMinus={this.props.aoNumChangeMinus} id={this.props.id} uniqueSessionsDB={this.props.uniqueSessionsDB} inspectionTimePlus={this.props.inspectionTimePlus} inspectionTimeMinus={this.props.inspectionTimeMinus} inspectionTime={this.props.inspectionTime}  isCountDownActivated={this.props.isCountDownActivated} aoNum={this.props.aoNum} aoNumChange={this.props.aoNumChange} isBackgroundLight={this.props.isBackgroundLight} signout={this.props.signout} scrambleQuantityNew={this.props.scrambleQuantityNew} scrambleQuantity={this.props.scrambleQuantity} usernameExists={this.state.usernameExists} isUsernameChanged={this.state.isUsernameChanged} changeUsername={this.changeUsername} newPassword={this.newPassword} oldPassword={this.oldPassword} isWrongPassword={this.state.isWrongPassword} changePassword={this.changePassword} deleteAccountPassword={this.deleteAccountPassword} isWrongPassword2={this.state.isWrongPassword2} deleteAccount={this.deleteAccount} themeToDB={this.themeToDB} username={this.username} />
//                 }
//             </div>
//         )
//     }
// }

// export default Dashboard







// dateAverage = () => {
//     //gets average of solves by date
//     var allAverages = []
//     this.state.dateMillisecondsSorted.map((solve)=>{
//         console.log(this.state.datesDBunique)
//         var totalMS = 0
//         var divisor = 0
//         var avgMS = 0
//         var average = "0.000"
//         solve.map(solve2=>{
//             var msNumber = solve2
//             totalMS += Number(msNumber)
//             divisor += 1
//             return(null)
//         })
//         if (divisor > 0){
//             avgMS = (totalMS/divisor)
//             average = avgMS / 1000
//             allAverages.push(Number(average.toFixed(3)))
//         }
//         return(null)
//     })
//     this.setState({
//         dateAverages: [...this.state.dateAverages, allAverages]
//     })
// }



import React, { Component } from "react"
import "./Dashboard.css"
import CardList from "./CardList"
// import Graph from "./Graph"
import GraphNumberSolves from "./GraphNumberSolves"
import Settings from "./Settings"
import GraphTest from "./GraphTest"


//dashboard
// class Dashboard extends Component{

//     state = {
//         username: "",
//         newPassword: "",
//         oldPassword: "",
//         solves: [],
//         solvesSorted: [],
//         sessions: 0,
//         isAnalytics: true,
//         deleteAccountPassword: "",
//         isWrongPassword: false,
//         isWrongPassword2: false,
//         isUsernameChanged: false,
//         sessionsDBunique: [],
//         datesDBunique: [],
//         dateMillisecondsSorted: [],
//         uniqueDatesQuantity: 0,
//         dateAverages: [],
//         isSolves: true,
//         usernameExists: false,
//         countNumberSolves: [],
//         latestSession: "",
//         categories: [],
//         puzzles: [],
//         categoriesSorted: [],
//         categoryDates: [],
//     }

//     getSolves = () => {
//         //gets all solves, dates, sessions from database
//         fetch("http://localhost:3003/getsolves", {
//             method: "post",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id
//             })
//         })
//         .then(response=>response.json())
//         //solves
//         .then(data=>{
//             this.setState({
//                 solves: data
//             })
//             //sessions
//             const sessionArray = []
//             this.state.solves.map(solve=> {
//                 sessionArray.push(solve.session)
//                 return(null)
//             })
//             const distinctSessions = [...new Set(sessionArray)]
//             this.setState({
//                 sessions: distinctSessions.length
//             })
//             const allSessions = []
//             data.map(solve=> {
//                 allSessions.push(solve.session)
//                 return(null)
//             })
//             var uniqueSessions = [...new Set(allSessions)]
//             this.setState({
//                 sessionsDBunique: uniqueSessions,
//                 sessionsDBuniqueLength: uniqueSessions.length,
//             })
//             //dates
//             const allDates = []
//             data.map(solves=>{
//                 allDates.push(solves.date)
//                 return(null)
//             })
//             var uniqueDates = [...new Set(allDates)]
//             uniqueDates.sort((a,b)=>{
//                 return a > b
//             })
//             this.setState({
//                 datesDBunique: uniqueDates,
//                 uniqueDatesQuantity: uniqueDates.length 
//             })
//             this.sortSolves()
//             this.sortDates()
//             this.getCategories()
//         }) 
//     }

//     // getPuzzles = () => {
//     //     let puzzles = []
//     //     this.state.solves.map(solves=>{
//     //         puzzles = [...categories, solves.puzzle]
//     //         return(null)
//     //     })
//     //     puzzles = new Set(puzzles)
//     //     puzzles = Array.from(puzzles)
//     //     this.setState({
//     //         puzzles: puzzles
//     //     })
//     //     setTimeout(()=>this.sortPuzzles(),100)
//     // }

//     getCategories = () => {
//         let categories = []
//         this.state.solves.map(solves=>{
//             if (solves.sessionname !== null && solves.sessionname.length>0){
//                 categories=[...categories, solves.sessionname]
//             }
//             return(null)
//         })
//         categories = new Set(categories)
//         categories = Array.from(categories)
//         this.setState({
//             categories: categories
//         })
//         setTimeout(()=>this.sortCategories(),100)
//     }

//     sortCategories = () => {
//         let categoryDates = []
//         let categorySolves = []
//         this.state.datesDBunique.map(date =>{
//             let solves = []
//             let dates = []
//             this.state.categories.map(category=>{
//                 let totalMS = 0
//                 let count = 0
//                 this.state.solves.map(solve=>{
//                     if (solve.date===date && solve.sessionname===category){
//                         // solves.push(solve)
//                         totalMS += Number(solve.milliseconds)
//                         count ++
//                         dates.push(date)
//                         // console.log("solve",solve)
//                     }
//                 })
//                 let average = Math.round(totalMS/count)
//                 if(average>0){
//                     solves.push(average)
//                 }
//             })
//             if(solves.length>0){
//                 dates = new Set(dates)
//                 dates = Array.from(dates)
//                 categorySolves.push(solves)
//                 categoryDates.push(dates)
//             }
//         })
//         console.log(categorySolves)
//         console.log(categoryDates)
//         this.setState({
            
//         })
//     }

//     sortPuzzles = () => {
//         // let puzzleDates = []
//     }

//     sortSolves = () => {
//         //sorts solves by session
//         while (this.state.sessions > 0){
//             const solves = []
//             this.state.solves.map(solve =>{
//                 if (solve.session === this.state.sessionsDBunique[this.state.sessionsDBuniqueLength-1]){
//                     solves.push(solve)
//                 }
//                 return(null)
//             })
//             this.setState({
//                 solvesSorted: [...this.state.solvesSorted, solves]
//             })
//             this.setState(prevState=>({
//                 sessions: prevState.sessions - 1,
//                 sessionsDBuniqueLength: prevState.sessionsDBuniqueLength - 1,
//             }))
//         }
//     }

//     sortDates = () => {
//         //sorts all solves by date
//         while(this.state.uniqueDatesQuantity > 0) {
//             const masterArray = []
//             this.state.solves.map(solve =>{
//                 if (solve.date === this.state.datesDBunique[this.state.uniqueDatesQuantity-1]){
//                     masterArray.push(solve.milliseconds)
//                 }
//                 return(null)
//             })
//             this.setState({
//                 dateMillisecondsSorted: [masterArray, ...this.state.dateMillisecondsSorted],
//                 countNumberSolves: [masterArray.length, ...this.state.countNumberSolves]
//             })
//             this.setState(prevState=>({
//                 uniqueDatesQuantity: prevState.uniqueDatesQuantity - 1,
//             }))
//         }
//         this.dateAverage()
//     }

//     dateAverage = () => {
//         //gets average of solves by date
//         var allAverages = []
//         this.state.dateMillisecondsSorted.map((solve)=>{
//             var totalMS = 0
//             var divisor = 0
//             var avgMS = 0
//             var average = "0.000"
//             solve.map(solve2=>{
//                 var msNumber = solve2
//                 totalMS += Number(msNumber)
//                 divisor += 1
//                 return(null)
//             })
//             if (divisor > 0){
//                 avgMS = (totalMS/divisor)
//                 average = avgMS / 1000
//                 allAverages.push(Number(average.toFixed(3)))
//             }
//             return(null)
//         })
//         this.setState({
//             dateAverages: allAverages
//         })
//     }

//     username = (event) => {
//         this.setState({
//             username: event.target.value
//         })
//     }

//     newPassword = (event) => {
//         this.setState({
//             newPassword: event.target.value
//         })
//     }

//     oldPassword = (event) => {
//         this.setState({
//             oldPassword: event.target.value
//         })
//     }

//     removeSessionFromState = index => {
//         const { solvesSorted } = this.state;
//         this.setState({
//             solvesSorted: solvesSorted.filter((solve, i) => { 
//                 return i !== index;
//             })
//         });
//     }

//     changeUsername = () => {
//         if (this.state.username.length>0){
//             fetch("http://localhost:3003/updateusername", {
//                 method: "put",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({
//                     newUsername: this.state.username,
//                     id: this.props.id
//                 })
//             })
//             .then(response=>response.json())
//             .then(data=>{
//                 if (data === "username exists"){
//                     this.setState({
//                         usernameExists: true, 
//                     })
//                 }else{
//                     this.props.loadUser(data)
//                     this.usernameChanged()
//                     document.getElementById('txt-input').value='';
//                     this.setState({
//                         usernameExists: false, 
//                     })
//                 }
//             })
//         }
//     }

//     usernameChanged = () => {
//         this.setState({
//             isUsernameChanged: true,
//         })
//     }

//     changePassword = () => {
//         fetch("http://localhost:3003/updatepassword",{
//             method: "put",
//             headers: {"Content-Type":"application/json"},
//             body: JSON.stringify({
//                 id: this.props.id,
//                 oldPassword: this.state.oldPassword,
//                 newPassword: this.state.newPassword,
//             }) 
//         })
//         .then(response=>response.json())
//         .then(data=>{
//             if(data==="incorrect password") {
//                 this.setState({
//                     isWrongPassword: true,
//                 })
//             }else{
//                 this.props.loadUser(data)
//                 document.getElementById("change").value=""
//                 document.getElementById("change2").value=""
//             }
//         })
//     }  

//     deleteSolves = () =>{
//         fetch("http://localhost:3003/deletesolves", {
//             method: "delete",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id
//             })
//         })
//         .then(response=>response.json())
//         this.setState({
//             solves: []
//         })
//     }

//     deleteAccount = () => {
//         fetch("http://localhost:3003/deleteaccount", {
//             method: "delete",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 password: this.state.deleteAccountPassword,
//                 id: this.props.id,
//             })
//         }).then(response=> response.json())
//         .then(data=> {
//             if(data==="incorrect password"){
//                 this.setState({
//                     isWrongPassword2: true,
//                 })
//             }
//             else{
//                 this.props.signIn()
//                 this.props.signedIn()
//                 sessionStorage.removeItem("solvesStored")
//                 localStorage.removeItem("scrambleLength")
//                 this.props.signout()
//             }
//         })
//     }

//     deleteAccountPassword = (event) => {
//         this.setState({
//             deleteAccountPassword: event.target.value
//         })
//     }

//     themeToDB = () => {
//         if (this.props.isBackgroundLight){
//             this.props.light()
//         }else {
//             this.props.dark()
//         }
//         fetch("http://localhost:3003/theme", {
//             method: "put",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 id: this.props.id,
//                 theme: !this.props.isBackgroundLight
//             })
//         }).then(res=>res.json())
//     }

//     analytics = () => {
//         this.setState({
//             isAnalytics: true,
//             isSolves: false,
//         })
//     }

//     settings = () => {
//         this.setState({
//             isAnalytics: false,
//         })
//     }

//     solvesRoute = () => {
//         this.setState({
//             isSolves: true,
//             isAnalytics: true,
//         })
//     }

//     componentDidMount(){
//         setTimeout(()=>this.props.getSessions(),1)
//         // this.getSessions2()
//         this.getSolves()
//     }

//     render() {
//         return(
//             <div>
//                 <button onClick={this.getCategories}> Categories</button>
//                 <h1 id="light">
//                     <nav id="padRight" style={{display: 'flex', justifyContent: 'flex-end'}}>
//                         <button onClick={this.props.signIn} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Home</button> 
//                     </nav>
//                 </h1>
//                 <h1><nav style={{display: 'flex', justifyContent: "center"}}>
//                 <button onClick={this.solvesRoute} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Solves</button> 
//                 <button onClick={this.analytics} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Analytics</button> 
//                 <button onClick={this.settings} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Settings</button> 
//                 </nav></h1>
//                 {this.state.isAnalytics 
//                 ?
//                 (this.state.isSolves ?
//                 <div style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
//                     <CardList getSessions={this.props.getSessions} sessionInterface={this.props.sessionInterface} getSessionAfterDelete={this.props.getSessionAfterDelete} sessions={this.props.sessions} getInterfaceSessionAfterDelete={this.props.getInterfaceSessionAfterDelete} removeFromUniqueSessionsDB={this.props.removeFromUniqueSessionsDB} uniqueSessionsDB={this.props.uniqueSessionsDB} loadPastSessionSolveData={this.props.loadPastSessionSolveData} removeSessionFromState={this.removeSessionFromState} sortSolves={this.sortSolves} getSolves={this.getSolves} id={this.props.id} solvesSorted={this.state.solvesSorted} isBackgroundLight={this.props.isBackgroundLight}/>                
//                 </div>
//                 :
//                 <div>
//                     <GraphTest categoriesSorted={this.state.categoriesSorted} categories={this.state.categories} getSolves={this.getSolves} isBackgroundLight={this.props.isBackgroundLight} averages={this.state.dateAverages} dates={this.state.datesDBunique} />
//                     {/* <Graph isBackgroundLight={this.props.isBackgroundLight} averages={this.state.dateAverages} dates={this.state.datesDBunique}/> */}
//                     <GraphNumberSolves isBackgroundLight={this.props.isBackgroundLight} averages={this.state.countNumberSolves} dates={this.state.datesDBunique}/>
//                 </div>                    
//                 )
//                 :
//                 <Settings solves={this.state.solvesSorted} getSolves={this.getSolves} scrambleQuantityMinus={this.props.scrambleQuantityMinus}  scrambleQuantityPlus={this.props.scrambleQuantityPlus} aoNumChangePlus={this.props.aoNumChangePlus} aoNumChangeMinus={this.props.aoNumChangeMinus} id={this.props.id} uniqueSessionsDB={this.props.uniqueSessionsDB} inspectionTimePlus={this.props.inspectionTimePlus} inspectionTimeMinus={this.props.inspectionTimeMinus} inspectionTime={this.props.inspectionTime}  isCountDownActivated={this.props.isCountDownActivated} aoNum={this.props.aoNum} aoNumChange={this.props.aoNumChange} isBackgroundLight={this.props.isBackgroundLight} signout={this.props.signout} scrambleQuantityNew={this.props.scrambleQuantityNew} scrambleQuantity={this.props.scrambleQuantity} usernameExists={this.state.usernameExists} isUsernameChanged={this.state.isUsernameChanged} changeUsername={this.changeUsername} newPassword={this.newPassword} oldPassword={this.oldPassword} isWrongPassword={this.state.isWrongPassword} changePassword={this.changePassword} deleteAccountPassword={this.deleteAccountPassword} isWrongPassword2={this.state.isWrongPassword2} deleteAccount={this.deleteAccount} themeToDB={this.themeToDB} username={this.username} />
//                 }
//             </div>
//         )
//     }
// }

// export default Dashboard



// TimerInterface.js
// rand(input) {
//     //generates scramble
//     console.log(input)
//     if (input){
//       var scramble = ""
//       var x = this.props.scrambleQuantity
//       var ob = {
//           pastScramble: null,
//           pastScramble2: null,
//       }
//       while (x > 0) {
//           const onefour = [0,1,2,3,4,5]
//           x--
//           if (ob.pastScramble !== null){
//             var i = onefour.indexOf(ob.pastScramble)
//             onefour.splice(i, 1)
//           }
//           if (ob.pastScramble2 !== 7){
//             var ind = onefour.indexOf(ob.pastScramble2)
//             onefour.splice(ind, 1)
//           }
//           var first =  onefour[Math.floor(Math.random()*onefour.length)]
//           var second = Math.floor(Math.random()*3)
//           if (input==="2x2"||input==="3x3"){
//             scramble += twothree[first][second]
//           }
//           if (input==="4x4"||input==="5x5"){
//             scramble += fourfive[first][second]
//           }
//           if (input==="6x6"||input==="7x7"){
//             scramble += sixseven[first][second]
//           }
//           scramble += " "
//           ob["pastScramble2"] = ob.pastScramble
//           ob["pastScramble"] = first
//       }
//       this.setState({
//           scramble: String(scramble),
//       })
//     }
//   }

//card.js
var x = 0
var y = 0
// if (this.props.uniqueSession===this.props.sessions){
//     x = this.props.uniqueSessionsDB.length
// }
// if (!this.props.uniqueSessionsDB.includes(this.props.sessions)){
//     //if current session is deleted, then other sessions are deleted
//     console.log("1")
//     x = this.props.uniqueSessionsDB.length
//     y = Math.max(...this.props.uniqueSessionsDB)
//     this.props.getSessionAfterDelete(y+1)
// }
if (this.props.sessions===this.props.uniqueSession) {
    //if current session is deleted, then user goes to timer
    console.log("2")
    // x = this.props.uniqueSessionsDB.length
    x = this.props.sessionDisplayName + 1
    y = Math.max(...this.props.uniqueSessionsDB)
    this.props.getSessionAfterDelete(y + 1)
}else{
    console.log("3")
    //deletes current session and updates session interface display
    this.props.removeFromUniqueSessionsDB(this.props.uniqueSession)
    this.props.uniqueSessionsDB.map((solve, index)=>{
        if (this.props.uniqueSession === solve){
            console.log(this.props.uniqueSessionsDB.length)
            console.log("index",this.props.ind)
            // x = this.props.uniqueSessionsDB.length - index
            x = this.props.sessionDisplayName + 1
        }
        return(null)
    })
}

//dashboard
getSessions2 = () => {
            //gets unique session numbers from database
            //and gets number of sessions
            //then calls the getSolves function
            fetch("http://localhost:3003/getsessions2", {
               method: "post",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({
                   id: this.props.id
               })
           })
           .then(response=>response.json())
           .then(data=>{
               console.log("getSessions2", data)
               var abc = data.length
               data.sort((a,b) => a-b)
               this.setState({
                   sessionsDBunique: data,
                   sessionsDBunique2: abc,
               })
               this.getSolves()
           })
       }
    
        getSolves = () => {
            //gets all solves from database
            fetch("http://localhost:3003/getsolves", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.id
                })
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    solves: data
                })
                console.log("getsolves", data)
                const sessionArray = []
                this.state.solves.map(solve=> {
                    sessionArray.push(solve.session)
                    return(null)
                })
                const distinctSessions = [...new Set(sessionArray)]
                this.setState({
                    sessions: distinctSessions.length
                })
                this.getUniqueDates()
                this.sortSolves()
            }) 
        }
    
        sortSolves = () => {
            //sorts solves by session
            while (this.state.sessions > 0){
                const solves = []
                this.state.solves.map(solve =>{
                    if (solve.session === this.state.sessionsDBunique[this.state.sessionsDBunique2-1]){
                        solves.push(solve)
                    }
                    return(null)
                })
                this.setState({
                    solvesSorted: [...this.state.solvesSorted, solves]
                })
                this.setState(prevState=>({
                    sessions: prevState.sessions - 1,
                    sessionsDBunique2: prevState.sessionsDBunique2 - 1,
                }))
            }
        }
    
        getUniqueDates = () => {
            //gets all unique dates from database
            fetch("http://localhost:3003/getuniquedates", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.id
                })
            }).then(response=>response.json())
            .then(data=>{
                data.sort((a,b)=> a>b)
                this.setState({
                    datesDBunique: data,
                    uniqueDatesQuantity: data.length 
                })
                this.sortDates()
            })
        }
    
        sortDates = () => {
            //sorts all solves by date
            while(this.state.uniqueDatesQuantity > 0) {
                const masterArray = []
                this.state.solves.map(solve =>{
                    if (solve.date === this.state.datesDBunique[this.state.uniqueDatesQuantity-1]){
                        masterArray.push(solve.milliseconds)
                    }
                    return(null)
                })
                this.setState({
                    dateMillisecondsSorted: [masterArray, ...this.state.dateMillisecondsSorted],
                    countNumberSolves: [masterArray.length, ...this.state.countNumberSolves]
                })
                this.setState(prevState=>({
                    uniqueDatesQuantity: prevState.uniqueDatesQuantity - 1,
                }))
            }
            this.dateAverage()
        }