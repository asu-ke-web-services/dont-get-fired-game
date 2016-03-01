import { ACTION_ENUM } from '../enums/action-enum';
import { SCENE_ENUM } from '../enums/scene-enum';

import { default as Game } from '../models/game';

const gameReducer = ( state = null, action ) => {
  // Initialize the state
  if ( state === null ) {
    state = {
      game: null,
      scene: SCENE_ENUM.SPLASH_SCENE
    };
  }

  switch ( action.type ) {
    case ACTION_ENUM.NEW_GAME:
      return {
        game: new Game(),
        scene: SCENE_ENUM.INTRO_SCENE
      };
    default:
      return state;
  } 
};

export { gameReducer, SCENE_ENUM, ACTION_ENUM };
