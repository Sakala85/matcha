import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
// import matchIcon from "../../icons/match.png";
// import chatIcon from "../../icons/chat.png";
// import notificationIcon from "../../icons/notification.png";
// import userIcon from "../../icons/user.png";
// import logOut from "../../icons/logout.png";
import "./NavLinks.css";
import Icon from "@material-ui/core/Icon";

const NavLinks = props => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/match" exact>
            {/* <img className="navbutton" src={matchIcon} alt="match" /> */}
            <Icon className="navBouton" >
    
              whatshot
            </Icon>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/join">
            {/* <img className="navbutton" src={chatIcon} alt="chat" /> */}
            <Icon className="navBouton"> message</Icon>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/notification">
            {/* <img
              className="navbutton"
              src={notificationIcon}
              alt="notification"
            /> */}
            <Icon className="navBouton"> notifications_none</Icon>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/user">
            {/* <img className="navbutton" src={userIcon} alt="User" /> */}
            <Icon className="navBouton"> account_circle</Icon>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
  
            <Icon className="navBouton" onClick={auth.logout}> power_settings_new</Icon>

        </li>
      )}
    </ul>
  );
};

export default NavLinks;
