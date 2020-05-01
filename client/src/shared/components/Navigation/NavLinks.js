import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import Icon from "@material-ui/core/Icon";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../shared/context/auth-context";
import SocketClient from "../../../shared/util/socketClient";


const NavLinks = (props) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const notifReset = async (e) => {
    if (cookies.userId !== false && cookies.userId !== null) {
      try {
        await sendRequest(
          `http://localhost:5000/api/user/notification/${cookies.userId}`,
          "PATCH",
          null,
          {
            Authorization: "Bearer " + cookies.token,
          }
        );
        setCookie("notification", 0);
      } catch (err) {}
    }
    return (1)
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
          <SocketClient />
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
