import { combineReducers } from "redux";
import articlesReducer from "./articlesReducer";
import authReducer from "./authReducer";
import settingsReducer from "./settingsReducer";
import commentsReducer from "./commentsReducer";
import profileReducer from "./profileReducer";

const rootRducer = combineReducers({
  articles: articlesReducer,
  auth: authReducer,
  settings: settingsReducer,
  comments: commentsReducer,
  profile: profileReducer
});

export default rootRducer;
