import React from 'react';
import { Button } from 'react-bootstrap';
import Widget from './Widget';

const Accompaniment = () => (
  <Widget>
    <div className="accompaniment__wrapper">
      <h5>Chcę wziąć osobę towarzyszącą</h5>
      <Button className="accompaniment__button">Wygeneruj zaproszenie</Button>
    </div>
  </Widget>
);

export default Accompaniment;
