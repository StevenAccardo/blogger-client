//SHOWS A DIFFERENT HEADER IF USER IS LOGGED IN
import React from 'react';
import { Link } from 'react-router-dom';

const LoggedInView = props => {
  //If user is logged in, then the currentUser property would have been populated with the user's data
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {/* New Post Link */}
        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </Link>
        </li>

        {/* Settings Link */}
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />&nbsp;Settings
          </Link>
        </li>

        {/* User Profile Link */}
        <li className="nav-item">
          <Link to={`/@${props.currentUser.username}`} className="nav-link">
            <img src={props.currentUser.image} className="user-pic mr-2 rounded-circle" alt="" />
            {props.currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

export default LoggedInView;
