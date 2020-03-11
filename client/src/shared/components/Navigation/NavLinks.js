import React from "react";
import { NavLink } from 'react-router-dom';

import matchIcon from '../../icons/match.png';
import chatIcon from '../../icons/chat.png';
import notificationIcon from '../../icons/notification.png';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
      <li>
          <NavLink to="/" exact><img src={matchIcon} alt="match" /></NavLink>
      </li>
      <li>
          <NavLink to="/u1/places"><img src={chatIcon} alt="chat" /></NavLink>
      </li>
      <li>
          <NavLink to="/places/new"><img src={notificationIcon} alt="notification" /></NavLink>
      </li>
      <li>
          <NavLink to="/auth">Authenticate</NavLink>
      </li>
  </ul>
};

export default NavLinks;
