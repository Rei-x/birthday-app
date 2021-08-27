import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Loading } from '../components';
import { UserContext } from '../contexts';
import { useApi } from '../hooks';

const Music = () => {
  const [context] = useContext(UserContext);
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [musicURL, setMusicURL] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      if (!api) return;
      try {
        const url = await api?.getMusicURL();
        if (!url) throw new Error('URL is empty');
        setMusicURL(url);
      } catch (e) {
        context.addNotification(
          'Lipa 😥',
          'Coś nie działa niestety, skontaktuj się z Bartoszem Gotowskim.'
        );
        history.push('/');
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return loading ? (
    <Loading />
  ) : (
    <Container className="navbar-margin d-flex d-column justify-content-center">
      <iframe
        className="d-block"
        title="festify"
        src={musicURL}
        height="600px"
        width="400px"
      />
    </Container>
  );
};

export default Music;
