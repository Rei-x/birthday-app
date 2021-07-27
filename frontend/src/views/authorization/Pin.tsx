/* eslint-disable jsx-a11y/label-has-associated-control */
import ky from 'ky';
import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';
import { PinInterface } from '../../interfaces';

const PinView = () => {
  const [pin, setPin] = useState<string>('');
  const [context, setContext] = useContext(UserContext);
  const api = useApi();

  const handlePinChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setPin(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const integerPin = parseInt(pin, 10);

    if (!Number.isInteger(integerPin)) {
      context.addNotification('Błąd', 'Pin nie jest liczbą!');
      return;
    }

    if (!setContext) throw new Error("Context wasn't initialized");

    try {
      const response = await ky
        .post('api/pin', { prefixUrl: BASE_URL, json: { pin } })
        .json<PinInterface>();
      const { JWT } = response;
      setContext((oldContext) => ({ ...oldContext, JWT }));
    } catch (e) {
      let error;
      if (e.response?.status === 404) error = 'Zły pin';
      else if (e.response?.status === 500 || e.name === 'TypeError') {
        error = (
          <p>
            Serwer sobie spadł 😔
            <br />
            napisz do Bartosza Gotowskiego
          </p>
        );
      }
      context.addNotification('Błąd', error);
    }
  };

  return api ? (
    <Redirect to="/" />
  ) : (
    <Container className="vertical-center text-center justify-content-center">
      <Form className="p-5" onSubmit={handleSubmit}>
        <h3>Wprowadź pin</h3>
        <div className="form-floating mt-5">
          <Form.Control
            value={pin}
            onChange={handlePinChange}
            name="pin"
            type="password"
            inputMode="numeric"
            maxLength={6}
            id="floatingPin"
            placeholder="Pin"
          />
          <label htmlFor="floatingPin"> Pin </label>
        </div>
        <Button type="submit" className="mt-3">
          Zaloguj się
        </Button>
        <Link className="fs-6 mt-4 d-block text-decoration-none" to="/404">
          Zapomniałem pinu 😭😭
        </Link>
      </Form>
    </Container>
  );
};

export default PinView;
