import React from 'react';
import { Nav, Navbar,  NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarView = ({onLoggedOut}) => {
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand>
          <Link to="/">MyFlix App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/users/:username/my-list">My List</Nav.Link>
          <NavDropdown title="Profile" id="profile-options">
            <NavDropdown.Item href="/users/:username/my-account">My Account</NavDropdown.Item>
            <NavDropdown.Item onClick={onLoggedOut} href="/">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
  )
}
