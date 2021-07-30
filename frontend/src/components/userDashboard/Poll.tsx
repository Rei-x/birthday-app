import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Poll = () => (
  <Widget>
    <div className="d-flex flex-column justify-content-center">
      <h5>WAŻNE: wypełnij ankietę</h5>
    </div>
    <div className="d-flex flex-column justify-content-center">
      <LinkContainer to="/poll">
        <Button>Ankieta</Button>
      </LinkContainer>
    </div>
  </Widget>
);

export default Poll;
