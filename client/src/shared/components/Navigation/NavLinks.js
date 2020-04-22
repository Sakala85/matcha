import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import Icon from "@material-ui/core/Icon";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../shared/context/auth-context";

const NavLinks = (props) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const ENDPOINT = "localhost:5000";
  const [notifNumber, setNotifNumber] = useState(cookies.notification);
  const [notifSet, setNotifSet] = useState(null);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.token && notifSet === null) {
      setNotifSet(1);
      setNotifNumber(cookies.notification);
    }

  }, [ENDPOINT, cookies, auth, notifSet]);

  useEffect(() => {
    if (props.notifNumber !== 0) {
      setNotifNumber(cookies.notification);
    }

  }, [cookies, props.notifNumber
  ]);


  const notifReset = async (e) => {
    if (cookies.userId !== false && cookies.userId !== null) {
      try {
        const readedNotif = await sendRequest(
          `http://localhost:5000/api/user/notification/${cookies.userId}`,
          "PATCH",
          null,
          {
            Authorization: "Bearer " + cookies.token,
          }
        );
        setCookie("notification", readedNotif.notification[0].notifNumber);
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
        <Icon className="navBouton" onClick={auth.logout}>
          power_settings_new
        </Icon>
      </li>
    </ul>
  );
};

export default NavLinks;
