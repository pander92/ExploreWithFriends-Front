import { GET_USER_DB } from "../constants";

let initialState = {
  userData: null
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case GET_USER_DB:
      // console.log(
      //   'Data to update from userDbReducer: ',
      //   action.payload.data.payload
      // );
      updated.userData = action.payload.data.payload;

      return updated;

    default:
      return state;
  }
};
