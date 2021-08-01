import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as Survey from 'survey-react';
import { UserContext } from '../../contexts';
import Api from '../../api';
import { useApi } from '../../hooks';

const Poll = () => {
  const [context, setContext] = useContext(UserContext);
  const api = useApi();

  Survey.StylesManager.applyTheme('bootstrap');
  const surveyJSON = {
    surveyId: '6d935703-26a5-4636-8a3e-e3fce68c5359',
  };
  const surveyPostId = '4b1fab98-8ff1-40c4-ab68-4476919e6901';

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

export default Poll;
