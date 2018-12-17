import { GET_ALL_USERS, GET_ALL_TEAMS } from "../constants";

let initialState = {
  allTeams: null
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case GET_ALL_TEAMS:
      let teams = [];
      teams = action.payload.data.payload.map(index => index);
      console.log(
        "Grabbing all TEAMS....Data in allTeamsReducer: ",
        action.payload.data.payload[0].teamName
      );
      console.log("TempArray = ", teams);
      updated.allTeams = teams;

      return updated;

    default:
      return state;
  }
};
