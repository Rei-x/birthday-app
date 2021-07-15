import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import * as Survey from 'survey-react';
import { UserContext } from '../contexts';
import Api from '../api';

const Poll = () => {
  const [context] = useContext(UserContext);

  Survey.StylesManager.applyTheme('bootstrap');
  const surveyJSON = {
    surveyId: '6fd897dd-031f-4117-a35b-e165bd8239c0',
  };
  const surveyPostId = '0f07986e-17f4-4a9e-a703-821b1e229512';

  const survey = new Survey.Model(surveyJSON);

  survey.setValue('user', context.user?._id);

  survey.onComplete.add((sender) => {
    Api.sendSurvey(surveyPostId, sender.data);
  });

  return (
    <Container className="vertical-center justify-content-center">
      <Survey.Survey model={survey} />
    </Container>
  );
};

export default Poll;
