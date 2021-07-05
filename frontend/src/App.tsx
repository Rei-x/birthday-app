import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import './app.scss';
import { AdminView, MainView, TokenView } from './views';
import { UserContext } from './contexts';
import { UserContextInterface } from './interfaces';
import { useApi } from './hooks';

const App = () => {
  const [context, setContext] = useState<UserContextInterface>({});
  const [isAuthed, api] = useApi(context);

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    if (context?.JWT) {
      localStorage.setItem('JWT', context.JWT);
    } else if (context?.JWT === undefined && JWT) {
      setContext((oldContext) => ({ ...oldContext, JWT }));
    }
  }, [context?.JWT]);

  useEffect(() => {
    const getAndSetUserContext = async () => {
      if (isAuthed) {
        const user = await api!.getProfile();
        setContext((oldContext) => ({ ...oldContext, user }));
      }
    };
    getAndSetUserContext();
  }, [context?.JWT, isAuthed, api]);

  return (
    <UserContext.Provider value={[context, setContext]}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/token/:tokenId">
            <TokenView />
          </Route>
          <Route path="/admin/">
            <AdminView />
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
