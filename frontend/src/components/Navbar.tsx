import React from 'react';
import {
  Nav, Navbar, NavDropdown, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/18Barka.png';

const Navigation = () => (
  <Navbar variant="dark" bg="dark" expand="lg" className="fixed-top">
    <Container>
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="logo" width="150" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          <Nav.Link as={Link} to="/token">Token</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
