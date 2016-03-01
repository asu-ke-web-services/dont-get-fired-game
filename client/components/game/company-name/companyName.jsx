import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="company_name">
        <h>{this.props.CompanyName}</h>
      </div>
    );
  }
});
