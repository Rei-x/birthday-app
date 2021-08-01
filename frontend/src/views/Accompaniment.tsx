import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Accompaniment = () => (
  <Container>
    <Row className="vertical-center text-center flex-column justify-content-center">
      <h1>Sorki, ale nic tu nie ma 😕</h1>
      <p className="text-muted">
        Yyy.. tu miał być formularz do tworzenia zaproszenia, ale byłem zbyt
        leniwy, żeby go napisać XD.
      </p>
      <p className="text-muted">
        Napisz do mnie na messengerze to coś ogarniemy.
      </p>
      <Link to="/">Wróć do panelu głównego</Link>
    </Row>
  </Container>
);

export default Accompaniment;
