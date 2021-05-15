import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing/Landing";
import Dapp from "./pages/Dapp/Dapp";

import GET_TRANSFERS from "./graphql/subgraph";

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
    }
  }, [loading, error, data]);

  return (
    <body className="flex flex-col">
      <Route path="/" component={NavBar} exact />
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={Dapp} exact />
        <Route path="/app/*" component={Dapp} exact />
      </Switch>
      <Route path="/" component={Footer} exact />
    </body>
  );
}

export default App;
