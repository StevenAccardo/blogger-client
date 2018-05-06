//ALLOWS THE USER TO LOGOUT AND EDIT THEIR PROFILE INFORMATION

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import SettingsForm from './SettingsForm';
import { LOGOUT, SETTINGS_SAVED } from '../actions/types';

const Settings = props => {
  const onClickLogout = () => {
    window.localStorage.removeItem('jwt');
    props.onLogout();
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <ListErrors errors={props.errors} />
            <SettingsForm currentUser={props.currentUser} onSubmitForm={props.onSubmitForm} />
            <hr />
            <button className="logout-button btn btn-outline" onClick={onClickLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  //Redireects user to the homepage, removes the token, and removes the currentUser info from the Store
  onLogout: () => dispatch({ type: LOGOUT }),
  //Redirects to the homepage and updates the currentUser data to reflect the changes.
  onSubmitForm: user => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
