import articles from "../../apis/articles";
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED
} from "./types";

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

export const fetchArticlesByAuthor = (author, page) => async dispatch => {
  const response = await articles.get(
    `/articles?author=${encodeURIComponent(author)}&${limit(10, page)}`
  );
  dispatch({ type: PROFILE_PAGE_LOADED, payload: response.data });
};

export const fetchArticlesFavoritedBy = (author, page) => async dispatch => {
  const response = await articles.get(
    `/articles?favorited=${encodeURIComponent(author)}&${limit(10, page)}`
  );
  console.log("response", response);
  dispatch({ type: PROFILE_FAVORITES_PAGE_LOADED, payload: response.data });
};

export const followUser = username => async dispatch => {
  const response = await articles.post(`/profiles/${username}/follow`);
  console.log("follow", response);
  dispatch({ type: FOLLOW_USER, payload: response.data });
};

export const unFollowUser = username => async dispatch => {
  const response = await articles.delete(`/profiles/${username}/follow`);
  console.log("unfollow", response);
  dispatch({ type: UNFOLLOW_USER, payload: response.data });
};

export const getUser = username => async dispatch => {
  const response = await articles.get(`/profiles/${username}`);
  console.log("profile", response);
  dispatch({ type: PROFILE_PAGE_LOADED, payload: response.data });
};
