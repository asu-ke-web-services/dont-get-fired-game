export const ACTION_ENUM = {
  NEW_GAME: 'NEW_GAME',
  SHOW_CREDITS: 'SHOW_CREDITS',
  GO_HOME: 'GO_HOME',
  PICK_EVENT_CHOICE: 'PICK_EVENT_CHOICE',
  SHOW_MAIN: 'SHOW_MAIN',
  SHOW_QUATER_REPORT: 'SHOW_QUATER_REPORT',
  SHOW_EVENT: 'SHOW_EVENT',
  SHOW_FINAL_REPORT: 'SHOW_FINAL_REPORT',
  SHOW_TWEET: 'SHOW_TWEET',
  SELECT_PROGRAM: 'SELECT_PROGRAM',
  ADD_PROGRAM: 'ADD_PROGRAM'
};

export const SCENE_ENUM = {
  SPLASH_SCENE: 'SPLASH_SCENE',
  INTRO_SCENE: 'INTRO_SCENE',
  CREDITS_SCENE: 'CREDITS_SCENE',
  MAIN_SCENE: 'START_FIRST_QUARTER_SCENE',
  QUATER_REPORT_SCENE: ' QUATER_REPORT_SCENE',
  EVENT_SCENE: 'EVENT_SCENE',
  FINAL_REPORT_SCENE: 'FINAL_REPORT_SCENE',
  TWEET_SCENE: 'TWEET_SCENE'
};

export function newGame() {
  return { type: ACTION_ENUM.NEW_GAME };
}

export function selectProgram( programName ) {
  return { type: ACTION_ENUM.SELECT_PROGRAM, programName };
}

export function addProgram( programName ) {
  return { type: ACTION_ENUM.ADD_PROGRAM, programName };
}

export function showCredits() {
  return { type: ACTION_ENUM.SHOW_CREDITS };
}
export function showMain() {
  return { type: ACTION_ENUM.SHOW_MAIN };
}
export function showQuaterReport() {
  return { type: ACTION_ENUM.SHOW_QUATER_REPORT };
}
export function showEvent() {
  return { type: ACTION_ENUM.SHOW_EVENT };
}
export function pickEventChoice() {
  return { type: ACTION_ENUM.PICK_EVENT_CHOICE };
}
export function showFinalReport() {
  return { type: ACTION_ENUM.SHOW_FINAL_REPORT };
}
export function showTweetPage() {
  return { type: ACTION_ENUM.SHOW_TWEET };
}
export function goHome(areYouSure = false) {
  return {
    type: ACTION_ENUM.GO_HOME,
    areYouSure
  };
}
