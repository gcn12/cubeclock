import React from "react"

const Toggles = props => {
    return(
        <ul className="summary-center">      
            <li>
                <label htmlFor="mobile" className="label1"><h4>Touch start/stop (for large mobile devices)</h4></label>
                <input type="checkbox" id="mobile" className="checkbox input1" onClick={props.isMobile} />  
                <label htmlFor="mobile" className="switch"></label>
            </li>  
            <br></br>
            <li>
                <label htmlFor="solveconfirm" className="label1"><h4>Confirm before deleting solve</h4></label>
                <input type="checkbox" id="solveconfirm" className="checkbox input1" onClick={props.isConfirmSolve} />  
                <label htmlFor="solveconfirm" className="switch"></label>
            </li>  
            <br></br>
            <li>
                <label htmlFor="sessionconfirm" className="label1"><h4>Confirm before deleting session</h4></label>
                <input type="checkbox" id="sessionconfirm" className="checkbox input1" onClick={props.isConfirmSession} />  
                <label htmlFor="sessionconfirm" className="switch"></label>
            </li>
            <br></br>
            <li>
                <label htmlFor="disabletimer" className="label1"><h4>Deactivate timer during solve</h4></label>
                <input type="checkbox" id="disabletimer" className="checkbox input1" onClick={props.isDisableTimer} />  
                <label htmlFor="disabletimer" className="switch"></label>
            </li>
            <br></br>
            <li>
                <label htmlFor="offline" className="label1"><h4>Offline mode</h4></label>
                <input type="checkbox" id="offline" className="checkbox input1" onClick={props.offlineConfirm} />  
                <label htmlFor="offline" className="switch"></label>
            </li>
            <br></br>
            <li>
                {props.didOnlineSyncWork ? 
                <label className="label1">
                    <h4>Sync was successful</h4>
                </label>
                :
                <h4> </h4>
                }
                {props.isSyncUnsuccessful ? 
                <label className="label1">
                    <h4 style={{color: "red"}}>Sync failed</h4>
                </label>
                :
                <h4> </h4>
                }
                {props.didOfflineSyncWork ? 
                <label className="label1">
                    <h4>Offline mode activated</h4>
                </label>
                :
                <h4> </h4>
                }
                {props.isUploading ? 
                <label className="label1">
                    <h4>Syncing...</h4>
                </label>
                :
                <h4> </h4>
                }
                {props.isDownloading ? 
                <label className="label1">
                    <h4>Downloading...</h4>
                </label>
                :
                <h4> </h4>
                }
            </li>
            <br></br>
        </ul>
    )
}

export default Toggles