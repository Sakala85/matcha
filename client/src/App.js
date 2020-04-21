import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Chat from "./chat/components/Chat/Chat";
import Join from "./chat/components/Join/Join";
import Match from "./match/pages/Match";
import Notification from "./Notification/pages/Notification";
import Auth from "./user/Auth/Auth";
import UpdateUser from "./user/Account/UpdateUser";
import ConfirmEmail from "./user/ConfirmEmail/ConfirmEmail";
import ForgetPassword from "./user/ResetPassword/ForgetPassword";
import ResetPassword from "./user/ResetPassword/ResetPassword";
import { AuthContext } from "./shared/context/auth-context";
import { useHttpClient } from "./shared/hooks/http-hook";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUserName] = useState(false);
  const [notifSet, setNotifSet] = useState(false);
  const { sendRequest } = useHttpClient();

  const login = useCallback((uid, token, username) => {
    setToken(token);
    setUserId(uid);
    setUserName(username);
    if (token !== null && token !== false && notifSet === false) {
      const setNotifNumber = async (event) => {
        try {
          const readedNotif = await sendRequest(
            `http://localhost:5000/api/user/notification/${uid}/count`,
            "GET",
            null,
            {
              Authorization: "Bearer " + token,
            }
          );
          localStorage.setItem(
            "notifUnread",
            readedNotif.notification[0].notifNumber
          );
          setNotifSet(readedNotif.notification[0].notifNumber);
        } catch (err) {}
      };
      setNotifNumber();
    }
  }, [notifSet, sendRequest]);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setNotifSet(false);
    window.location.reload();
  }, []);

  let routes;
  useEffect(() => {});
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
        {token !== false && token !== null && notifSet !== false && (
          <MainNavigation username={username} />
        )}
        {token !== false && token !== null && <ReactNotification />}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
