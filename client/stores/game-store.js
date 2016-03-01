import { createStore } from 'redux';

import { gameReducer } from '../reducers/game-reducer';

// Create a store from our game reducer
const store = createStore( gameReducer );

export { store };
