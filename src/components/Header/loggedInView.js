//SHOWS A DIFFERENT HEADER IF USER IS LOGGED IN
import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import { NavLink, NavItem } from 'reactstrap';

const LoggedInView = props => {
  //If user is logged in, then the currentUser property would have been populated with the user's data
  if (props.currentUser) {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink tag={RRNavLink} to="/" className="nav-item__nav-link">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/editor" className="nav-item__nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/settings" className="nav-item__nav-link">
            <i className="ion-gear-a" />&nbsp;Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to={`/@${props.currentUser.username}`} className="nav-item__nav-link">
            <img src={props.currentUser.image} className="nav-item__user-pic mr-2 rounded-circle" alt="" />
            {props.currentUser.username}
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  }

  return null;
};

export default LoggedInView;
