/* eslint-disable jsx-a11y/label-has-associated-control */
import ky from 'ky';
import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../config';
import { UserContext } from '../contexts';

interface ApiResponse {
  JWT: string
}

const LoginView = () => {
  const [error, setError] = useState<string>();
  const [context, setContext] = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (context.user) history.push('/admin');
  }, [context, history]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username) { setError('Username is required.'); return; }
    if (!password) { setError(`${error}\nPassword is required.`); return; }

    if (!setContext) throw new Error('Context wasn\'t initialized');

    try {
      const response = await ky.post('api/admin/login', { prefixUrl: BASE_URL, json: { username, password } }).json<ApiResponse>();
      const { JWT } = response;
      setContext({ JWT });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="vertical-center justify-content-center flex-column text-center ">
      <Form className="p-3 bg-gray-800" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <div className="form-floating mt-3">
          <Form.Control name="username" type="text" id="floatingUsername" placeholder="username" />
          <label htmlFor="floatingUsername"> Username </label>
        </div>
        <div className="form-floating mt-3">
          <Form.Control name="password" type="password" id="floatingPassword" placeholder="password" />
          <label htmlFor="floatingPassword"> Password </label>
        </div>
        <Button type="submit" className="mt-3 w-75">
          Let&apos;s go
          {' '}
          <FaRegArrowAltCircleRight className="ms-1" />
        </Button>
      </Form>
      {error && <span>{error}</span>}
    </Container>
  );
};

export default LoginView;
