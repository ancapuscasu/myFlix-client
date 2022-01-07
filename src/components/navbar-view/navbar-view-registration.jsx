import React from 'react';
import { Nav, Navbar,  NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from "../../media/logo.png";
import "./navbar-view-registration.scss";

export const NavbarViewRegistration = () => {
  
  return (
    <Navbar className='registration-navbar'>
      <Navbar.Brand href="#home" className="ml-3">
        <img
            src={Logo}
            crossOrigin="*"
            width='150px'
            alt="myFlix logo"
        />
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/' id="signin">Sign In</Nav.Link>
      </Nav>
    </Navbar>
  )
}
