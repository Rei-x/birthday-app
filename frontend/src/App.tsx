import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import './app.scss';
import { LoginView, MainView, TokenView } from './views';
import { UserContext } from './contexts';
import { UserContextInterface } from './interfaces';

function App() {
  const [context, setContext] = useState<UserContextInterface>({});

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    if (!context.JWT) {
      if (JWT) setContext({ JWT });
    }
    if (context.JWT && context.JWT !== JWT) {
      localStorage.setItem('JWT', context.JWT);
    }
  }, [context]);

  return (
    <UserContext.Provider value={[context, setContext]}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/token/:tokenId">
            <TokenView />
          </Route>
          <Route path="/admin/">
            <LoginView />
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
