import React from 'react';
import Event from '../event-page/event-page.jsx';

export default React.createClass({
  nextQuater(e) {
    e.preventDefault();

    // TODO
  },

  render() {
    return (
        <div className="quaterReport">
          <h1 className="quaterReport_headline">End Of Quater {this.props.quater.quaterNumber}</h1>
          <span className="quaterReport_information">
            {this.props.quater.quaterResult}
            <br/>
            {this.props.quater.quaterState}
            <br/>
            {this.props.quater.nextQuaterState}
            <button onClick={this.nextQuater}>Start Your Next Quater</button>
          </span>
        </div>
    );
  }
});

