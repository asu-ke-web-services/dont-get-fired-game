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
          <MainSideBar state={this} />

        </div>
        <div className="right">
          <div className="top">
            <MainHeaderBar state={this} />
          </div>
          <div className="mainarea">
           <MainActionAreaWindow state={this} />
          </div>
        </div>
      </div>
    );
  }
});

export { MainPage };
