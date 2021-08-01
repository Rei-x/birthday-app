import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/18Barka.png';
import { UserContext } from '../contexts';

const Navigation = () => {
  const [context, setContext] = useContext(UserContext);

  const logout = () => {
    if (setContext) {
      setContext((oldContext) => ({
        addNotification: oldContext.addNotification,
      }));
    }
    localStorage.clear();
  };

  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      bg="dark"
      expand="lg"
      className="fixed-top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {context?.user?.role === 'admin' && (
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            )}
            {context?.user && (
              <>
                <LinkContainer to="/" exact>
                  <Nav.Link>Główny panel</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/faq">
                  <Nav.Link>FAQ</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/guest-list">
                  <Nav.Link>Lista gości</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          {context?.user && (
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
