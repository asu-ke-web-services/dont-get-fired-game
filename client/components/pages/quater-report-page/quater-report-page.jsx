import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { closeQuarterReport } from '../../../actions/actions';

const QuaterReportPage = React.createClass({
  nextQuarter(e) {
    e.preventDefault();
    dispatch( closeQuarterReport() );
  },

  render() {
    return (
        <div className="quater-report-page">
          <h1 className="quaterReport_headline">Quater Report
              {this.props.state.game.currentQuarter}</h1>
          <span className="quaterReport_information">
            <span>You got a captial change is
                {this.props.state.game.capitalChangeInCurrentQuarter}.</span>
            <br/>
            <span>You got {this.props.state.game.satisfactionCurrentQuarter}.
                satisfaction points</span>
            <br/>
            <br/>
            <button onClick={this.nextQuarter}>Next</button>
          </span>
        </div>
    );
  }
});
export { QuaterReportPage };
