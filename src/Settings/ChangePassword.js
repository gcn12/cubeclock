import React from "react"

const ChangePassword = props => {
    return(
        <div className="center">
            <br></br>
            <h2>Change password:</h2>
            <br></br>
            {props.isBackgroundLight ? 
            <input id="change2" style={{width: "200px",color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter current password" className="pa2 ba b--green bg-white form-input" onChange={props.oldPassword} type="password"></input>
            :
            <input id="change2" style={{width: "200px", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter current password" className="pa2 ba b--green bg-black form-input"  onChange={props.oldPassword} type="password"></input>
            }
            <br></br>
            <br></br>
            {props.isBackgroundLight ? 
            <input id="change" style={{width: "200px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Enter new password" className="pa2 ba b--green bg-white form-input" onChange={props.newPassword} type="password"></input>
            :
            <input id="change" style={{width: "200px", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Enter new password" className="pa2 ba b--green bg-black form-input"  onChange={props.newPassword} type="password"></input>
            }
            {props.isBackgroundLight ? 
            <input id="change3" style={{width: "200px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder="Re-enter new password" className="pa2 ba b--green bg-white form-input" onChange={props.newPasswordReenter} type="password"></input>
            :
            <input id="change3" style={{width: "200px", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "white"}} placeholder="Re-enter new password" className="pa2 ba b--green bg-black form-input"  onChange={props.newPasswordReenter} type="password"></input>
            }
            {props.isPasswordChanged ? 
            <h4>Password has been changed</h4> 
            :
            <h4> </h4>
            }
            {
            props.isWrongPassword ?
            <h4 style={{color: "red"}}>Current password is incorrect</h4>
            :
            <h4> </h4>
            }
            {
            props.isPasswordMatch ?
            <h4> </h4>
            :
            <h4 style={{color: "red"}}>Passwords do not match</h4>
            }
            <h1><button type="button" onClick={props.changePassword} className="button2" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change</button></h1>
            <br></br>
        </div>
    )
}

export default ChangePassword