import React from "react"

const InspectionTime = props => {
    return(
        <div className="center">
            <h4>Inspection time:</h4>  
                <div >
                    {props.isBackgroundLight ? 
                    <input className="test11 pa2 ba b--green bg-white form-input" style={{ color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder={props.inspectionTime}  onChange={props.inspectionTimeToState} type="number" min="0" max="100"></input>
                    :
                    <input className="test11 pa2 ba b--green bg-black form-input" style={{ width: "100px", color: props.isBackgroundLight ? "rgb(25, 25, 25)" : "white"}} placeholder={props.inspectionTime}  onChange={props.inspectionTimeToState} type="number" min="0" max="100"></input>
                    }
                    <h1 className="test11 test22"><button onClick={()=>props.changeInspectionTime(props.inspectionTimeFromState)} className="button2" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>Change inspection time</button></h1>
                </div>
                {props.isInspectionSubmitted ? 
                <h4 style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}>Inspection time has been updated</h4>
                :
                <h4> </h4>
                }
                {props.isInvalidInspection ? 
                <h4 style={{color: "red"}}>Number must be between 0 and 100</h4>
                :
                <h4> </h4>
                }
                <br></br>
            </div>
    )
}

export default InspectionTime