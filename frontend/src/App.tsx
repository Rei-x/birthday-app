import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-bootstrap';
import Navbar from './components/Navbar';
import './app.scss';
import * as views from './views';
import { UserContext } from './contexts';
import { NotificationInterface } from './interfaces';
import { useApi } from './hooks';
import { Toast, Footer, Loading } from './components';
import { GlobalContextInterface } from './api';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    Array<NotificationInterface>
  >([]);
  const [context, setContext] = useState<GlobalContextInterface>({
    addNotification: (title: string, children: React.ReactNode) => {
      setNotifications((oldNotifications) => [
        ...oldNotifications,
        { title, children },
      ]);
    },
    apiClient: undefined,
  });
  const api = useApi(context, setContext);

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    try {
      if (JWT) jwtDecode(JWT);
    } catch (e) {
      localStorage.removeItem('JWT');
      setLoading(false);
      return;
    }

    if (JWT) {
      setContext((oldContext) => ({ ...oldContext, JWT }));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (context?.JWT) {
      localStorage.setItem('JWT', context.JWT);
    }

    if (context?.JWT === undefined) {
      setContext((oldContext) => ({ ...oldContext, user: undefined }));
    }
  }, [context?.JWT]);

  useEffect(() => {
    const getAndSetUserContext = async () => {
      if (api) {
        try {
          const user = await api!.getProfile();
          setContext((oldContext) => ({ ...oldContext, user }));
        } catch (e) {
          context.addNotification(
            'Błąd',
            <p>Coś poszło nie tak, spróbuj jeszcze raz się zalogować.</p>
          );
          localStorage.clear();
          setContext((oldContext) => ({
            addNotification: oldContext.addNotification,
          }));
        }
        setLoading(false);
      }
    };
    getAndSetUserContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.addNotification, api]);

  return loading ? (
    <Loading />
  ) : (
    <UserContext.Provider value={[context, setContext]}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/invite/:tokenId">
            <views.TokenView />
          </Route>
          <Route path="/pin">
            <views.PinView />
          </Route>
          <Route path="/admin/">
            <views.AdminView />
          </Route>
          <Route path="/404">
            <views.NotFoundView />
          </Route>
          {!context.user && <Redirect to="/pin" />}
          <Route path="/" exact>
            <views.UserDashboardView />
          </Route>
          <Route path="/poll">
            {context?.user?.hasCompletedPoll ? (
              <views.PollView.Thanks />
            ) : (
              <views.PollView.Poll />
            )}
          </Route>
          <Route path="/faq">
            <views.FaqView />
          </Route>
          <Route path="/video">
            <views.VideoView />
          </Route>
          <Route path="/guest-list">
            <views.GuestsListView />
          </Route>
          <Route path="*">
            <views.NotFoundView />
          </Route>
        </Switch>
      </Router>
      <Footer />
      <ToastContainer
        position="bottom-end"
        className="m-3"
        style={{ zIndex: 1031 }}
      >
        {notifications.map(({ title, children }) => (
          <Toast title={title}>{children}</Toast>
        ))}
      </ToastContainer>
    </UserContext.Provider>
  );
};

export default App;
