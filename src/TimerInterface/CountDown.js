import React from "react"

const CountDown = props => {
    return(
        <div onTouchEnd={props.startTimerDuringCountDownMobile} onMouseUp={props.startTimerDuringCountDownMobile}  className="height-width">
            <h5 className="absolute-center" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>{props.countDown}</h5>
        </div>
    )
}

export default CountDown