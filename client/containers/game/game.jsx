import React from 'react';
import Reflux from 'reflux';

import { SCENE_ENUM } from '../../enums/scene-enum';

import { StartPage } from '../../components/pages/start-page/start-page.jsx';
import { IntroPage } from '../../components/pages/intro-page/intro-page.jsx';

const determineScene = ( state ) => {
  let scene;

  console.log( state );

  switch (state.scene) {
    case SCENE_ENUM.INTRO_SCENE:
      scene = <IntroPage state={state} />;
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
