import React from "react"

const ButtonTop = (props) => {
    return(
        !props.isManualEnter ? 
            props.isMobileGoing ? 
            <h1> </h1>
            : 
            (props.isMobile ? 
            <div onClick={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer button-no-select hide-button summary-center button-no-select">
                <button id="colorClick" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start button-no-select "></button>
                {/* <h5 className="hide-button summary-center button-no-select"><button id="colorClick" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start button-no-select "></button></h5> */}
            </div>
            :
            <div onClick={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer hide-button  timerButton summary-center button-no-select">
                <button id="colorClick" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start"></button>
                {/* <h5 className="hide-button  timerButton summary-center button-no-select"><button id="colorClick" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start"></button></h5> */}
            </div>
            ) 
        :
            <div></div>
    )
}

export default ButtonTop