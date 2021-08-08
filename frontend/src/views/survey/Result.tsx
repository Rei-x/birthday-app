import React, { useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import * as Survey from 'survey-react';
import Api from '../../api';
import { Loading } from '../../components';
import { useApi } from '../../hooks';

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [surveyModel, setSurveyModel] = useState<
    Survey.ReactSurveyModel | undefined
  >();
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const surveyResults = await api?.getSurveyResult(api.user._id);

      Survey.StylesManager.applyTheme('bootstrap');

      const surveyId = '42e2fcc0-ab20-45a0-9f89-a65bf52b4887';
      const surveyJSON = await Api.getSurvey(surveyId);

      const survey = new Survey.Model(surveyJSON);
      survey.mode = 'display';

      if (surveyResults) survey.data = surveyResults?.Data[0];

      setSurveyModel(survey);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return loading ? (
    <Loading />
  ) : (
    <Container className="vertical-center justify-content-center">
      <Col className="justify-content-center" lg={6}>
        <h5 className="text-center">
          Postaram się na dniach dać możliwość edycji ankiety 🤠
        </h5>
        <Survey.Survey model={surveyModel} />
      </Col>
    </Container>
  );
};

export default Result;
