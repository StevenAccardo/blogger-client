//FIRST COMPONENT CALLED, AND HIGHEST UP IN COMPONENT HEIRARCHY
//RENDERS THE HEADER COMPONENT

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Article from './Article';
import Editor from './Editor';
import Header from './Header/Header';
import Home from './Home';
import Login from './Login';
import Profile from './Profile/Profile';
import ProfileFavorites from './Profile/ProfileFavorites';
import Register from './Register';
import Settings from './Settings';
import agent from '../agent';
import { APP_LOAD, REDIRECT } from '../actions/types';

class App extends Component {
  componentWillMount() {
    //If there is a token in localStorage then the user never signed out.
    //Checks for token calls the setToken function in the agent file.
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    //When the app component is about to load this action creator is called. If there is a token, then an http request is fired to get the user info from the server. Once returned, the action creator fires off an action with the user's info and the token.
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  //Invoked before a component receives new props - Soon to be depreciated!
  componentWillReceiveProps(nextProps) {
    //Checks for a redirctTo property on nextProps
    if (nextProps.redirectTo) {
      //replaces the string on the router property  by the new one that is being receive with the nextProps
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    //If the user data hasn't been fetched yet, don't render the home page. This prevents a race case from happening where the home page loads prior to the response getting pushed to it via props.
    //Once the user's data has been fetched, and the common.js reducer receives the action and changes the appLoaded property to true
    if (this.props.appLoaded) {
      return (
        <div>
          <Header currentUser={this.props.currentUser} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings} />
          <Route path="/article/:id" component={Article} />
          <Route exact path="/@:username" component={Profile} />
          <Route exact path="/@:username/favorites" component={ProfileFavorites} />
          <Route exact path="/editor" component={Editor} />
          <Route path="/editor/:slug" component={Editor} />
        </div>
      );
    }
    //Renders this once the user data has been fetched
    return (
      <div>
        <Header currentUser={this.props.currentUser} />
      </div>
    );
  }
}

//Dictates that the router prop should be an object, and that it is required. If not an object, then a warning will be thrown.
// App.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  //Pulls the redirectTo path
  redirectTo: state.common.redirectTo,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  //Invoked above in the componentWillMount lifecycle, the payload contains the logged in user's data if they are logged in, or null if they aren't. The token is also passed along as well.
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
