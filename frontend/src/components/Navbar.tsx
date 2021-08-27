import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/18Barka.png';
import { UserContext } from '../contexts';

const Navigation = () => {
  const [context, setContext] = useContext(UserContext);

  const logout = () => {
    if (setContext) {
      setContext((oldContext) => ({
        ...oldContext,
        user: undefined,
        JWT: undefined,
        apiClient: undefined,
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
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" width="150" />
          </Navbar.Brand>
        </LinkContainer>
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
                {context.party && (
                  <LinkContainer to="/music">
                    <Nav.Link>DJ&apos;ka</Nav.Link>
                  </LinkContainer>
                )}
              </>
            )}
          </Nav>
          {context?.user ? (
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/pin">
                <Nav.Link>Zaloguj się</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
