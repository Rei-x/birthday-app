import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import {
  AccompanimentWidget,
  Avatar,
  ShortcutsWidget,
  TimeRemainingWidget,
  VodkaPollWidget,
  WeatherWidget,
  Loading,
  AttendanceWidget,
  PollWidget,
  VideoWidget,
} from '../components';
import { UserContext } from '../contexts';
import { UserInterface } from '../interfaces';
import { useApi } from '../hooks';

const UserDashboard = () => {
  const [context] = useContext(UserContext);
  const api = useApi();
  const user = context.user as UserInterface;
  const hasWatchedVideo = localStorage.getItem('hasWatchedVideo');

  return api ? (
    <Container className="navbar-margin">
      <div className="d-flex ms-3 mb-5">
        <Avatar url={api.getAvatarUrl()} />
        <h2 className="ms-3" style={{ marginTop: '10px' }}>
          Hej <b>{user?.firstName}!</b>
        </h2>
      </div>
      {!hasWatchedVideo && <VideoWidget />}
      <AttendanceWidget />
      {!user.hasCompletedPoll && <PollWidget />}
      <WeatherWidget />
      <TimeRemainingWidget />
      <VodkaPollWidget />
      <AccompanimentWidget />
      <ShortcutsWidget />
    </Container>
  ) : (
    <Loading />
  );
};

export default UserDashboard;
