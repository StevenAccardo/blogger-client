//RENDERS A DELETE BUTTON IF THE USER IS THE AUTHOR OF THE COMMENT

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import agent from '../../agent';
import { DELETE_COMMENT } from '../../actions/types';

const DeleteButton = ({ show, slug, commentId, onClick }) => {
  //Makes an http request to delete the comment from the server, and then calls the action creator to update the store.
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    onClick(payload, commentId);
  };

  //If the user has access to delete the comment...
  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} />
      </span>
    );
  }
  return null;
};

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId })
});

export default withRouter(connect(null, mapDispatchToProps)(DeleteButton));
