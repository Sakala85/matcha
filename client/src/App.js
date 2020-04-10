import React, { useState, useCallback, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Chat from "./chat/components/Chat/Chat";
import Join from "./chat/components/Join/Join";
import Match from "./match/pages/Match";
import Notification from "./Notification/pages/Notification";
import Auth from "./user/Auth/Auth";
import UpdateUser from "./user/Account/UpdateUser";
import NotificationDisplay from "./Notification/pages/NotificationDisplay";
import ConfirmEmail from "./user/ConfirmEmail/ConfirmEmail";
import ForgetPassword from "./user/ResetPassword/ForgetPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import NotifPush from "./Notification/PushNotif/pushNotif";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUserName] = useState(false);

  const login = useCallback((uid, token, username) => {
    setToken(token);
    setUserId(uid);
    setUserName(username);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
  }, []);

  let routes;

  if (token) {
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
        <Redirect to="/match" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/valid/:tokenEmail" exact>
          <ConfirmEmail />
        </Route>
        <Route path="/forgetpassword" exact>
          <ForgetPassword />
        </Route>
        <Route path="/resetpassword/:tokenPassword" exact>
          <ResetPassword />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        {token !== false && <MainNavigation />}
        {token !== false && <NotificationDisplay />}
        {auth.username !== null && console.log(auth.username)}
        {console.log(username)}
        {token !== false && <NotifPush username={username}/>}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
