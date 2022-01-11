import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from "../../media/logo.png";
import "./navbar-view-login.scss";

export const NavbarViewLogin = () => {
  
  return (
    <Navbar className='login-navbar'>
      <Navbar.Brand href="/" className="ml-3">
      <img
          src={Logo}
          crossOrigin="*"
          width='150px'
          alt="myFlix logo"
      />
      </Navbar.Brand>
    </Navbar>
  )
}