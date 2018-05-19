//WHERE NEW COMMENTS ARE CREATED.

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import agent from '../../agent';
import { ADD_COMMENT } from '../../actions/types';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };

    //As the user types, events are triggered for each key stroke, those characters are then updated on the body property, and passed into the textarea below as a value. This is a controlled component.
    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    //invoked when the form is submitted
    this.createComment = ev => {
      ev.preventDefault();
      //Makes the http post request to push the comment onto the server
      const payload = agent.Comments.create(this.props.slug, { body: this.state.body });
      //Resets the component level state
      this.setState({ body: '' });
      //Calls the action creator with the server response.
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card commentInput" onSubmit={this.createComment}>
        <div className="commentInput__card-block card-block">
          <textarea className="commentInput__card-block__textarea form-control" placeholder="Write a comment..." value={this.state.body} onChange={this.setBody} rows="3" />
        </div>
        <div className="commentInput__card-footer card-footer">
          <img src={this.props.currentUser.image} className="commentInput__card-footer__avatar" alt="" />
          <button className="commentInput__card-footer__btn btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: ADD_COMMENT, payload })
});

export default withRouter(connect(null, mapDispatchToProps)(CommentInput));
