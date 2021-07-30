import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Widget from './Widget';
import { UserContext } from '../../contexts';

const Attendance = () => {
  const [context] = useContext(UserContext);
  const [attendance, setAttendance] = useState(
    context?.user?.hasConfirmedAttendance || false
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAttendance(e.target.value === 'yes');
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
          id="attendance-yes"
          value="yes"
          checked={attendance}
          onChange={handleChange}
        />
        <Form.Check
          label="Nie"
          name="attendancexd"
          type="radio"
          id="attendance-no"
          value="no"
          checked={!attendance}
          onChange={handleChange}
        />
      </Form>
    </Widget>
  );
};

export default Attendance;
