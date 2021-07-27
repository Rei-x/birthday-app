import React from 'react';
import { Button } from 'react-bootstrap';
import Widget from './Widget';

const Shortcuts = () => (
  <Widget>
    <div className="shortcuts__wrapper">
      <h5>Skróty</h5>
      <div className="shortcuts__list">
        <Button className="shortcuts__item shortcuts__item--faq">FAQ</Button>
        <Button className="shortcuts__item shortcuts__item--video">
          Wideo powitalne
        </Button>
        <Button className="shortcuts__item shortcuts__item--guests">
          Lista gości
        </Button>
      </div>
    </div>
  </Widget>
);

export default Shortcuts;
