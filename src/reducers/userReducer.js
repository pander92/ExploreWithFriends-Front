import { EDIT_USER, GET_TEAM, TEAM_ID, UPDATE_USER_LOC } from '../constants';

let initialState = {
  user: null,
  userID: [],
  peopleDetails: null,
  team: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_USER_LOC:
      console.log('Data to update from Reducer: ', action);
      updated.user = action.data.data.user;

      return updated;

    case EDIT_USER:
      updated.user = action.data.data.user;
      return updated;

    case TEAM_ID:
      console.log(action.payload)
      let userID = [];
      action.payload.map((item, index) => {
        userID.push(item)
      })
      return updated;

    case GET_TEAM:
      updated.team = action.data;
      return updated;

    default:
      return state;
  }

}