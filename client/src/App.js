import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Chat from "./chat/components/Chat/Chat";
import Join from "./chat/components/Join/Join";
import Welcome from "./Welcome/Welcome";
import Match from "./match/pages/Match";
import Notification from "./Notification/pages/Notification";
import Auth from "./user/Auth/Auth";
import UpdateUser from "./user/Account/UpdateUser";
import NotificationDisplay from "./Notification/pages/NotificationDisplay";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/match" exact>
          <Match />
        </Route>
        <Route path="/chat" component={Chat} />
        <Route path="/Join" exact>
          <Join />
        </Route>
        <Route path="/User" exact>
          <UpdateUser />
        </Route>
        <Route path="/Notification" exact>
          <Notification />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/Auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
          <NotificationDisplay />
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
