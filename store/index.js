import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUser from './auth';
import results from './results';
import time from './time';
import capturedItems from './capturedItems';
import users from './users';
import customMaps from './customMaps';

const reducer = combineReducers({
  results,
  time,
  capturedItems,
  currentUser,
  users,
  customMaps
});
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // createLogger({collapsed: true})
  )
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './results';
export * from './time';
export * from './capturedItems';
export * from './users';
export * from './customMaps';

//All game logic should be in redux
//Then moving redux store to the back-end
//This allows us to correctly do permissions and validate user actions, so there's no cheating.
//Will need sockets.io to emit for every user action
