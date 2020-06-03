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
import Footer from "./shared/components/footer/footer";
import AdminPage from "./Admin/AdminPage";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useCookies } from "react-cookie";
// import cookie from "react-cookie";

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [username, setUserName] = useState(false);
  const [notifSet, setNotifSet] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();

  const login = useCallback(
    (
      uid,
      token,
      username,
      orientation,
      latitude,
      longitude,
      valid_profil,
      gender
    ) => {
      setToken(token);
      setUserId(uid);
      let d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      setCookie("token", token, { path: "/", expires: d });
      setCookie("userId", uid, { path: "/", expires: d });
      setCookie("orientation", orientation, { path: "/", expires: d });
      setCookie("gender", gender, { path: "/", expires: d });
      setCookie("username", username, { path: "/", expires: d });
      setCookie("lat", latitude, { path: "/", expires: d });
      setCookie("lon", longitude, { path: "/", expires: d });
      setCookie("valid_profil", valid_profil, { path: "/", expires: d });
      setUserName(username);
      if (token !== null && token !== false && notifSet === false && token) {
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
            setCookie("notification", readedNotif.notification[0].notifNumber);
          } catch (err) {}
          setNotifSet(true);
        };
        setNotifNumber();
      }
      window.location.reload();
    },
    [notifSet, sendRequest, setCookie]
  );

  setTimeout(function () {
    window.location.reload();
  }, 3600001);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setNotifSet(false);
    removeCookie("token");
    window.location.reload();
  }, [removeCookie]);

  const addNotification = useCallback(() => {
    const newNotification = +cookies.notification + 1;
    setCookie("notification", newNotification);
  }, [cookies, setCookie]);

  let routes;
  useEffect(() => {});
  if (cookies.token && cookies.orientation && cookies.valid_profil === "1") {
    routes = (
      <Switch>
        <Route path="/match" component={Match} />
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
  } else if (
    cookies.token &&
    cookies.orientation &&
    cookies.valid_profil === "0"
  ) {
    routes = (
      <Switch>
        <Route path="/User" exact>
          <UpdateUser />
        </Route>
        <Redirect to="/User" />
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
        addNotification: addNotification,
      }}
    >
      <Router>
        {cookies.token &&
          cookies.token !== null &&
          cookies.orientation &&
          cookies.token !== undefined && (
            <MainNavigation
              username={username}
              notifNumber={cookies.notification}
            />
          )}
        {cookies.orientation &&
          cookies.token &&
          cookies.token !== null &&
          cookies.token !== undefined && <ReactNotification />}
        <main>{routes}</main>
        <Footer/>
        {cookies.admin === "123" ? <AdminPage /> : <main>{routes}</main>}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
