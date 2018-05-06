//A COMPONENT FOR SHOWING THE ARTICLES THAT ARE FAVORITED BY THE OWNER OF THE PROFILE, INHERITS FROM THE PROFILE CLASS

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../../agent';
//Inherits the Profile class and the mapStateToProps from the profile class.
import { Profile, mapStateToProps } from './Profile';
import { FOLLOW_USER, PROFILE_FAVORITES_PAGE_LOADED, SET_PAGE, UNFOLLOW_USER, PROFILE_FAVORITES_PAGE_UNLOADED } from '../../actions/types';

//Extends the profile component
class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(Promise.all([agent.Profile.get(this.props.match.params.username), agent.Articles.favoritedBy(this.props.match.params.username)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.Articles.favoritedBy(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  //Overwrote this function because we have now moved the active class to the favorites tab instead of the My articles tab, as it was in the profile component
  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link" to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username)
    }),
  onLoad: payload => dispatch({ type: PROFILE_FAVORITES_PAGE_LOADED, payload }),
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
  onUnfollow: username =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username)
    }),
  onUnload: () => dispatch({ type: PROFILE_FAVORITES_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites));
