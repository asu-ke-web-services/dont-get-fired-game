export const ACTION_ENUM = {
  NEW_GAME: 'NEW_GAME',
  SHOW_CREDITS: 'SHOW_CREDITS',
  GO_HOME: 'GO_HOME',
  SHOW_EVENT: 'SHOW_EVENT',
  PICK_EVENT_CHOICE: 'PICK_EVENT_CHOICE',
  START_FIRST_QUARTER: 'START_FIRST_QUARTER'
};

export const SCENE_ENUM = {
  SPLASH_SCENE: 'SPLASH_SCENE',
  INTRO_SCENE: 'INTRO_SCENE',
  CREDITS_SCENE: 'CREDITS_SCENE',
};

export function newGame() {
  return { type: ACTION_ENUM.NEW_GAME };
}

export function showCredits() {
  return { type: ACTION_ENUM.SHOW_CREDITS };
}

export function showEvent() {
  return { type: ACTION_ENUM.SHOW_EVENT };
}

export function pickEventChoice() {
  return { type: ACTION_ENUM.PICK_EVENT_CHOICE };
}

export function startFirstQuater() {
  return { type: ACTION_ENUM.START_FIRST_QUARTER };
}

export function goHome(areYouSure = false) {
  return {
    type: ACTION_ENUM.GO_HOME,
    areYouSure
  };
}
