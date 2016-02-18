import React from 'react';

export default React.createClass({
    render() {
        return (
            <div style ={{padding: "20px"}}>
                <div style = {{padding: "20px", border: "2px"}} >
                    <img style = {{width: "100px", height: "100px", border: "2px", padding: "10px"}}/>
                     <span style={{boarder: "2px solid"}}>
                         this.program.Name
                         <br/>
                         this.program.ShortDescription
                         <br/>
                         this.program.Cost
                         <br/>
                         this.program.Addtional
                     </span>
                    <button onclick="">
                      Setup Program ({this.prop.actionPointValue} Action Points)
                    </button>
                </div>
            </div>
        );
    }
});