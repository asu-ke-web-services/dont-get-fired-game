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
          <div className="quarter-report-page__popup">
          <h1 className="quarterReport_headline">
           Quarter {this.props.state.game.currentQuarter} Report</h1>

          <div className="quarterReport_information">
            <span>You got a capital change of {this.props.state.game.capitalChangeInCurrentQuarter}
            this quarter.</span>
            <br/>
            <span>People's satisfaction with your company has increased by
                {this.props.state.game.satisfactionCurrentQuarter}.
            </span>
            <br/>
            <br/>
            <br/>
            <span> Keep up the good work!</span>
            <br/>
            <br/>
            <button className="button" onClick={this.nextQuarter}>Next</button>
          </div>
         </div>
        </div>
    );
  }
});
export { QuarterReportPage };
