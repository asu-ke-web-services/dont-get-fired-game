import React from 'react';

import { mainSideBarButton} from '../../../sidebar/next-quarter-button/next-quarter-button';
import { advisorPanel } from '../../../advisor-panel/advisor-panel';
import {companyName} from '../../../company-name/company-name';

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
          <mainSideBarButton/>
        </div>
      </div>

    );
  }
});
