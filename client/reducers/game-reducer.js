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
      let game = new Game();
      game.init();

      return {
        ...oldState,
        game,
        scene: SCENE_ENUM.INTRO_SCENE
      };
    case ACTION_ENUM.SHOW_CREDITS:
      return {
        ...oldState,
        scene: SCENE_ENUM.CREDITS_SCENE
      };
    case ACTION_ENUM.GO_HOME:
      return {
        ...oldState,
        game: null,
        scene: SCENE_ENUM.SPLASH_SCENE
      };
    case ACTION_ENUM.SHOW_EVENT:
      let event = showEvent(); 
      
      return {
        ...oldState,
        event
      };
    case ACTION_ENUM.PICK_EVENT_CHOICE:
      let pickeventchoice = pickEventChoice();
      
      return {
        ...oldState,
        pickeventchoice
      };
    case ACTION_ENUM.START_FIRST_QUARTER:
      let startFirstQuater = startFirstQuater();
      
      return {
        ...oldState,
        startFirstQuater
      };
    default:
      return oldState;
  }
};

export { gameReducer };
