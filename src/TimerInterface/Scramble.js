import React from "react"

const ScrambleTable = props => {
    return(
    <table >
      <tbody >
        <tr >
          <td><h4 className="display-linebreak megaminx megaminxSmallInterfaceScramble" style={{color: props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)"}}>{props.megaminxScramble}</h4></td>
        </tr>
      </tbody>
    </table>
    )
}

const Scramble = props => {
    return(
        <div className=" display-linebreak">
            {props.isDisplayScrambleSmall ? 
            (props.isDisplayScrambleMedium ? 
              <div className="tc medium-text">
                {props.scramble}
              </div>
              :
              <div className="tc small-text">
              <h4 className="tc">{props.scramble}</h4> 
              </div>
              )
            :
            <h3 className="tc">{props.scramble}</h3>
            }
            <div className="summary-center">
              <ScrambleTable 
              isBackgroundLight={props.isBackgroundLight}
              megaminxScramble={props.megaminxScramble}
              />
            </div>
            <h4 className="display-linebreak tc">{props.multiBLDScramble}</h4>
        </div>
    )
}

export default Scramble