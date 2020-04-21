import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
import Icon from "@material-ui/core/Icon";
import io from "socket.io-client";
import { store } from "react-notifications-component";
import { useHttpClient } from "../../../shared/hooks/http-hook";

let socket;
const NavLinks = (props) => {
  const ENDPOINT = "localhost:5000";
  const auth = useContext(AuthContext);
  const [notifNumber, setNotifNumber] = useState(
    localStorage.getItem("notifUnread")
  );
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const username = auth.username;
    socket = io(ENDPOINT);
    if (username !== false && username !== null && localStorage.getItem("notifUnread") !== undefined) {
      setNotifNumber(localStorage.getItem("notifUnread"));
      const userId = auth.userId;
      socket.emit("connectNew", { username, userId }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [ENDPOINT, auth.username, auth.userId]);
  useEffect(() => {
    socket.on("notifPusher", (param) => {
      let notifNumber = +localStorage.getItem("notifUnread");
      notifNumber++;
      setNotifNumber(notifNumber);
      localStorage.setItem("notifUnread", notifNumber);
      store.addNotification({
        title: `${param.username}`,
        message: `${param.type} your profile`,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    });
    return () => {
      socket.off();
    };
  });
  const notifReset = async (e) => {
    if (auth.userId !== false && auth.userId !== null) {
      localStorage.setItem("notifUnread", 0);
      try {
        const readedNotif = await sendRequest(
          `http://localhost:5000/api/user/notification/${auth.userId}`,
          "PATCH",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        localStorage.setItem(
          "notifUnread",
          readedNotif.notification[0].notifNumber
        );
      } catch (err) {}
      setNotifNumber(0);
    }
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/match" exact>
          <Icon className="navBouton">whatshot</Icon>
        </NavLink>
      </li>
      <li>
        <NavLink to="/join">
          <Icon className="navBouton"> message</Icon>
        </NavLink>
      </li>
      <li>
        <NavLink to="/notification" onClick={notifReset}>
          <Icon className="navBouton"> notifications_none</Icon>
          {notifNumber}
        </NavLink>
      </li>
      <li>
        <NavLink to="/user">
          <Icon className="navBouton"> account_circle</Icon>
        </NavLink>
      </li>
      <li>
        <Icon className="navBouton" onClick={auth.logout}>power_settings_new</Icon>
      </li>
    </ul>
  );
};

export default NavLinks;
