import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Thanks = () => (
  <Container className="vertical-center justify-content-center text-center">
    <div>
      <h2>Dziękuję za wypełnienie ankiety!</h2>
      <LinkContainer to="/">
        <Button className="mt-2">Przejdź do panelu głównego</Button>
      </LinkContainer>
    </div>
  </Container>
);

export default Thanks;
