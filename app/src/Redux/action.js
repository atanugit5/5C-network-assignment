import axios from "axios";
import {
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  FOLLOWER_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
} from "./actionType";

//user actions:==>
export const userRequest = () => {
  return { type: USER_REQUEST };
};

export const userSuccess = (payload) => {
  return { type: USER_SUCCESS, payload };
};

export const userFailure = () => {
  return { type: USER_FAILURE };
};

export const userFunc = (user) => (dispatch) => {
  dispatch(userRequest());
  axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then((r) => dispatch(userSuccess(r.data)))
    .catch((e) => dispatch(userFailure()));
};

//follower actions:===>

export const followerRequest = () => {
  return { type: FOLLOWER_REQUEST };
};

export const followerSuccess = (payload) => {
  return { type: FOLLOWER_SUCCESS, payload };
};

export const followerFailure = () => {
  return { type: FOLLOWER_FAILURE };
};

export const followerFunc = (user) => (dispatch) => {
  dispatch(followerRequest());
  axios
    .get(`https://api.github.com/users/${user}/followers`)
    .then((r) => dispatch(followerSuccess(r.data)));
};
