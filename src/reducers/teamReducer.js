import { EDIT_USER, FIND_USER, GET_TEAM } from '../constants';

let initialState = {
  team: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type) {

    case GET_TEAM:
      updated.team = action.data;

      return updated;
    
    default:
      return state;
  }

}