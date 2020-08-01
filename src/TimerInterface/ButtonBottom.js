import React from "react"

const ButtonBottom = (props) => {
    return(
        props.isMobile ? 
        <div onClick={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer button-no-select ">
            <h5 className="not-hide-button summary-center button-no-select"><button id="colorClick2"  style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start"></button></h5>
        </div>
          :
        <div onClick={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer button-no-select ">
            <h5 className="not-hide-button timerButton summary-center button-no-select"><button id="colorClick2"  style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start"></button></h5>
        </div>
    )
}

export default ButtonBottom