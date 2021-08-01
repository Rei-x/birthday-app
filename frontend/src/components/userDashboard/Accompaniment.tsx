import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Accompaniment = () => (
  <Widget className="justify-content-center">
    <div className="accompaniment__wrapper">
      <h5>Chcę wziąć osobę towarzyszącą</h5>
      <LinkContainer to="/accompaniment">
        <Button className="accompaniment__button">Wygeneruj zaproszenie</Button>
      </LinkContainer>
    </div>
  </Widget>
);

export default Accompaniment;
