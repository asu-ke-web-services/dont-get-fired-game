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
    case ACTION_ENUM.SHOW_MAIN:
      return {
        ...oldState,
        scene: SCENE_ENUM.MAIN_SCENE
      };
    case ACTION_ENUM.SHOW_QUATER_REPORT:
      return {
        ...oldState,
        scene: SCENE_ENUM.QUATER_REPORT_SCENE
      };
    case ACTION_ENUM.SHOW_EVENT:
      return {
        ...oldState,
        scene: SCENE_ENUM.EVENT_SCENE
      };
    case ACTION_ENUM.SHOW_FINAL_REPORT:
      return {
        ...oldState,
        scene: SCENE_ENUM.FINAL_REPORT_SCENE
      };
    case ACTION_ENUM.SHOW_TWEET:
      return {
        ...oldState,
        scene: SCENE_ENUM.TWEET_SCENE
      };
    default:
      return oldState;
  }
};

export { gameReducer };
