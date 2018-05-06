//RENDERS THE SIGNIN VIEW

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import agent from '../agent';
import ListErrors from './ListErrors';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../actions/types';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    //Since these are added in the constructor, the methods will be added to the Login class when the component is initialized
    this.changeEmail = ev => {
      this.setState({ email: ev.target.value });
    };

    this.changePassword = ev => {
      this.setState({ password: ev.target.value });
    };

    this.submitForm = ({ email, password }) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
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
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              {/* If there are any errors returned from the onSubmit eventhandler chain, then they will be displayed here. */}
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.submitForm(this.state)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" value={this.state.password} onChange={this.changePassword} />
                  </fieldset>

                  {/* The disabled attribute will stop the user from being able to submit the form while the login flow is happening. */}
                  <button className="btn btn-lg pull-xs-right" type="submit" disabled={this.props.inProgess}>
                    Sign in
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

const mapDispatchToProps = dispatch => ({
  //The resolved promise response will be the user's information, as well as the jwt token. The user will also be redierected to the the home screen.
  onSubmit: (email, password) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
