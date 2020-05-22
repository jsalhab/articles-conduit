import {
  CREATE_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT
} from "../actions/types";

export default function commentsReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload.comment])
      };

    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments
      };
    case DELETE_COMMENT:
      const commentId = action.commentId;
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== commentId
        )
      };
    default:
      return state;
  }
}
