import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import jwt_decode from "jwt-decode";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   CLEAR_CURRENT_PROFILE
// } from '../constants';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,
  EDIT_USER,
  GET_TEAM,
  UPDATE_USER_LOC,
  GET_ALL_USERS,
  GET_ALL_TEAMS,
  JOIN_TEAM,
  GET_USER_DB,
  ADD_USER,
  REMOVE_USER
} from "../constants";

import { axiosPost, axiosPut } from "../utils/axios";

const Axios = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "access-control-allow-origin": "*"
  }
});
export const addUser = data => {
  axiosPost("/edit/adduser", data)
    .then(data => {
      console.log("ADDED USER, ", data);
    })
    .catch(error => {
      console.log("AddUser Error: ", error);
    });
};

export const removeUser = data => {
  axiosPost("/edit/removeuser", data)
    .then(data => {
      console.log("REMOVED USER, ", data);
    })
    .catch(error => {
      console.log("RemoveUser Error: ", error);
    });
};

export const getAllTeams = data => dispatch => {
  Axios.get(`/teams/getAllTeams`)
    .then(teams => {
      console.log("Axios-getAllTeams: ", teams);
      dispatch({
        type: GET_ALL_TEAMS,
        payload: teams
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getAllUsers = data => dispatch => {
  Axios.get(`/users/getAllUsers`)
    .then(users => {
      console.log("Axios-getAllUsers Call Returns: ", users);
      dispatch({
        type: GET_ALL_USERS,
        payload: users
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const joinTeam = data => dispatch => {
  console.log(
    "joinTeam-Action --- Sending Axios Data via 'put' to teams/addUswer",
    data
  );
  axiosPut("/edit/addUser?_method=PUT", data)
    .then(res => {
      dispatch({
        type: JOIN_TEAM,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getUserDB = userID => dispatch => {
  Axios.get(`/users/getuser?id=${userID}`)
    .then(user => {
      console.log("Axios-getUserDB: ", user);
      dispatch({
        type: GET_USER_DB,
        payload: user
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const registerUser = (userData, history) => dispatch => {
  axiosPost("/users/register", userData)
    .then(res => {
      if (res.data.status === 400 || res.data.status === 500) {
        if (res.data.email) {
          console.log("Email!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.email;
        }
        if (res.data.username) {
          console.log("username!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.username;
        }
        if (res.data.password) {
          console.log("password!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.password;
        }
      }
      return res;
    })
    .then(res => history.push("/users/login"))
    .catch(err => {
      console.log(err);
    });
};

export const loginUser = userData => dispatch => {
  axiosPost("/users/login", userData)
    .then(res => {
      if (res.data.status === 400 || res.data.status === 500) {
        if (res.data.email) {
          console.log("Email!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.email;
        }
        if (res.data.username) {
          console.log("username!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.username;
        }
        if (res.data.password) {
          console.log("password!");
          dispatch({
            type: GET_ERRORS,
            payload: res.data
          });
          return res.data.password;
        }
      }
      return res;
    })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateUserLoc = userLocation => dispatch => {
  axiosPut("/users/updateuserloc?_method=PUT", userLocation)
    .then(res => {
      dispatch({
        type: UPDATE_USER_LOC,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//Edit User
export const editUser = user => dispatch => {
  Axios.put("/users/update-profile", user)
    .then(user => {
      dispatch({
        type: EDIT_USER,
        data: user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Get all users
export const getTeam = team => dispatch => {
  Axios.get(`/teams/getteam?id=${team.id}`)
    .then(result => {
      dispatch({
        type: GET_TEAM,
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};
