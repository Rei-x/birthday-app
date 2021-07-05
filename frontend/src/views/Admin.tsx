import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { useApi } from '../hooks';
import LoginView from './Login';
import DashboardView from './Dashboard';

const Admin = () => {
  const [context] = useContext(UserContext);
  const [isAuthed] = useApi(context);
  return isAuthed ? <DashboardView /> : <LoginView />;
};

export default Admin;
