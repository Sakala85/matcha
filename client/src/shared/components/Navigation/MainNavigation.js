import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";
import matchaLogo from "../../icons/logoMatcha.png";
import Input from "../FormElements/Input";
import {
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import "./MainNavigation.css";
import { useForm } from "../../hooks/form-hook";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      searchBar: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const OpenDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const UpdateSubmitHandler = () => {
    console.log(formState.inputs.searchBar.value)
  }
  const CloseDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <BackDrop onClick={CloseDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={CloseDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks notifNumber={props.notifNumber} />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={OpenDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            <img className="logo" src={matchaLogo} alt="matcha logo" />
          </Link>
        </h1>
        <form className="formUpdatePassword" onSubmit={UpdateSubmitHandler}>
        <Input
          id="searchBar"
          element="input"
          type="text"
          validators={[
            VALIDATOR_REQUIRE(),
          ]}
          errorText="Please enter a  valid user"
          onInput={inputHandler}
          initialValue={""}
          initialValid={false}
        />
        <button type="submit">search</button>
        </form>
        <nav className="main-navigation__header-nav">
          <NavLinks notifNumber={props.notifNumber} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
