import React, { useContext, useRef, useState } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import { Button, Container, Spinner } from 'react-bootstrap';
import ky from 'ky';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { BASE_URL } from '../../config';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';

interface TokenViewInterface {
  tokenId: string;
}

const TokenView = () => {
  const { tokenId } = useParams<TokenViewInterface>();
  const [context] = useContext(UserContext);
  const [pin, setPin] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const submitButton = useRef(null);

  const generatePin = async () => {
    setLoading(true);
    try {
      const { pin: fetchedPin } = (await ky
        .get(`${BASE_URL}/api/redeemToken/${tokenId}`)
        .json()) as any;

      if (fetchedPin === undefined) throw new Error('Invalid redeem token');
      setPin(fetchedPin);
    } catch (e) {
      context.addNotification('Error', 'Tego przycisku można użyć tylko raz!');
    }
    setLoading(false);
  };

  return api ? (
    <Redirect to="/" />
  ) : (
    <Container className="justify-content-center text-center vertical-center">
      <div>
        <SwitchTransition>
          <CSSTransition
            key={pin ? 'Goodbye, world!' : 'Hello, world!'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
            {pin ? (
              <div>
                <h3>
                  Twój pin to <b>{pin}</b>
                </h3>
                <p className="text-muted">Zrób sobie screenshota najlepiej.</p>

                <Link to="/pin">Przejdź do strony logowania </Link>
              </div>
            ) : (
              <div>
                <h3 className="d-block">
                  Ten przycisk wygeneruje dla Ciebie unikalny pin.
                  <br />
                  Lepiej go sobie zapisz.
                </h3>
                <Button
                  disabled={loading}
                  ref={submitButton}
                  onClick={generatePin}
                  className="my-3"
                >
                  {loading ? <Spinner animation="border" /> : 'Wygeneruj pin'}
                </Button>
                <p className="text-muted">
                  Uwaga, możesz użyć tego przycisku tylko <b>raz</b>
                </p>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </Container>
  );
};

export default TokenView;
