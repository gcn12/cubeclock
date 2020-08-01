import React from "react"

const Scroll = (props) => {
    return(
    <div style={{borderTop: props.isBackgroundLight ? "rgb(23, 23, 23) .1px solid" : "whitesmoke .1px solid",  borderBottom: props.isBackgroundLight ? "rgb(23, 23, 23) .1px solid" : "whitesmoke .1px solid"}}>
        {props.isMobile ? 
        <div id="scroll" className="scroll" style={{overflowY:"scroll", height:"170px"}}>{props.children}</div>
        :
        <div id="scroll" className="scroll" style={{overflowY:"scroll"}}>{props.children}</div>
        }
    </div>
    )
}

export default Scroll