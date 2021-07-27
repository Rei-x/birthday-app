import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import {
  Accompaniment,
  Avatar,
  Shortcuts,
  TimeRemaining,
  VodkaPoll,
  Weather,
} from '../components';
import { UserContext } from '../contexts';
import { UserInterface } from '../interfaces';

const UserDashboard = () => {
  const [context] = useContext(UserContext);
  const user = context.user as UserInterface;

  const avatarUrl =
    'https://robohash.org/60d26ee9c88916cd6a86c27ca987ce53?set=set4&bgset=bg2&size=400x400';

  return (
    <Container style={{ marginTop: '100px' }}>
      <div className="d-flex ms-3 mb-5">
        <Avatar url={avatarUrl} />
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
  );
};

export default UserDashboard;
