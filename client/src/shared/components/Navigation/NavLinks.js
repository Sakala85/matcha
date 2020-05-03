import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import Icon from "@material-ui/core/Icon";
import { AuthContext } from "../../../shared/context/auth-context";
import SocketClient from "../../../shared/util/socketClient";


const NavLinks = (props) => {
  const auth = useContext(AuthContext);



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
 
          <SocketClient />
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
