import {
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../actions/types";

export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        ...action.payload.profile,
        articlesByAuther: action.payload.articles
      };

    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        articlesFavBy: action.payload.articles
      };

    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        ...action.payload.profile
      };

    default:
      return state;
  }
}
