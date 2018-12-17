import { GET_CURRENT_USER_LOCATION, ADD_TEAM_ADDRESS, CHALLENGE1, CHALLENGE2, CHALLENGE3 } from '../constants';

var initialState = {
  currentLocation: {
    lat: 40.7224017,
    lng: -73.9896719
  },
  allLocations: [],
  nameOfPlace: []
}
export default (state = initialState, action) => {
  let updated = Object.assign({}, state);
  let position = {}
  let newPosition = {}
  switch (action.type) {
    case CHALLENGE1:
      let challengeArray = [];
      let annoyedArray = [];
      annoyedArray.push(action.payload)
      annoyedArray.map((item, index) => {
        let position = {};
        position.lat = item.challenge1.postion[0]
        position.lng = item.challenge1.postion[1]
        position.name = item.challenge1.name
        position.picture = item.challenge1.picture
        position.teamId = item._id
        position.challenge = 'Challenge 1'
        challengeArray.push({ position })
      })
      const newAddedLocation = updated.allLocations.concat(challengeArray)
      updated.allLocations = newAddedLocation;
      return updated;

    case CHALLENGE2:
      let challengeArray2 = [];
      let annoyedArray2 = [];
      annoyedArray2.push(action.payload)
      annoyedArray2.map((item, index) => {
        let position = {};
        position.lat = item.challenge2.postion[0]
        position.lng = item.challenge2.postion[1]
        position.name = item.challenge2.name
        position.picture = item.challenge2.picture
        position.teamId = item._id
        position.challenge = 'Challenge 2'
        challengeArray2.push({ position })
      })
      const newAddedLocation2 = updated.allLocations.concat(challengeArray2)
      updated.allLocations = newAddedLocation2;
      return updated;

    case CHALLENGE3:
      let challengeArray3 = [];
      let annoyedArray3 = [];
      annoyedArray3.push(action.payload)
      annoyedArray3.map((item, index) => {
        let position = {};
        position.lat = item.challenge3.postion[0]
        position.lng = item.challenge3.postion[1]
        position.name = item.challenge3.name
        position.picture = item.challenge3.picture
        position.teamId = item._id
        position.challenge = 'Challenge 3'
        challengeArray3.push({ position })
      })
      const newAddedLocation3 = updated.allLocations.concat(challengeArray3)
      updated.allLocations = newAddedLocation3;
      return updated;

    case ADD_TEAM_ADDRESS:
      let addTeam = [];
      let annoyedArray4 = [];
      annoyedArray4.push(action.payload)
      let usersArray = annoyedArray4[0].users
      for (let i = 0; i < usersArray.length; i++) {
        let position = {};
        position.lat = usersArray[i].currentPostion.position[0]
        position.lng = usersArray[i].currentPostion.position[1]
        position.name = usersArray[i].username
        position.picture = usersArray[i].userPicture
        position.team = annoyedArray4[0].teamName
        addTeam.push({ position })
      }
      const newAddedTeammate = updated.allLocations.concat(addTeam)
      updated.allLocations = newAddedTeammate;
      return updated;

    case GET_CURRENT_USER_LOCATION:
      updated.currentLocation.lat = action.payload.latitude;
      updated.currentLocation.lng = action.payload.longitude;
      position.lat = action.payload.latitude;
      position.lng = action.payload.longitude;
      position.name = 'Current Location'
      newPosition.position = position;
      updated.allLocations.push(newPosition);
      return updated;
    default:
      return updated;
  }
}