import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loading = () => (
  <Container className="vertical-center">
    <Spinner animation="border" role="status" className="mx-auto">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

export default Loading;
