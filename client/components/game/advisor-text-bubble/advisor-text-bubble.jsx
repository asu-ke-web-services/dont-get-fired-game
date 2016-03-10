import React from 'react';

export default React.createClass({
  render() {
    return (
        <div>
          <span className="advisor-text-bubble">
            {this.props.main.text}
          </span>
        </div>
    );
  }
});
