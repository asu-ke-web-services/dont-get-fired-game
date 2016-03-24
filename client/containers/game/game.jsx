import React from 'react';

import { SCENE_ENUM } from '../../actions/actions';

import { StartPage } from '../../components/pages/start-page/start-page.jsx';
import { IntroPage } from '../../components/pages/intro-page/intro-page.jsx';
import { CreditsPage } from '../../components/pages/credits-page/credits-page.jsx';
import { MainPage } from '../../components/pages/main-page/main-page.jsx';
import { EventPage } from '../../components/pages/event-page/event-page.jsx';
import { QuaterReportPage } from '../../components/pages/quarter-report-page/quater-report-page.jsx';
import { FinalReportPage } from '../../components/pages/final-report-page/final-report-page.jsx';
import { ShowTweetPage } from '../../components/pages/tweet-page/tweet-page.jsx';

const determineScene = ( state ) => {
  let scene;

  switch (state.scene) {
    case SCENE_ENUM.INTRO_SCENE:
      scene = <IntroPage state={state} />;
      break;
    case SCENE_ENUM.CREDITS_SCENE:
      scene = <CreditsPage state={state} />;
      break;
    case SCENE_ENUM.MAIN_SCENE:
      scene = <MainPage state={state} />;
      break;
    case SCENE_ENUM.QUATER_REPORT_SCENE:
      scene = <QuaterReportPage state={state} />;
      break;
    case SCENE_ENUM.EVENT_SCENE:
      scene = <EventPage state={state} />;
      break;
    case SCENE_ENUM.FINAL_REPORT_SCENE:
      scene = <FinalReportPage state={state} />;
      break;
    case SCENE_ENUM.TWEET_SCENE:
      scene = <ShowTweetPage state={state} />;
      break;
    default:
      scene = <StartPage state={state} />;
  }

  return scene;
};

const Game = ({ state }) => (
  <div className="game-container">
    {determineScene( state )}
  </div>
);

export { Game };
