import React from 'react';
import { Nav, Navbar,  NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarView = () => {
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
          <Nav.Link href="/my-list">My List</Nav.Link>
          <NavDropdown title="Profile" id="profile-options">
            <NavDropdown.Item>
              <Link to="/users/:username/my-account">My Account</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/">Logout</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
  )
}
