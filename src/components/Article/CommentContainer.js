//HOLDS ALL OF THE COMMENT VIEW RELATED CODE. ALSO DETERMINES WHAT TO SHOW ABOVE THE COMMENTLIST DEPENDING ON WHETHER THE USER IS LOGGED IN, OR NOT.

import React from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

const CommentContainer = props => {
  //If a user is logged in.

  const checkAuth = () => {
    if (props.currentUser) {
      return (
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>
      );
    } else {
      return (
        <div className="commentView__noAuth">
          <Link className="commentView__noAuth__signIn" to="/login">
            Sign in
          </Link>
          &nbsp;or&nbsp;
          <Link className="commentView__noAuth__register" to="/register">
            sign up
          </Link>
          &nbsp;to add comments on this article.
        </div>
      );
    }
  };

  return (
    <div className="commentView col-xs-12 col-md-8 offset-md-2 mb-5">
      {checkAuth()}
      <CommentList comments={props.comments} slug={props.slug} currentUser={props.currentUser} />
    </div>
  );
};

export default CommentContainer;
