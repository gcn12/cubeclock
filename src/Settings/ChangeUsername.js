import React from "react"

const ChangeUsername = props => {
    return(
        <div className="center"> 
            <br></br>
            <h2>Change username:</h2>
            <br></br>
            {props.isBackgroundLight ? 
            <input id="txt-input" style={{width: "200px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter new username" className="pa2 ba b--green bg-white form-input" onChange={props.username} type="text"></input>
            :
            <input id="txt-input" style={{width: "200px", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter new username" className="pa2 ba b--green bg-black form-input"  onChange={props.username} type="text"></input>
            }
            {
                props.usernameExists ? 
                <h4 style={{color: "red"}}>Username unavailable</h4>
                :
                <h4> </h4>
            }
            {
            props.isUsernameChanged ?
            <h4>Username has been changed</h4> 
            :
            <h4> </h4>
            }
            <h1><button onClick={props.changeUsername} className="button2" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change</button></h1>
        </div>
    )
}

export default ChangeUsername