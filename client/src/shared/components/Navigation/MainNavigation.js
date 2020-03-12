import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";
import matchaLogo from '../../icons/logoMatcha.png';

import "./MainNavigation.css";

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const OpenDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const CloseDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
    {drawerIsOpen && <BackDrop onClick={CloseDrawerHandler}/>}
        <SideDrawer show={drawerIsOpen} onClick={CloseDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={OpenDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/"><img src={matchaLogo} alt="matcha logo" /></Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
