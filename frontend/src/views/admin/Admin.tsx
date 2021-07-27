import React from 'react';
import { useApi } from '../../hooks';
import LoginView from './Login';
import DashboardView from './Dashboard';

const Admin = () => {
  const api = useApi();
  return api?.role === 'admin' ? <DashboardView /> : <LoginView />;
};

export default Admin;
