import React from 'react';

export default React.createClass({
  render() {
    return (
        <div className="company－name">
          <h>{this.props.companyName}</h>
        </div>
    );
  }
});
