import React, { useContext, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../../../contexts';
import { useApi } from '../../../hooks';
import Widget from '../Widget';
import VodkaChart from './Chart';

const VodkaPoll = () => {
  const [context, setContext] = useContext(UserContext);
  const [choice, setChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const api = useApi();
  const vodkaList = [
    'Soplica',
    'Żubrówka',
    'Stock',
    'Żytniówka B)',
    'Finlandia',
  ];

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('vodkaPollChoice', choice);

    await api?.updateUser(formData);

    if (setContext)
      setContext((oldContext) => {
        if (oldContext.user)
          return {
            ...oldContext,
            user: {
              ...oldContext.user,
              vodkaPollChoice: choice,
            },
          };
        return oldContext;
      });

    setLoading(false);
  };

  return (
    <Widget>
      {context.user?.vodkaPollChoice !== 'idk' ? (
        <div>
          <h5>Jaka wóda wariacie</h5>
          <VodkaChart />
        </div>
      ) : (
        <div className="vodka__wrapper">
          <h5>Najlepsza wóda to {choice}</h5>
          <Form onSubmit={handleSubmit} className="vodka__form">
            <div className="vodka__grid">
              {vodkaList.map((name: string) => (
                <Form.Check
                  checked={choice === name}
                  key={name}
                  type="radio"
                  label={name}
                  id={name}
                  name="wóda"
                  onChange={(e) => {
                    setChoice(e.target.id);
                    setShowInput(false);
                  }}
                />
              ))}
              <Form.Check
                type="radio"
                label="Inna"
                id="inna"
                name="wóda"
                onChange={(e) => {
                  setChoice(e.target.id);
                  setShowInput(true);
                }}
              />
              {showInput && (
                <Form.Control
                  className="mt-2"
                  name="vodkaPollChoice"
                  type="text"
                  onChange={(e) => setChoice(e.target.value)}
                />
              )}
            </div>
            <Button disabled={loading} type="submit" className="vodka__submit">
              {loading ? <Spinner animation="border" /> : 'Zagłosuj'}
            </Button>
          </Form>
        </div>
      )}
    </Widget>
  );
};

export default VodkaPoll;
