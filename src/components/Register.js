import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import ListErrors from './ListErrors';

import { REGISTER, REGISTER_PAGE_UNLOADED } from '../actions/types';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };

    //Since these are added in the constructor, the methods will be added to the Register class when the component is initialized
    this.changeUsername = ev => {
      this.setState({ username: ev.target.value });
    };

    this.changeEmail = ev => {
      this.setState({ email: ev.target.value });
    };

    this.changePassword = ev => {
      this.setState({ password: ev.target.value });
    };
    this.submitForm = ({ username, email, password }) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.submitForm(this.state)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="text" placeholder="Username" value={this.state.username} onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" value={this.state.password} onChange={this.changePassword} />
                  </fieldset>

                  {/* The disabled attribute will stop the user from being able to submit the form while the login flow is happening. */}
                  <button className="btn btn-lg pull-xs-right" type="submit" disabled={this.props.inProgess}>
                    Sign Up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Not sure why the spread opertator is being used here to get the auth, why not auth: auth, or just auth. Time will tell?
const mapStateToProps = state => ({ ...state.auth });

//Creates 3 different action creators
const mapDispatchToProps = dispatch => ({
  //This one initiates the post request, and the response from the promise is then sent to the auth.js reducer.
  onSubmit: (username, email, password) => dispatch({ type: REGISTER, payload: agent.Auth.register(username, email, password) }),
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
