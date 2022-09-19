import {
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  FOLLOWER_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
} from "./actionType";

const initState = {
  loading: false,
  error:false,
  repos: [],
  followers: [],
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true ,error: false};
    case USER_SUCCESS:
      return { ...state, repos: action.payload, loading: false,error: false };
    case USER_REQUEST:
    return { ...state, loading: false ,error: true };

    case FOLLOWER_REQUEST:
      return { ...state };
    case FOLLOWER_SUCCESS:
      return { ...state, followers: action.payload };

    default:
      return state;
  }
};
