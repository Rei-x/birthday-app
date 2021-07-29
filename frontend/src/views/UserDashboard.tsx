import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import {
  Accompaniment,
  Avatar,
  Shortcuts,
  TimeRemaining,
  VodkaPoll,
  Weather,
  Loading,
} from '../components';
import { UserContext } from '../contexts';
import { UserInterface } from '../interfaces';
import { useApi } from '../hooks';

const UserDashboard = () => {
  const [context] = useContext(UserContext);
  const api = useApi();
  const user = context.user as UserInterface;

  return api ? (
    <Container className="navbar-margin">
      <div className="d-flex ms-3 mb-5">
        <Avatar url={api.getAvatarUrl()} />
        <h2 className="ms-3" style={{ marginTop: '10px' }}>
          Hej <b>{user?.firstName}!</b>
        </h2>
      </div>
      <Weather />
      <TimeRemaining />
      <VodkaPoll />
      <Accompaniment />
      <Shortcuts />
    </Container>
  ) : (
    <Loading />
  );
};

export default UserDashboard;
