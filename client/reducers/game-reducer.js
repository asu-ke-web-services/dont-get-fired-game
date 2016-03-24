import { ACTION_ENUM, SCENE_ENUM } from '../actions/actions';
import { default as CSGame } from '../models/cs-game';
const gameReducer = ( state = null, action ) => {
  // Initialize the state
  let oldState;

  if ( state === null ) {
    oldState = {
      game: null,
      scene: SCENE_ENUM.SPLASH_SCENE,
    };
  } else {
    oldState = state;
  }

  switch ( action.type ) {
    case ACTION_ENUM.NEW_GAME:
      let game = new CSGame();
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

    case ACTION_ENUM.SELECT_PROGRAM:
      return {
        ...oldState,
        selectedProgram: action.program,
        scene: SCENE_ENUM.MAIN_SCENE
      };
    case ACTION_ENUM.UNSELECT_PROGRAM:
      return {
        ...oldState,
        selectedProgram: null,
        scene: SCENE_ENUM.MAIN_SCENE
      };
    case ACTION_ENUM.ADD_PROGRAM:
      oldState.game.buyProgram(action.program);

      return {
        ...oldState,
        selectedProgram: null,
        scene: SCENE_ENUM.MAIN_SCENE
      };
    case ACTION_ENUM.SHOW_QUATER_REPORT:


      return {
        ...oldState,
        scene: SCENE_ENUM.QUATER_REPORT_SCENE
      };
    case ACTION_ENUM.CLOSE_QUARTER_REPORT:

      oldState.game.nextQuarter();
      var currentScene = SCENE_ENUM.MAIN_SCENE;
      if ( oldState.game.gameOver === true || oldState.game.goalsMeet === true ) {
        currentScene = SCENE_ENUM.FINAL_REPORT_SCENE;
      }

      return {
        ...oldState,
        scene: currentScene
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
