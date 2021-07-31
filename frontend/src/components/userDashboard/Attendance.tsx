import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Widget from './Widget';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';

const Attendance = () => {
  const [context, setContext] = useContext(UserContext);
  const [attendance, setAttendance] = useState(
    context?.user?.hasConfirmedAttendance || false
  );
  const api = useApi();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const answer = e.target.value === 'yes';
    setAttendance(answer);

    const formData = new FormData();
    formData.append('hasConfirmedAttendance', answer.toString());

    const success = await api?.updateUser(formData);

    context.addNotification(
      'Uczestnictwo',
      success
        ? 'Zaktualizowano status twojej obecności na imprezie.'
        : 'Z jakiegoś powodu nie udało się zaktualizować statusu twojej obecności.'
    );

    if (setContext)
      setContext((oldContext) => {
        if (oldContext.user)
          return {
            ...oldContext,
            user: {
              ...oldContext.user,
              hasConfirmedAttendance: answer,
            },
          };
        return oldContext;
      });
  };

  return (
    <Widget>
      <div>
        <h5>Będziesz?</h5>
        <p className="text-muted">daj znać do 10.08.2021</p>
      </div>
      <Form className="me-3">
        <Form.Check
          label="Tak"
          name="attendancexd"
          type="radio"
          value="yes"
          checked={attendance}
          onChange={handleChange}
        />
        <Form.Check
          label="Nie"
          name="attendancexd"
          type="radio"
          value="no"
          checked={!attendance}
          onChange={handleChange}
        />
      </Form>
    </Widget>
  );
};

export default Attendance;
