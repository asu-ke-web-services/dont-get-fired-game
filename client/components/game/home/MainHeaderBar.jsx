import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
                <div style={{display: "inline-block", marginRight: "30px"}}>Capital: {this.prop.capital} </div>
                <div style={{display: "inline-block", marginRight: "30px"}}>Cash Flow: {this.prop.cashFlow}</div>
                <div style={{display: "inline-block"}}>Quarter: {this.prop.quarter} of {this.prop.totalQuarterCount}</div>
            </div>
        );
    }
});