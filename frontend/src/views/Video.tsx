import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useApi } from '../hooks';

const Video = () => {
  const api = useApi();
  const history = useHistory();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mt-3 mt-5-xs vertical-center flex-column justify-content-center">
          <video
            playsInline
            controls
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            width="360"
            height="640"
            poster="https://i.imgur.com/XVPLOg3.png"
          >
            <source src={api?.getVideoLink()} type="video/mp4" />
          </video>
          <Button onClick={() => history.push('/')} className="mt-3">
            Przejdź do głównego panelu
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Video;
