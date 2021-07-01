import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ky from 'ky';
import {
  BrowserView, mobileVendor, mobileModel, MobileView,
} from 'react-device-detect';
import { FaMobile } from 'react-icons/fa';
import { BASE_URL } from '../config';
import { UserContext } from '../contexts';

interface TokenViewInterface {
  tokenId: string
}

const TokenView = () => {
  const { tokenId } = useParams<TokenViewInterface>();
  const [, setContext] = useContext(UserContext);
  const history = useHistory();

  const getJWTToken = async () => {
    try {
      const { token } = await ky.get(`${BASE_URL}/api/redeemToken/${tokenId}`).json();
      localStorage.setItem('JWT', token);

      if (!setContext) throw new Error('Context wasn\'t initialized');
      setContext({ JWT: token });

      history.push('/');
    } catch (e) {
      history.push('/');
    }
  };

  return (
    <Container className="justify-content-center text-center vertical-center">
      <BrowserView>
        <h3>
          Musisz wejść na tą stronę używając swojego telefonu,
          później się dowiesz o co chodzi 😉
        </h3>
        <FaMobile size={100} className="mt-3" />
      </BrowserView>
      <MobileView>
        <h3>
          Uwaga, możesz użyć tego przycisku tylko
          {' '}
          <b>raz</b>
          ,
          przypisze on konto do urządzenia, na którym teraz jesteś, czyli:
        </h3>
        <h2 className="fw-bold">
          {mobileVendor}
          {' '}
          {mobileModel}
        </h2>
        <Button onClick={getJWTToken}>Zaloguj się</Button>
      </MobileView>

    </Container>
  );
};

export default TokenView;
