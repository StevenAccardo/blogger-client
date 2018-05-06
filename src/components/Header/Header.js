//CREATES THE HEADER/NAVBAR FOR THE SITE

import React, { Component } from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav } from 'reactstrap';

import LoggedInView from './loggedInView';
import LoggedOutView from './loggedOutView';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar expand="md">
        <NavbarBrand tag={RRNavLink} to={'/'}>
          Blogger
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto">
            <LoggedOutView currentUser={this.props.currentUser} />
            <LoggedInView currentUser={this.props.currentUser} />
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

{
  /* <nav className="navbar navbar-light">
  <div className="container">
    <NavLink to="/" className="navbar-brand">
      Blogger
    </NavLink>
    <LoggedOutView currentUser={this.props.currentUser} />
    <LoggedInView currentUser={this.props.currentUser} />
  </div>
</nav> */
}

export default Header;
