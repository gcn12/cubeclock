import React from "react"

const ButtonBottom = (props) => {
    return(
        !props.isManualEnter ? 
            props.isMobile ? 
            <div onMouseUp={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer button-no-select not-hide-button summary-center button-no-select">
                <button id="colorClick2"  style={{marginTop:"5%", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start"></button>
            </div>
            :
            <div onMouseUp={props.beginMobile} onTouchStart={()=>props.color()} onMouseDown={()=>props.color()} onTouchEnd={props.beginMobile}   className="pointer button-no-select not-hide-button timerButton summary-center button-no-select ">
                <button id="colorClick2"  style={{marginTop:"5%", color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="start-button timer-text-start "></button>
            </div>
        :
        <div></div>
    )
}

export default ButtonBottom