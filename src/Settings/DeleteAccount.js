import React from "react"

const DeleteAccount = props => {
    return(
        <div className="center">
            <h2>Delete account:</h2>
            <br></br>
            {props.isBackgroundLight ? 
            <input style={{width: "200px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} className="pa2 ba b--green bg-white form-input" placeholder="Enter password" onChange={props.deleteAccountPassword}type="password"></input>
            :
            <input style={{width: "200px", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} className="pa2 ba b--green bg-black form-input" placeholder="Enter password" onChange={props.deleteAccountPassword} type="password"></input>
            }
            {
                props.isWrongPassword2 ?
                <h4 style={{color: "red"}}>Incorrect password</h4>
                :
                <h4> </h4>
            }
            <h1><button onClick={props.deleteAccountConfirm} className="button2" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Delete Account</button></h1>
            <br></br>
            <br></br>
        </div>
    )
}

export default DeleteAccount