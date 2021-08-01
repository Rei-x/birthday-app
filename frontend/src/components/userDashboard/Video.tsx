import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Video = () => (
  <Widget>
    <h5>👋 Obczaj swoje wideo powitalne!</h5>
    <LinkContainer to="/video">
      <Button>Wideo</Button>
    </LinkContainer>
  </Widget>
);

export default Video;
