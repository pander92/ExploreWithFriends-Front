// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { errorReducer, authReducer } from '../reducers';

// const reducers = combineReducers({
//   // insert reducers here
//   errors: errorReducer,
//   auth: authReducer
// });

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import {
  errorReducer,
  authReducer,
  mapReducer,
  userReducer,
  allUsersReducer,
  teamReducer,
  allTeamsReducer,
  userDbReducer
} from "../reducers";

const reducers = combineReducers({
  // insert reducers here
  errors: errorReducer,
  auth: authReducer,
  map: mapReducer,
  user: userReducer,
  userDB: userDbReducer,
  allUsers: allUsersReducer,
  teams: teamReducer,
  allTeams: allTeamsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
