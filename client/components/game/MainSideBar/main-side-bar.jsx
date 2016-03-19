import React from 'react';

import { mainSideBarButton} from '../sidebar/next-quarter-button/next-quarter-button.jsx';
import { advisorPanel } from '../advisor-panel/advisor-panel.jsx';
import {companyName} from '../company-name/company-name.jsx';
import { dispatch } from '../../../stores/game-store';
import { showQuaterReport } from '../../../actions/actions';
export default React.createClass({
  onClick( ) {
    dispatch( showQuaterReport() );
  },
  render() {
    return (
      <div className="main-side-bar">
        <div className="company-name">
          <companyName state={this} />
        </div>
        <div className="advisor-panel">
          <advisorPanel state={this} />
        </div>
        <div className="next-quarter-button">
          <mainSideBarButton state={this} />
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        (This is hacked in, Review MainSideBar - All 3 compoents are not showing)
        <button className="button" onClick={this.onClick}>Next Quater</button>
      </div>

    );
  }
});
