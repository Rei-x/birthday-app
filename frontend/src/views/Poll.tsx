import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import * as Survey from 'survey-react';
import { UserContext } from '../contexts';
import Api from '../api';

const Poll = () => {
  const [context] = useContext(UserContext);

  Survey.StylesManager.applyTheme('bootstrap');
  const surveyJSON = {
    surveyId: '6d935703-26a5-4636-8a3e-e3fce68c5359',
  };
  const surveyPostId = '4b1fab98-8ff1-40c4-ab68-4476919e6901';

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
