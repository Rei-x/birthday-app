import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Survey from 'survey-react';
import { UserContext } from '../../contexts';
import Api from '../../api';
import { useApi } from '../../hooks';

const SurveyView = () => {
  const [context, setContext] = useContext(UserContext);
  const api = useApi();

  Survey.StylesManager.applyTheme('bootstrap');
  const surveyJSON = {
    surveyId: '42e2fcc0-ab20-45a0-9f89-a65bf52b4887',
  };
  const surveyPostId = '85709f18-fc85-4033-8a40-c8464baec18b';

  const survey = new Survey.Model(surveyJSON);

  survey.setValue('user', context.user?._id);
  survey.locale = 'pl';
  survey.onComplete.add(async (sender) => {
    Api.sendSurvey(surveyPostId, sender.data);

    const formData = new FormData();
    formData.append('hasCompletedPoll', 'true');
    const success = await api?.updateUser(formData);

    context.addNotification(
      'Ankieta',
      success
        ? 'Udało się zapisać twoje odpowiedzi!'
        : 'Z jakiegoś powodu nie udało się zapisać twoich odpowiedzi :('
    );

    if (setContext)
      setContext((oldContext) => {
        if (oldContext.user)
          return {
            ...oldContext,
            user: {
              ...oldContext.user,
              hasCompletedPoll: success || false,
            },
          };
        return oldContext;
      });
  });

  return (
    <>
      <Container className="vertical-center justify-content-center">
        <Row className="justify-content-center" lg={2}>
          <Col>
            <h5 className="mb-4 text-center">
              Ankiete musisz wypełnić <b>do końca</b>, aż zobaczysz tekst
              &quot;Dziękuję za wypełnienie ankiety&quot;, inaczej twoje
              odpowiedzi się <b>nie zapiszą</b>.
            </h5>
            <Survey.Survey model={survey} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SurveyView;
