import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar,  NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from "../../media/logo.png";
import "./navbar-view.scss";


export const NavbarView = (props) => {
  const username = props.user.Username;
  console.log(username, props);
  const onLoggedOut = props.onLoggedOut;

  return (
    <Navbar expand="sm" variant="dark" className="loggedin-navbar">
      <Navbar.Brand href="/" className="ml-3">
      <img
          src={Logo}
          crossOrigin="*"
          width='150px'
          alt="myFlix logo"
      />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"  className='mr-3'/>
      <Navbar.Collapse className="ml-3" id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link as={Link} to={`/users/${username}/my-list`}>My List</Nav.Link>
          <NavDropdown title="Profile" id="profile-options">
            <NavDropdown.Item as={Link} to={`/users/${username}`}>My Account</NavDropdown.Item>
            <NavDropdown.Item onClick={onLoggedOut} href="/">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

NavbarView.propTypes = {
  user: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  }).isRequired,
  
  onLoggedOut: PropTypes.func.isRequired
};
