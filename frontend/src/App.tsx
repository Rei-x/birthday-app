import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import Navbar from './components/Navbar';
import './app.scss';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={6} className="mt-3 text-center">
            <h1 className="fw-bolder">Hejka Karol!</h1>
            <p>Obejrzyj film poniżej.</p>
            <p />
            <Button>Hello</Button>
          </Col>
          <Col className="mt-3 mt-5-xs justify-content-center d-flex">
            <video controls width="480" height="640">
              <source src="http://localhost:4000/api/video/123" type="video/mp4" />
            </video>

            <iframe title="Karol" src="https://drive.google.com/file/d/1Yxu6_wOYgO8oekURvTI9H8jh023nJnVr/preview" width="480" height="640" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
