import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Container, Spinner, ToastContainer } from 'react-bootstrap';
import Navbar from './components/Navbar';
import './app.scss';
import {
  AdminView,
  MainView,
  NotFoundView,
  PinView,
  TokenView,
  PollView,
} from './views';
import { UserContext } from './contexts';
import { GlobalContext, NotificationInterface } from './interfaces';
import { useApi } from './hooks';
import { Toast } from './components';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    Array<NotificationInterface>
  >([]);
  const [context, setContext] = useState<GlobalContext>({
    addNotification: (title: string, children: React.ReactNode) => {
      setNotifications((oldNotifications) => [
        ...oldNotifications,
        { title, children },
      ]);
    },
  });
  const [isAuthed, api] = useApi(context);

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
      if (isAuthed && api && context?.JWT) {
        try {
          const user = await api!.getProfile();
          setContext((oldContext) => ({ ...oldContext, user }));
        } catch (e) {
          context.addNotification(
            'Błąd',
            <p>Coś poszło nie tak, spróbuj jeszcze raz się zalogować.</p>
          );
          localStorage.removeItem('JWT');
        }
        setLoading(false);
      }
    };
    getAndSetUserContext();
  }, [context?.JWT, isAuthed, api]);

  return loading ? (
    <Container className="vertical-center">
      <Spinner animation="border" role="status" className="mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  ) : (
    <UserContext.Provider value={[context, setContext]}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/invite/:tokenId">
            <TokenView />
          </Route>
          <Route path="/pin">
            <PinView />
          </Route>
          <Route path="/admin/">
            <AdminView />
          </Route>
          {isAuthed ? (
            <>
              <Route path="/" exact>
                <MainView />
              </Route>
              <Route path="/poll">
                <PollView />
              </Route>
            </>
          ) : (
            <Redirect to="/pin" />
          )}
          <Route path="/404">
            <NotFoundView />
          </Route>
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
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
