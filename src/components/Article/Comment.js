//RENDERS EACH INDIVIDUAL COMMENT

import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Comment = ({ comment, currentUser, slug }) => {
  //Determines whether the user is the author of the comment, which would allow them to delete it.
  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <div className="card mb-3 comment">
      <div className="card-block">
        <p className="card-text p-4">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt="" />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
        <DeleteButton show={show} slug={slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
