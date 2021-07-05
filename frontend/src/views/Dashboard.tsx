import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { UserContext } from '../contexts';
import { useApi } from '../hooks';
import { UserInterface } from '../interfaces';

const Dashboard = () => {
  const [context] = useContext(UserContext);
  const [, api] = useApi(context);
  const [state, setState] = useState<Array<UserInterface> | undefined>();

  const getUserTable = useCallback(async () => {
    const users = await api?.getUsers();
    setState(users?.docs);
  }, [api]);

  useEffect(() => {
    getUserTable();
  }, [getUserTable]);

  return (
    <Container>
      <Row className="vertical-center">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Avatar</th>
              <th>Greeting video</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((user: UserInterface) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.avatar}</td>
                <td>{user.greetingVideo}</td>
              </tr>
            ))}
          </tbody>

        </Table>
      </Row>
    </Container>

  );
};

export default Dashboard;
