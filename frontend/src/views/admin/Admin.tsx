import React, { useContext } from 'react';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';
import LoginView from './Login';
import DashboardView from './Dashboard';

const Admin = () => {
  const [context] = useContext(UserContext);
  const [, api] = useApi(context);
  return api?.role === 'admin' ? <DashboardView /> : <LoginView />;
};

export default Admin;
