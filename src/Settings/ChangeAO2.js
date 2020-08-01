import React from "react"

const ChangeAO2 = props => {
    return(
        <div className="center">
            <div >
                {props.isBackgroundLight ? 
                <input className="test11 pa2 ba b--green bg-white form-input" style={{ color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder={props.aoNum2}  onChange={props.aoNumInput2} type="number" min="4" max="1000"></input>
                :
                <input className="test11 pa2 ba b--green bg-black form-input" style={{ width: "100px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder={props.aoNum2}  onChange={props.aoNumInput2} type="number" min="4" max="1000"></input>
                }
                <h1 className="test11 test22"><button onClick={()=>props.aoNumChange2(props.aoNumState2)} className="button2" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change AO number 2</button></h1>
            </div>


            {props.isAoSubmitted2 ? 
            <h4 style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Number has been updated</h4>
            :
            <h4> </h4>
            }
            {props.isInvalidAoNum2 ? 
            <h4 style={{color: "red"}}>Number must be between 4 and 1000</h4>
            :
            <h4> </h4>
            }
            <br></br>
        </div>
    )
}

export default ChangeAO2