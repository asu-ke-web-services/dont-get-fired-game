export const ACTION_ENUM = {
  NEW_GAME: 'NEW_GAME',
  SHOW_CREDITS: 'SHOW_CREDITS',
  GO_HOME: 'GO_HOME'
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

export function goHome(areYouSure = false) {
  return {
    type: ACTION_ENUM.GO_HOME,
    areYouSure
  };
}