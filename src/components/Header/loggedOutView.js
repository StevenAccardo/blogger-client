//SHOWS A DIFFERENT HEADER IF USER IS LOGGED OUT

import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link nav-item__nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link nav-item__nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link nav-item__nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

export default LoggedOutView;
