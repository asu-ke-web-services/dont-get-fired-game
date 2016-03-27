import React from 'react';
import { default as NextQuarterButton } from
    '../../game/sidebar/next-quarter-button/next-quarter-button.jsx';
import { default as AdvisorPanel } from '../advisor-panel/advisor-panel.jsx';
import { default as CompanyName} from '../company-name/company-name.jsx';

export default React.createClass({
  render() {
    return (
      <div className="main-side-bar">
        <div className="company-name">
          <CompanyName companyName={this.props.state.companyName} />
        </div>
        <div className="advisor-panel">
          <AdvisorPanel state={this.props.state} />
        </div>
        <div className="next-quarter-button">
          <NextQuarterButton actions={this.props.state.game.actions}/>
        </div>
      </div>

      );
  }
});
