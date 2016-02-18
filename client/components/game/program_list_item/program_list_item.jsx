import React from 'react';

export default React.createClass({
    render() {
        return (
            <div style ={{padding: "20px"}}>
                <div style = {{padding: "20px", border: "2px"}} >
                    <img style = {{width: "100px", height: "100px", border: "2px", padding: "10px"}}/>
                     <span style={{boarder: "2px solid"}}>
                         programName
                         <br/>
                         programShortDescription
                     </span>
                    <button onclick="">
                        <img src="this.program.StateImage" style= {{width: "100px", height: "100px", border: "2px", padding: "10px"}}/>
                    </button>
                </div>
            </div>
        );
    }
});