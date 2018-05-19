//DISPLAYS THE LIST OF COMMENTS FOR THE ARTICLE.

import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, currentUser, slug }) => {
  return (
    <div className="commentList">
      {comments.map(comment => {
        return <Comment comment={comment} currentUser={currentUser} slug={slug} key={comment.id} />;
      })}
    </div>
  );
};

export default CommentList;
