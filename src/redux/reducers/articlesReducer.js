import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  DELETE_ARTICLE,
  CHANGE_TAB,
  GET_ALL_TAGS,
  APPLY_TAG_FILTER,
  SET_PAGE,
  EDIT_ARTICLE,
  CREATE_ARTICLE,
  ADD_TAG,
  REMOVE_TAG
} from "../actions/types";
import { paginate } from "../../components/utils/paginate";

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        paginatedArticles: paginate(state.articles, state.currentPage, 10),
        tab: action.tab,
        tag: null,
        currentPage: 1
      };

    case FETCH_ARTICLE:
      return {
        ...state,
        article: action.payload.article
      };

    case DELETE_ARTICLE:
      return {
        ...state,
        redirectTo: "/"
      };

    case EDIT_ARTICLE:
      return {
        ...state
      };
    case CREATE_ARTICLE:
      return {
        ...state
      };

    case CHANGE_TAB:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        paginatedArticles: paginate(state.articles, state.currentPage, 10),
        tab: action.tab,
        tag: null,
        currentPage: 1
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page,
        paginatedArticles: paginate(state.articles, state.currentPage, 10)
      };

    case GET_ALL_TAGS:
      return {
        ...state,
        tags: action.payload.tags
      };

    case APPLY_TAG_FILTER:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag
      };

    case ADD_TAG:
      return {
        ...state,
        tagList: (state.tagList || []).concat([action.payload])
      };

    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.payload)
      };

    default:
      return state;
  }
}
