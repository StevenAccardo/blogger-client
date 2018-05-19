//RENDERS EACH INDIVIDUAL COMMENT

import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Comment = ({ comment, currentUser, slug }) => {
  //Determines whether the user is the author of the comment, which would allow them to delete it.
  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <div className="card mb-3 comment">
      <div className="comment__card-block card-block">
        <p className="comment__card-text card-text p-4">{comment.body}</p>
      </div>
      <div className="comment__card-footer card-footer">
        <Link to={`/@${comment.author.username}`}>
          <img src={comment.author.image} className="comment__card-footer__avatar" alt="" />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment__card-footer__author">
          {comment.author.username}
        </Link>
        <span className="comment__card-footer__date">{new Date(comment.createdAt).toDateString()}</span>
        <DeleteButton show={show} slug={slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
