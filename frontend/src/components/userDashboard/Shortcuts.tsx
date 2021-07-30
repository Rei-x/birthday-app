import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Shortcuts = () => (
  <Widget>
    <div className="shortcuts__wrapper">
      <h5>Skróty</h5>
      <div className="shortcuts__list">
        <LinkContainer to="/faq">
          <Button className="shortcuts__item shortcuts__item--faq">FAQ</Button>
        </LinkContainer>
        <LinkContainer to="/video">
          <Button className="shortcuts__item shortcuts__item--video">
            Wideo powitalne
          </Button>
        </LinkContainer>
        <LinkContainer to="/guest-list">
          <Button className="shortcuts__item shortcuts__item--guests">
            Lista gości
          </Button>
        </LinkContainer>
      </div>
    </div>
  </Widget>
);

export default Shortcuts;
