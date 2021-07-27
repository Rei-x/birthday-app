import React, { useContext, useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import ky from 'ky';
import { BASE_URL } from '../../config';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';

interface TokenViewInterface {
  tokenId: string;
}

const TokenView = () => {
  const { tokenId } = useParams<TokenViewInterface>();
  const [context] = useContext(UserContext);
  const api = useApi();
  const [pin, setPin] = useState<Number | undefined>();

  const generatePin = async () => {
    try {
      const { pin: fetchedPin } = (await ky
        .get(`${BASE_URL}/api/redeemToken/${tokenId}`)
        .json()) as any;

      if (fetchedPin === undefined) throw new Error('Invalid redeem token');
      setPin(fetchedPin);
    } catch (e) {
      context.addNotification('Error', 'Tego przycisku można użyć tylko raz!');
    }
  };

  return api ? (
    <Redirect to="/" />
  ) : (
    <Container className="justify-content-center text-center vertical-center">
      <div>
        {pin ? (
          <>
            <h3>
              Twój pin to <b>{pin}</b>
            </h3>
            <p className="text-muted">Zrób sobie screenshota najlepiej.</p>

            <Link to="/pin">Przejdź do strony logowania </Link>
          </>
        ) : (
          <>
            <h3 className="d-block">
              Ten przycisk wygeneruje dla Ciebie unikalny pin.
              <br />
              Lepiej go sobie zapisz.
            </h3>
            <Button onClick={generatePin} className="my-3">
              Wygeneruj pin
            </Button>
            <p className="text-muted">
              Uwaga, możesz użyć tego przycisku tylko <b>raz</b>
            </p>
          </>
        )}
      </div>
    </Container>
  );
};

export default TokenView;
