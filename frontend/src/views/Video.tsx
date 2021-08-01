import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../components';
import { useApi } from '../hooks';

const Video = () => {
  const [hasVideo, setHasVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('hasWatchedVideo', 'true');
    const checkForVideo = async () => {
      setLoading(true);
      setHasVideo((await api?.checkForVideo()) || false);
      setLoading(false);
    };
    checkForVideo();
  }, [api]);

  // eslint-disable-next-line no-nested-ternary
  return loading ? (
    <Loading />
  ) : hasVideo ? (
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
  ) : (
    <Container className="justify-content-center text-center vertical-center">
      <div>
        <h3>
          Hmm, za jakiegoś powodu nie przygotowałem dla Ciebie wideo powitalnego
          🧐
        </h3>
        <p className="text-muted">
          Jeśli nie jesteś czyjąś osobą towarzyszącą to napisz do mnie na
          messengerze.
        </p>
        <Link to="/">Wróć do panelu głównego</Link>
      </div>
    </Container>
  );
};

export default Video;
