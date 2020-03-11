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

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
        <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
