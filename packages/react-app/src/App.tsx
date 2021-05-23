import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/landing/NavBar';
import Footer from './components/landing/Footer';
import Landing from './pages/Landing/Landing';
import Dapp from './pages/Dapp/Dapp';

/* eslint-disable @typescript-eslint/no-explicit-any */
function App(): any {
  return (
    <div className="flex flex-col">
      <Route path="/" component={NavBar} exact />
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={Dapp} exact />
        <Route path="/app/*" component={Dapp} exact />
      </Switch>
      <Route path="/" component={Footer} exact />
    </div>
  );
}

export default App;
