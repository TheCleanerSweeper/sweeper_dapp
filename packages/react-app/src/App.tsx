import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/landing/NavBar';
import Footer from './components/landing/Footer';
import Landing from './pages/Landing/Landing';
import Dapp from './pages/Dapp/Dapp';

/* eslint-disable @typescript-eslint/no-explicit-any */
function App(): any {
  return (
    <div className="flex flex-col">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: '',
          style: {
            margin: '40px',
            backdropFilter: 'blur(5px)',
            background: '#111827',
            border: '1px solid rgba(129, 140, 248, 0.8)',
            color: 'white',
            zIndex: 5,
          },
          duration: 5000,
          success: {
            icon: '🧹',
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
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
