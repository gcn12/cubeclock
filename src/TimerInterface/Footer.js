import React from "react"

const Footer = (props) => {
    return(
        props.isSessionName 
        ?
        (props.id
        ? 
        <div id="average">
            <h2>Session: {props.sessionInterface} | {props.sessionName} | {props.puzzleType}</h2>
        </div>
        :
        <h2> </h2>)
        :
        (props.id
            ? 
            <div id="average">
            <h2>Session: {props.sessionInterface} | {props.puzzleType} </h2>
            </div>
            :
        <h2> </h2>)
    )
}

export default Footer