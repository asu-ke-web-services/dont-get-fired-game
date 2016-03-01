import { ACTION_ENUM, SCENE_ENUM } from '../actions/actions';

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
        ...state,
        game: new Game(),
        scene: SCENE_ENUM.INTRO_SCENE
      };
    case ACTION_ENUM.SHOW_CREDITS:
      return {
        ...state,
        scene: SCENE_ENUM.CREDITS_SCENE
      };
    default:
      return state;
  } 
};

export { gameReducer };
