import { ACTION_ENUM, SCENE_ENUM } from '../actions/actions';

import { default as Game } from '../models/game';

const gameReducer = ( state = null, action ) => {
  // Initialize the state
  let oldState;

  if ( state === null ) {
    oldState = {
      game: null,
      scene: SCENE_ENUM.SPLASH_SCENE
    };
  } else {
    oldState = state;
  }

  switch ( action.type ) {
    case ACTION_ENUM.NEW_GAME:
      return {
        ...oldState,
        game: new Game(),
        scene: SCENE_ENUM.INTRO_SCENE
      };
    case ACTION_ENUM.SHOW_CREDITS:
      return {
        ...oldState,
        scene: SCENE_ENUM.CREDITS_SCENE
      };
    default:
      return oldState;
  }
};

export { gameReducer };
