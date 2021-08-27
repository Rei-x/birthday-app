import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Music = () => (
  <Widget>
    <h5>Muzyka 🎶</h5>
    <LinkContainer to="/music">
      <Button>I&apos;m DJ</Button>
    </LinkContainer>
  </Widget>
);

export default Music;
