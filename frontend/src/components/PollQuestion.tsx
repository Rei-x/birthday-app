import React, { FormEventHandler } from 'react';
import { Form, Button } from 'react-bootstrap';

interface PropTypes {
  title: string
  options: Array<string>
  onSubmit: FormEventHandler<HTMLFormElement>
}

const PollQuestion = ({ title, options, onSubmit }: PropTypes) => (
  <Form onSubmit={onSubmit} className="d-flex flex-column">
    <h3>{ title }</h3>
    { options.map((option) => <Form.Check type="radio" name="group1" label={option} className="my-2" />)}
    <Button type="submit" className="w-25 mt-3">Dalej</Button>
  </Form>
);

export default PollQuestion;
