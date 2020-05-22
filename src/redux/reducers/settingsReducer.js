import { SETTINGS_SAVED, ASYNC_START } from "../actions/types";

const INITIAL_STATE = {
  errorMessage: "",
  token: null
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETTINGS_SAVED:
      return {
        ...state,
        inProgress: false,
        redirectTo: action.error ? null : "/",
        errors: action.error ? action.payload.error : null,
        currentUser: action.error ? null : action.payload.user
      };

    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
}
