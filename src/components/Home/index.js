//THE MAIN CONTAINER FOR THE LANDING PAGE, ALSO THE PARENT COMPONENT TO THE BANNER AND MAINVIEW

import React, { Component } from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Banner from './Banner';
import MainView from './MainView';
import { APPLY_TAG_FILTER, HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../actions/types';

const Promise = window.Promise;

class Home extends Component {
  componentWillMount() {
    //If user is logged in show their feed, if not, show the global tab instead
    const tab = this.props.token ? 'feed' : 'all';
    //Determines which set of articles to fetch depending on whether the user is logged in or anonymous. No offset for either option.
    const articlesPromise = this.props.token ? agent.Articles.feed() : agent.Articles.all();

    //Fetches all of the tags, and fetches the appropriate articles. Response will be one object after they both have resolved.
    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner token={this.props.token} />
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token
});

//maps the action creators to the Home components's props, so that the action creator can be invoked in the component.
const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, payload }),
  //The payload is the response body from the http request. The action creator then invokes the dispatch method to create an action, which will get sent to the appropriate reducer.
  onLoad: (tab, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
