import React from 'react';
import { default as NQB } from '../../game/sidebar/next-quarter-button/next-quarter-button.jsx';
import { default as advisorPanel } from '../advisor-panel/advisor-panel.jsx';
import { default as companyName} from '../company-name/company-name.jsx';

export default React.createClass({
  render() {
    return (
      <div className="main-side-bar">
        <div className="company-name">
          <companyName/>
        </div>
        <div className="advisor-panel">
          <advisorPanel/>
        </div>
        <div className="next-quarter-button">
          <NQB/>
        </div>
      </div>

      );
  }
});
