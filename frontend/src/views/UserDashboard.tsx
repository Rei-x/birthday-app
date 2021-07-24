import React, { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Avatar, Widget } from '../components';
import { UserContext } from '../contexts';
import { UserInterface } from '../interfaces';

const UserDashboard = () => {
  const [context] = useContext(UserContext);
  const user = context.user as UserInterface;

  const avatarUrl =
    'https://robohash.org/60d26ee9c88916cd6a86c27ca987ce53?set=set4&bgset=bg2&size=400x400';

  return (
    <Container style={{ marginTop: '100px' }}>
      <div className="d-flex ms-3 mb-5">
        <Avatar url={avatarUrl} />
        <h2 className="ms-3" style={{ marginTop: '10px' }}>
          Hej <b>{user.firstName}!</b>
        </h2>
      </div>
      <Widget className="weather">
        <div>
          <h5>Pogoda</h5>
          <p className="text-muted">dnia osiemnastki</p>
        </div>
        <div className="d-flex">
          <img
            src="https://openweathermap.org/img/w/01d.png"
            alt="weather icon"
          />
          <p className="weather__temperature">17°C</p>
        </div>
      </Widget>
      <Widget className="time-remaining">
        <div>
          <h5>Zostało jeszcze</h5>
        </div>
        <div>
          <p>3:12:20:34</p>
        </div>
      </Widget>
      <Widget>
        <div className="vodka__wrapper">
          <h5>Najlepsza wóda</h5>
          <Form className="vodka__form">
            <div className="vodka__grid">
              {[
                'Soplica',
                'Żubrówka',
                'Stock',
                'Żytniówka B)',
                'Finlandia',
              ].map((name: string) => (
                <Form.Check
                  key={name}
                  type="radio"
                  label={name}
                  id={name}
                  name="wóda"
                />
              ))}
              <Form.Check type="radio" label="Inna" id="inna" name="wóda" />
            </div>
            <Button type="submit" className="vodka__submit">
              Zagłosuj
            </Button>
          </Form>
        </div>
      </Widget>
      <Widget>
        <div className="accompaniment__wrapper">
          <h5>Chcę wziąć osobę towarzyszącą</h5>
          <Button className="accompaniment__button">
            Wygeneruj zaproszenie
          </Button>
        </div>
      </Widget>
      <Widget>
        <div className="shortcuts__wrapper">
          <h5>Skróty</h5>
          <div className="shortcuts__list">
            <Button className="shortcuts__item shortcuts__item--faq">
              FAQ
            </Button>
            <Button className="shortcuts__item shortcuts__item--video">
              Wideo powitalne
            </Button>
            <Button className="shortcuts__item shortcuts__item--guests">
              Lista gości
            </Button>
          </div>
        </div>
      </Widget>
    </Container>
  );
};

export default UserDashboard;
