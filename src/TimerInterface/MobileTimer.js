import React from "react"

const MobileTimer = props => {
    return(
        <div onTouchStart={props.stopMobile} onMouseDown={props.stopMobile} onTouchEnd={props.stopMobileRoute} onMouseUp={props.stopMobileRoute} className="height-width">
            {props.isTimerDisabled ? 
              <h1 className="absolute-center disable-timer-mobile" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}> TAP TO STOP </h1>
            :
            <h1 className="absolute-center" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke"}}> {props.timerFormatted} </h1>
            }
        </div>
    )
}

export default MobileTimer