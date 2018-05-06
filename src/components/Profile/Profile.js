//DISPLAYS THE PROFILE VIEW AND LIST OF ARTICLES THE USER HAS WRITTEN

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleList from '../ArticleList';
import agent from '../../agent';
import EditProfileSettings from './EditProfileSettings';
import FollowUserButton from './FollowUserButton';
import { FOLLOW_USER, PROFILE_PAGE_LOADED, SET_PAGE, UNFOLLOW_USER, PROFILE_PAGE_UNLOADED } from '../../actions/types';

class Profile extends Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        //Requests the profile of the user being viewed.
        agent.Profile.get(this.props.match.params.username),
        //Requests the list of articles written by the user whose profile is being viewed.
        agent.Articles.byAuthor(this.props.match.params.username)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.Articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  //Helper function that renders the tabs My Articles and Favorited Articles
  //This function was made seperate, so that an inheriting class can overwrite it.
  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link active" to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    //Don't render if there is no profile data.
    if (!profile) {
      return null;
    }

    //Checks to see if the profile being viewed is the user's profile
    const isUser = this.props.currentUser && this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" alt="" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {/* Determines if the user should see edit options, or not. */}
                <EditProfileSettings isUser={isUser} />
                {/* Determines if the follow or unfollow button should be rendered. */}
                <FollowUserButton isUser={isUser} user={profile} follow={this.props.onFollow} unfollow={this.props.onUnfollow} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <ArticleList articles={this.props.articles} articlesCount={this.props.articlesCount} currentPage={this.props.currentPage} onSetPage={this.onSetPage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username)
    }),
  //When the page loads, fetch the user's profile data
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
  onUnfollow: username =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username)
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
//Exporting like this allows another component to inherit this class component. The ProfileFavorites script will inherit from this script.
export { Profile, mapStateToProps };
