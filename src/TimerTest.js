import React, { Component } from "react"

class TimerTest extends Component {
    state = {
        time: 0
    }

    test = () => {
        this.setState({
            time: this.state.time + 1
        })
    }

    test2 = () =>{
        this.interval = setInterval(()=>this.test(), 1)
    }


    render(){
        return(
            <div>
                <button onClick={this.test2}>Push</button>
                <div className="tc">
                    {this.state.time}
                </div>
            </div>
        )
    }
}

export default TimerTest