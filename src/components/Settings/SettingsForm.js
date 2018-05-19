//RENDERS THE FORM FOR EDITING THE USER'S SETUP

import React, { Component } from 'react';

class SettingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      //Creates a new Object with the first arg as a target.State, will be the first source, and then the third argument will be the second source. Later sources overwrite properties with the same name on earlier sources, so if field were to be username, then it's value would overwrite the current value in the state.
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      //Deletes the password property if the user didn't update it, that way we don't accidently update the user's password to an empty string on the database.
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    //Checks to see if we have a current user that is logged in. If so, then we will initialize our component level state with the user's information.
    if (this.props.currentUser) {
      this.setState(
        Object.assign(this.state, {
          image: this.props.currentUser.image || '',
          username: this.props.currentUser.username,
          bio: this.props.currentUser.bio || '',
          email: this.props.currentUser.email
        })
      );
    }
  }

  render() {
    return (
      <form className="settingsForm" onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input className="form-control settingsForm__input" type="text" placeholder="URL of profile picture" value={this.state.image} onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input className="form-control form-control-lg settingsForm__input" type="text" placeholder="Username" value={this.state.username} onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea className="form-control form-control-lg settingsForm__textarea" rows="8" placeholder="Short bio about you" value={this.state.bio} onChange={this.updateState('bio')} />
          </fieldset>

          <fieldset className="form-group">
            <input className="form-control form-control-lg settingsForm__input" type="email" placeholder="Email" value={this.state.email} onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input className="form-control form-control-lg settingsForm__input" type="password" placeholder="New Password" value={this.state.password} onChange={this.updateState('password')} />
          </fieldset>

          <button className="settingsForm__button btn btn-lg" type="submit" disabled={this.state.inProgress}>
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
}

export default SettingsForm;
