import {
  LOGIN,
  ASYNC_START,
  APP_LOAD,
  REDIRECT,
  AUTH_ERROR,
  SIGNUP,
  SIGNOUT
} from "../actions/types";

const INITIAL_STATE = {
  errorMessage: "",
  token: null,
  authenticated: "",
  currentUser: {}
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        currentUser: action.error ? null : action.payload
      };
    case REDIRECT:
      return { ...state, redirectTo: null };

    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        inProgress: false,
        authenticated: action.payload.user.token,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? null : action.payload.user
      };

    case SIGNOUT:
      return {
        ...state,
        redirectTo: "/",
        currentUser: null,
        authenticated: null
      };

    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case ASYNC_START:
      if (action.subtype === LOGIN) {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }
}
