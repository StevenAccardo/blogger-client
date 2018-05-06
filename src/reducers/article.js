import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED, ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        //If no errors, the comment property will be updated by adding the comment to the end of the already existing comments, or to an empty array if it is the first comment. This allows the comment list to update as the user views that same article.
        comments: action.error ? null : (state.comments || []).concat([action.payload.comment])
      };
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };
    case ARTICLE_PAGE_UNLOADED:
      return {};
    case DELETE_COMMENT:
      const commentId = action.commentId;
      return {
        ...state,
        //filter() method creates a new array that includes all indexes except the one that matches the newly deleted commentId.
        comments: state.comments.filter(comment => comment.id !== commentId)
      };
    default:
      return state;
  }
};
