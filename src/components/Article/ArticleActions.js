//CALLED BY THE ARTICLEMETA.JS FILE. POPULATES THE ARTICLE EDIT AND DELETE BUTTONS OF THE ARTICLE VIEW.

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../actions/types';

const ArticleActions = ({ article, onClickDelete, canModify }) => {
  //Gets called when user clicks the Delete Article button.
  const del = () => {
    //Calls the action creator and starts the http request to delete the article from the server
    //Action redirects user to home page after article has been deleted.
    onClickDelete(agent.Articles.del(article.slug));
  };
  //If the user authored the article, then the edit and delete buttons will be displayed.
  if (canModify) {
    return (
      <span>
        <Link to={`/editor/${article.slug}`} className="edit-button btn btn-outline btn-sm">
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="delete-button btn btn-outline btn-sm ml-2" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  //If the user does not have access to edit or delete the article, then this span will be displayed instead.
  return <span />;
};

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: DELETE_ARTICLE, payload })
});

export default withRouter(connect(null, mapDispatchToProps)(ArticleActions));
