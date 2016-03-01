import React from 'react';

import { SCENE_ENUM } from '../../actions/actions';

import { StartPage } from '../../components/pages/start-page/start-page.jsx';
import { IntroPage } from '../../components/pages/intro-page/intro-page.jsx';
import { CreditsPage } from '../../components/pages/credits-page/credits-page.jsx';

const determineScene = ( state ) => {
  let scene;

  switch (state.scene) {
    case SCENE_ENUM.INTRO_SCENE:
      scene = <IntroPage state={state} />;
      break;
    case SCENE_ENUM.CREDITS_SCENE:
      scene = <CreditsPage state={state} />;
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
