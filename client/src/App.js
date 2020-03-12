import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import './App.css';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Chat from './chat/components/Chat/Chat';
import Join from './chat/components/Join/Join';
import Welcome from './Welcome/Welcome';
import Match from './match/pages/Match';
import Notification from './Notification/pages/Notification';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
        <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/match" exact>
            <Match />
          </Route>
          <Route path="/chat" component={Chat} />
          <Route path="/Join" exact>
            <Join />
          </Route>
          <Route path="/Notification" exact>
            <Notification />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
