import React from "react"

const HeaderContent = props => {
    return(
        props.isMobileGoing ? 
        <h1> </h1>
        :
        <div>
        {props.isSignedIn 
        ? <div id="padRight">
            <nav style={{display: 'flex', justifyContent: 'space-between', verticalAlign:"middle"}}>
        {JSON.parse(localStorage.getItem("offline")) ? 
            <div style={{ marginLeft:"4%",}}>
                <h1><button className="button-no-border" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>OFFLINE</button></h1>
            </div>
            :
            <h1> </h1>
            }
            <div style={{ marginRight:"1%",}}>
                <h1><button onClick={props.dashboard} style={{ color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">{props.username} | DASHBOARD</button></h1>
            </div>   
            </nav>
        </div>
        :
        <nav style={{display: 'flex', justifyContent: 'flex-end',}}>
            <div style={{marginRight:"6%",}}>
            <h1><button onClick={props.signIn} style={{ color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Sign In</button></h1>  
            </div>
        </nav>
        }
        </div>    
    )
}

export default HeaderContent