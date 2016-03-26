import React from 'react';

import { dispatch } from '../../../stores/game-store';
import { closeQuarterReport } from '../../../actions/actions';

const QuarterReportPage = React.createClass({
  nextQuarter(e) {
    e.preventDefault();
    dispatch( closeQuarterReport() );
  },

  render() {
    return (
        <div className="quarter-report-page">
          <h1 className="quarterReport_headline">End Of Quarter
              {this.props.state.game.currentQuarter}</h1>
          <span className="quarterReport_information">
            <span>You have changed your capital by $
                {this.props.state.game.capitalChangeInCurrentQuarter}</span>
            <br/>
            <span>People's satisfaction with your company has increased by
                {this.props.state.game.satisfactionCurrentQuarter}
            </span>
            <br/>
            <br/>
            <button onClick={this.nextQuarter}>Next</button>
          </span>
        </div>
    );
  }
});
export { QuarterReportPage };
