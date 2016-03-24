import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { showEvent } from '../../../actions/actions';

const QuaterReportPage = React.createClass({
  nextQuater(e) {
    e.preventDefault();

    dispatch( showEvent() );
  },

  render() {
    return (
        <div className="quater-report-page">
          <h1 className="quaterReport_headline">End Of Quater {this.props.quaterNumber}</h1>
          <span className="quaterReport_information">
            {this.props.quaterResult}
            <br/>
            {this.props.quaterState}
            <br/>
            {this.props.nextQuaterState}
            <button onClick={this.nextQuater}>Next</button>
          </span>
        </div>
    );
  }
});
export { QuaterReportPage };
