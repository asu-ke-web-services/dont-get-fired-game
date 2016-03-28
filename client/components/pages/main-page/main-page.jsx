import React from 'react';

import { default as MainActionAreaWindow } from
  '../../game/main-action-area-window/main-action-area-window.jsx';
import { default as MainSideBar } from '../../game/MainSideBar/main-side-bar.jsx';
import { default as MainHeaderBar } from '../../game/header/main-header-bar/main-header-bar.jsx';

const MainPage = React.createClass({
  render() {
    return (
      <div className="main-page">
        <div className="left">
          <MainSideBar state={this.props.state} />
        </div>
        <div className="right">
          <div className="top">
            <MainHeaderBar capital={this.props.state.game.capital}
                           capitalPerQuarter={this.props.state.game.capitalPerQuarter}
                           currentQuarter={this.props.state.game.currentQuarter}
                           totalQuarters={this.props.state.game.totalQuarters}
                           goals={this.props.state.game.goals} />
          </div>
          <div className="mainarea">
           <MainActionAreaWindow programs={this.props.state.game.programs}
                                 selectedProgram={this.props.state.selectedProgram}
                                 capital={this.props.state.game.capital}
                                 actions={this.props.state.game.actions} />
          </div>
        </div>
      </div>
    );
  }
});

export { MainPage };
