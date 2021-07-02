import React, { useContext } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { UserContext } from '../contexts';

const MainView = () => {
  const [context] = useContext(UserContext);
  return (
    <Container>
      { context.user ? (
        <Row className="justify-content-center">
          <Col xs={12} sm={6} className="text-center vertical-center flex-column justify-content-center">
            <div>
              <h1 className="fw-bolder">Hejka Karol!</h1>
              <p>Obejrzyj film poniżej.</p>
              <Button>Hello</Button>
            </div>
          </Col>
          <Col className="mt-3 mt-5-xs justify-content-center d-flex">
            <video controls width="480" height="640">
              <source src="http://localhost:4000/api/video/123" type="video/mp4" />
            </video>
          </Col>
        </Row>
      ) : (
        <Row className="vertical-center text-center flex-column justify-content-center">
          <h1>Sorki, ale nic tu nie ma 😕</h1>
          <p className="text-muted">Jeśli jednak powinno coś tu być to napisz do Bartosza Gotowskiego na messengerze.</p>
        </Row>
      )}

    </Container>
  );
};

export default MainView;
