import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Widget from './Widget';

const VodkaPoll = () => {
  const [choice, setChoice] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Widget>
      <div className="vodka__wrapper">
        <h5>Najlepsza wóda to {choice}</h5>
        <Form onSubmit={handleSubmit} className="vodka__form">
          <div className="vodka__grid">
            {['Soplica', 'Żubrówka', 'Stock', 'Żytniówka B)', 'Finlandia'].map(
              (name: string) => (
                <Form.Check
                  key={name}
                  type="radio"
                  label={name}
                  id={name}
                  name="wóda"
                  onChange={(e) => setChoice(e.target.id)}
                />
              )
            )}
            <Form.Check
              type="radio"
              label="Inna"
              id="inna"
              name="wóda"
              onChange={(e) => setChoice(e.target.id)}
            />
          </div>
          <Button type="submit" className="vodka__submit">
            Zagłosuj
          </Button>
        </Form>
      </div>
    </Widget>
  );
};

export default VodkaPoll;
