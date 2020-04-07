import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import matchIcon from "../../icons/match.png";
import chatIcon from "../../icons/chat.png";
import notificationIcon from "../../icons/notification.png";
import userIcon from "../../icons/user.png";
import logOut from "../../icons/logout.png";
import "./NavLinks.css";

const NavLinks = props => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/match" exact>
            <img src={matchIcon} alt="match" />
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/join">
            <img src={chatIcon} alt="chat" />
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/notification">
            <img src={notificationIcon} alt="notification" />
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/user">
            <img src={userIcon} alt="User" />
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>
            <img src={logOut} alt="Log Out" />
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
