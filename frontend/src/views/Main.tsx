import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts';
import { useApi } from '../hooks';

const MainView = () => {
  const [context] = useContext(UserContext);
  const api = useApi();
  const [hasVideo, setHasVideo] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const updateVideoStatus = async () => {
      const result = await api?.checkForVideo();
      setHasVideo(result || false);
    };
    updateVideoStatus();
  }, [api]);

  return (
    <Container>
      {context.user ? (
        <Row className="justify-content-center">
          <Col
            xs={12}
            sm={6}
            className="text-center vertical-center flex-column justify-content-center"
          >
            <div>
              <h1 className="fw-bolder">Hejka {context.user.firstName}</h1>
              {hasVideo && <p>Obejrzyj film poniżej.</p>}
              <Button onClick={() => history.push('/poll')}>Ankieta</Button>
            </div>
          </Col>
          {hasVideo && (
            <Col className="mt-3 mt-5-xs vertical-center flex-column justify-content-center">
              <video playsInline controls width="100%" height="640">
                <source src={api?.getVideoLink()} type="video/mp4" />
              </video>
            </Col>
          )}
        </Row>
      ) : (
        <Redirect to="/pin" />
      )}
    </Container>
  );
};

export default MainView;
