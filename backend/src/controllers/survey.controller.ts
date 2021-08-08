import { Request, Response } from 'express';
import fetch from 'node-fetch';
import config from '../config';

const list = async (_req: Request, res: Response) => {
  const url =
    'https://api.surveyjs.io' +
    `/private/Surveys/getSurveyResults/${config.POLL_ID}` +
    `?accessKey=${config.POLL_ACCESS_KEY}`;
  const pollResult = await (await fetch(url)).json();

  res.json(pollResult);
};

const one = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const url =
    'https://api.surveyjs.io' +
    `/private/Surveys/getSurveyResults/${config.POLL_ID}` +
    `?accessKey=${config.POLL_ACCESS_KEY}`;
  const pollResult = await (await fetch(url)).json();

  const pollData = pollResult.Data.find(
    (answer: { user?: string }) => answer.user === userId
  );

  const response = {
    ResultCount: 1,
    Data: [ pollData ]
  }

  res.json(response);
};

export default { list, one };
