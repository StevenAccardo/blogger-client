//HYDRATES THE REDUX STORE WITH INITIAL DEFAULT VALUES TO AVOID ANY ERRORS
//STORES THE TOKEN AND USER OBJECT IN OUR REDUX STORE, ON THE COMMON PROPERTY.
//WHEN THE APP LOADS WE'RE GOING TO CHECK FOR A CURRENTLY LOGGED-IN USER. THE REDIRECT PROPERTY WILL ALSO DICTATE WHERE TO SEND THEM.

import { APP_LOAD, ARTICLE_SUBMITTED, DELETE_ARTICLE, LOGOUT, REDIRECT, SETTINGS_SAVED, LOGIN, REGISTER } from '../actions/types';

const defaultState = {
  //Holds the token passed back from the server after authentication.
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    //From App.js
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return { ...state, redirectTo: redirectUrl };
    //From ArticleActions.js
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    //After the user has updated their settings, this will redirect them back to the home page, and will update the currentUser property.
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    //Sent from the Settings.js file
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        //If error, don't redirect, otherwise redirect to home route.
        redirectTo: action.error ? null : '/',
        //If no error, assign token to token property
        token: action.error ? null : action.payload.user.token,
        //If no error, assign user to current user property
        currentUser: action.error ? null : action.payload.user
      };
    default:
      return state;
  }
};
