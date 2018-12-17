import { GET_ALL_USERS } from "../constants";

let initialState = {
  allUsers: null
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case GET_ALL_USERS:
      let users = [];
      users = action.payload.data.payload.map(index => index);
      updated.allUsers = users;

      return updated;

    default:
      return state;
  }
};
