import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Accompaniment,
  Avatar,
  Shortcuts,
  TimeRemaining,
  VodkaPoll,
  Weather,
  Loading,
  Widget,
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
      {!user.hasCompletedPoll && (
        <Widget>
          <div>
            <h5>WAŻNE: wypełnij ankietę</h5>
          </div>
          <div>
            <LinkContainer to="/poll">
              <Button>Ankieta</Button>
            </LinkContainer>
          </div>
        </Widget>
      )}
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
