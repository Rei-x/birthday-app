import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useApi } from '../../hooks';
import { AdminPaginatedUsers, UserInterface } from '../../interfaces';
import { CreateUserForm, UsersTable } from '../../components';

const Dashboard = () => {
  const api = useApi();
  const [users, setUsers] = useState<Array<UserInterface> | undefined>();

  const getUserTable = useCallback(async () => {
    const fetchedUsers = await api?.getUsers();
    setUsers(fetchedUsers?.docs as AdminPaginatedUsers['docs']);
  }, [api]);

  useEffect(() => {
    getUserTable();
  }, [getUserTable]);

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row className="vertical-center">
        <h1>Create user</h1>
        <CreateUserForm update={getUserTable} />
        {users ? (
          <UsersTable users={users} update={getUserTable} />
        ) : (
          <h1>Loading...</h1>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
