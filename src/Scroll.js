import React from "react"

const Scroll = (props) => {
    return(
        <div id="scroll" className="scroll" style={{overflowY:"scroll"}}>{props.children}</div>
    )
}

export default Scroll