import React, { useState, useCallback } from "react";
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
import ConfirmEmail from "./user/ConfirmEmail/ConfirmEmail";
import ForgetPassword from "./user/ResetPassword/ForgetPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import NotifPush from "./Notification/PushNotif/pushNotif";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
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
  console.log(token)
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
        {token !== false && token !== null && <MainNavigation />}
<<<<<<< HEAD
        {token !== false && token !== null && <NotifPush username={username}/>}
=======
        {token !== false && <NotifPush username={username}/>}
>>>>>>> 48035ba05e4f0cc6338bf2bd15e619e1c2db083f
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
