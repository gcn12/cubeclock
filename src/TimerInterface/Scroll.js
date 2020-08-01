import React from "react"

const Scroll = (props) => {
    return(
    <div>
        {props.isMobile ? 
        <div id="scroll" className="scroll" style={{overflowY:"scroll", height:"170px"}}>{props.children}</div>
        :
        <div id="scroll" className="scroll" style={{overflowY:"scroll"}}>{props.children}</div>
        }
    </div>
    )
}

export default Scroll