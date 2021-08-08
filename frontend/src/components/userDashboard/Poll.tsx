import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Widget from './Widget';

const Result = () => (
  <Widget>
    <div className="d-flex flex-column justify-content-center">
      <h5>Twoje odpowiedzi z ankiety 🤠</h5>
    </div>
    <div className="d-flex flex-column justify-content-center">
      <LinkContainer to="/survey/result">
        <Button>Odpowiedzi</Button>
      </LinkContainer>
    </div>
  </Widget>
);

const Survey = () => (
  <Widget>
    <div className="d-flex flex-column justify-content-center">
      <h5>❗ WAŻNE ❗ -&gt; wypełnij ankietę</h5>
    </div>
    <div className="d-flex flex-column justify-content-center">
      <LinkContainer to="/survey">
        <Button>Ankieta</Button>
      </LinkContainer>
    </div>
  </Widget>
);

const SurveyWidget = {
  Survey,
  Result,
};

export default SurveyWidget;
