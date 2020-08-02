import React, { Component } from "react"
import "./NewSignIn.css"

class Register extends Component {

    state = {
        name: "",
        password: "",
        isUserExist: false,
        key: "",
        id:"",
        isNameLengthWrong: false,
        isPassWordLengthWrong: false,
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

    componentDidMount(){
        this.key()
    }
 
    key = () => {
        let key = ""
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNNOPQRSTUVWXYZ"
        const numbers = "123456789"
        const characters = "!@#$%^&*()_+=-{}|;"
        let length = 10 + Math.ceil(Math.random()*8)
        for (let i =length; i--; i>0){
            let typeCharacter = Math.round(Math.random()*2)
            if (typeCharacter===0){
                key += letters[Math.round(Math.random()*51)]
            }else if (typeCharacter===1){
                key += numbers[Math.round(Math.random()*8)]
            }else{
                key += characters[Math.round(Math.random()*17)]
            }
        }
        this.setState({
            id: key,
        })
    }

    submit = () => {
        let key = ""
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNNOPQRSTUVWXYZ"
        const numbers = "123456789"
        const characters = "!@#$%^&*()_+=-{}|;"
        let length = 10 + Math.ceil(Math.random()*8)
        for (let i =length; i--; i>0){
            let typeCharacter = Math.round(Math.random()*2)
            if (typeCharacter===0){
                key += letters[Math.round(Math.random()*51)]
            }else if (typeCharacter===1){
                key += numbers[Math.round(Math.random()*8)]
            }else{
                key += characters[Math.round(Math.random()*17)]
            }
        }
        if (this.state.name.length>2 && this.state.name.length<30){
            this.setState({
                isNameLengthWrong: false,
            })
            if(this.state.password.length>5){
                this.setState({
                    isPassWordLengthWrong: false,
                })
                fetch("https://blooming-hollows-98248.herokuapp.com/register", {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: this.state.name,
                        password: this.state.password,
                        id: key,
                    })
                })
                .then(response => response.json())
                .then (data => {
                    if (data === "user exists"){
                        this.setState({
                            isUserExist: true,
                        })
                    } else{
                        this.props.clearSolvesState()
                        this.props.signIn()
                        this.props.signedIn()
                        this.props.loadUser(data)
                        fetch("https://blooming-hollows-98248.herokuapp.com/register2", {
                            method: "post",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                                id: key,
                            })
                        })
                        .then(response => response.json())
                    }
                })
            }else{
                this.setState({
                    isPassWordLengthWrong: true
                })
            }
        }else{
            this.setState({
                isNameLengthWrong: true,
            })
        }
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
                {this.state.isNameLengthWrong ? 
                <h4 style={{color: "red"}}>Username must be between 3 and 20 characters</h4>
                :
                <h4> </h4>
                }
                {this.state.isPassWordLengthWrong ? 
                <h4 style={{color: "red"}}>Password must be longer than five characters</h4>
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