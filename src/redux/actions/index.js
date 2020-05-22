import {
  LOGIN,
  FETCH_ARTICLES,
  REDIRECT,
  AUTH_ERROR,
  APP_LOAD,
  SETTINGS_SAVED,
  SIGNOUT,
  DELETE_ARTICLE,
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CHANGE_TAB,
  APPLY_TAG_FILTER,
  GET_ALL_TAGS,
  SET_PAGE,
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  ADD_TAG,
  REMOVE_TAG
} from "./types";
import articles from "../../apis/articles";
import history from "../../history";

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

export const signin = (email, password) => dispatch => {
  articles
    .post("/users/login", {
      user: { email, password }
    })
    .then(response => {
      localStorage.setItem("jwt", response.data.user.token);
      dispatch({ type: LOGIN, payload: response.data });
      history.push("/");
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    });
};

export const signup = (username, email, password) => dispatch => {
  articles
    .post("/users", {
      user: { username, email, password }
    })
    .then(response => {
      localStorage.setItem("jwt", response.data.user.token);
      dispatch({ type: LOGIN, payload: response.data });
      history.push("/");
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: "Invalid Sign up credentials" });
    });
};

export const signout = () => {
  localStorage.removeItem("jwt");
  return {
    type: SIGNOUT
  };
};

export const saveUserSettings = user => dispatch => {
  articles
    .put("/user", { user })
    .then(response => {
      dispatch({ type: SETTINGS_SAVED, payload: user });
      history.push("/");
    })
    .catch(error => {
      //console.log("error", error);
    });
};

export const getUserProfile = () => dispatch => {
  const token = localStorage.getItem("jwt");
  if (token) {
    articles.defaults.headers.common["Authorization"] = `Token ${token}`;
    articles
      .get("/user")
      .then(response => {
        dispatch({ type: APP_LOAD, payload: response.data.user });
      })
      .catch(error => {
        // console.log("error", error);
      });
  }
};

export const fetchArticles = () => async dispatch => {
  const response = await articles.get("/articles?limit=9999");
  dispatch({ type: FETCH_ARTICLES, tab: "all", payload: response.data });
};

export const fetchArticleBySlug = slug => async dispatch => {
  const response = await articles.get(`/articles/${slug}`);
  dispatch({ type: FETCH_ARTICLE, payload: response.data });
};

export const fetchCommentsForArticle = slug => async dispatch => {
  const response = await articles.get(`/articles/${slug}/comments`);
  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const applyTagFilter = (tag, page) => async dispatch => {
  const response = await articles.get(
    `/articles?tag=${encodeURIComponent(tag)}&${limit(10, page)}`
  );
  dispatch({ type: APPLY_TAG_FILTER, tag: tag, payload: response.data });
};

export const getAllTags = () => async dispatch => {
  const response = await articles.get("/tags");
  dispatch({ type: GET_ALL_TAGS, payload: response.data });
};

export const getFeed = () => async dispatch => {
  const response = await articles.get("/articles/feed?limit=9999");
  dispatch({ type: CHANGE_TAB, tab: "feed", payload: response.data });
};

export const createComment = (slug, comment) => dispatch => {
  articles
    .post(`/articles/${slug}/comments`, {
      comment
    })
    .then(response => {
      dispatch({ type: CREATE_COMMENT, payload: response.data });
    })
    .catch(error => {
      //console.log(error);
    });
};

export const deleteComment = (slug, commentId) => dispatch => {
  articles
    .delete(`/articles/${slug}/comments/${commentId}`)
    .then(response => {
      console.log("delete", response);
      dispatch({ type: DELETE_COMMENT, payload: response.data, commentId });
    })
    .catch(error => {
      //console.log(error);
    });
};

export const deleteArticle = slug => dispatch => {
  articles
    .delete(`/articles/${slug}`)
    .then(response => {
      dispatch({ type: DELETE_ARTICLE, payload: response });
      history.push("/");
    })
    .catch(error => {
      //console.log(error);
    });
};

export const createArticle = formData => dispatch => {
  articles
    .post("/articles", { article: formData })
    .then(response => {
      console.log("create", response);
      dispatch({ type: CREATE_ARTICLE, payload: response.data });
      history.push(`/article/${response.data.article.slug}`);
    })
    .catch(error => {
      //console.log(error);
    });
};

export const editArticle = (formData, slug) => dispatch => {
  articles
    .put(`/articles/${slug}`, { article: formData })
    .then(response => {
      dispatch({ type: EDIT_ARTICLE, payload: response.data });
      history.push(`/article/${slug}`);
    })
    .catch(error => {
      //console.log(error);
    });
};

export const onAddTag = tagInput => {
  return {
    type: ADD_TAG,
    payload: tagInput
  };
};

export const onRemoveTag = tag => {
  return {
    type: REMOVE_TAG,
    payload: tag
  };
};

export const setPage = page => {
  return {
    type: SET_PAGE,
    page: page
  };
};
