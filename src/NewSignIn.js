import React, { Component } from "react"
import "./NewSignIn.css"

class SignIn extends Component {

    state = {
        username: "",
        password: "",
        isWrongUsername: false,
        confirm: false,
        isSigningIn: false,
    }

    username = (event) => {
        this.setState ({
            username: event.target.value
        })
    }

    password = (event) => {
        this.setState ({
            password: event.target.value
        })
    }

    isSigningIn = () => {
        this.setState({
            isSigningIn: true,
        })
    }

    submit = () => {
        this.timeout = setTimeout(()=> this.isSigningIn(), 1000)
        fetch("https://blooming-hollows-98248.herokuapp.com/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data==="unable to get user"){
                this.setState({
                    isWrongUsername: true,
                    isSigningIn: false,
                })
                clearTimeout(this.timeout)
            } else{
                this.props.loadUser(data)
                this.props.signIn()
                this.props.signedIn()
                this.props.receive()
                if(this.state.confirm){
                    localStorage.setItem("user", JSON.stringify(this.props.user))
                    localStorage.setItem("key", JSON.stringify(data.key))
                }
            }
        })
    }

    confirm = () => {
        this.setState({
            confirm: !this.state.confirm,
        })
    }

    render() {
        return(
            <div className="cardpadding absolute-center tc bg-white dib br3 pa3 ma2 bw2 shadow-5">
                <h1 id="cardpadding"> </h1>
                <h1>Log In</h1>
                <input onChange={this.username}  type="text" placeholder="enter username" className="pa2 ba b--gray bg-white"></input>
                <br></br>
                <br></br>
                <input onChange={this.password} type="password" placeholder="enter password" className="pa2 ba b--gray bg-white"></input>
                <br></br>
                {
                this.state.isWrongUsername 
                ? 
                <h4 style={{color: "red"}}>Incorrect username or password</h4>
                :
                <h4> </h4>
                }
                <br></br>
                <label>
                    <input onClick={this.confirm} type="checkbox"></input>
                    <span> Stay signed in</span>
                </label>
                <br></br>
                {this.state.isSigningIn ? 
                <div>
                    <br></br>
                    <h4>Signing in...</h4>
                    <br></br>
                    <br></br>
                </div>
                :
                // <h1> </h1>
                <h1><button onClick={this.submit} className="button2" style={{color:  "rgb(23, 23, 23)", backgroundColor:  "white", borderColor: "rgb(23, 23, 23)"}}>sign in</button></h1>
                }
                <h4><button onClick={this.props.register} className="button2"  style={{color:  "rgb(23, 23, 23)", backgroundColor:  "white", borderColor: "rgb(23, 23, 23)"}}>Register</button></h4>
                <h1 id="paddingbottom"> </h1>
            </div>
        )
    }
}

export default SignIn