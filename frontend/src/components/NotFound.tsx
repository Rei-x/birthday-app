import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Row className="vertical-center text-center flex-column justify-content-center">
    <h1>Sorki, ale nic tu nie ma 😕</h1>
    <p className="text-muted">
      Jeśli jednak powinno coś tu być to napisz do Bartosza Gotowskiego na
      messengerze.
    </p>
    <Link to="/">Wróć do panelu głównego</Link>
  </Row>
);

export default NotFound;
