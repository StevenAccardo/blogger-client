//HOLDS ALL OF THE COMMENT VIEW RELATED CODE. ALSO DETERMINES WHAT TO SHOW ABOVE THE COMMENTLIST DEPENDING ON WHETHER THE USER IS LOGGED IN, OR NOT.

import React from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

const CommentContainer = props => {
  //If a user is logged in.
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2 mb-5">
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList comments={props.comments} slug={props.slug} currentUser={props.currentUser} />
      </div>
    );
  } else {
    return (
      <div className="no-auth-comment-view col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList comments={props.comments} slug={props.slug} currentUser={props.currentUser} />
      </div>
    );
  }
};

export default CommentContainer;
