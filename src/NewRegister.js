import React, { Component } from "react"
import "./NewSignIn.css"

class Register extends Component {

    state = {
        name: "",
        password: "",
        isUserExist: false,
    }

    name = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    password = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submit = () => {
        fetch("https://blooming-hollows-98248.herokuapp.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.name,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then (data => {
            if (data === "user exists"){
                this.setState({
                    isUserExist: true,
                })
            } else{
                this.props.signIn()
                this.props.signedIn()
                this.props.loadUser(data)
            }
        })
    }

    render() {
        return(
            <div className="cardpadding absolute-center tc bg-white dib br3 pa3 ma2 bw2 shadow-5">
                <h1 id="cardpadding"> </h1>
                <h1>Register</h1>
                <br></br>
                <input onChange={this.name} type="text" placeholder="enter username" className="pa2 ba b--black bg-white"></input>
                <br></br>
                <br></br>
                <input onChange={this.password} type="password" placeholder="enter password" className="pa2 ba b--black bg-white"></input>
                <br></br>
                {this.state.isUserExist ? 
                <h4 style={{color: "red"}}>Username already in use</h4>
                :
                <h4> </h4>
                }
                <h1><button onClick={this.submit} className="button2" style={{color:  "rgb(23, 23, 23)", backgroundColor:  "white", borderColor: "rgb(23, 23, 23)"}}>Register</button></h1>
                <h4><button onClick={this.props.register}  className="button2"  style={{color:  "rgb(23, 23, 23)", backgroundColor:  "white", borderColor: "rgb(23, 23, 23)"}}>sign in</button></h4>
                <h1 id="paddingbottom"> </h1>
            </div>
        )
    }
}

export default Register