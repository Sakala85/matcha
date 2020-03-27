import React from "react";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateInterest from "./UpdateInterest";


const FormUser = props => {
  return (
    <Row>
      {/* PREMIERE DIV POUR INTERETS */}
      <Col className="form__div__account">
        <h1>Update your interest</h1>
        <UpdateInterest />
      </Col>

      {/* DIV POUR PROFIL */}
      <Col className="form__div__account">
        <h1>Update your profile</h1>
        <UpdateProfile items={props.items} />
      </Col>

      {/* DIV POUR PASSWORD */}
      <Col className="form__div__account">
        <h1>Update your password</h1>
        <UpdatePassword />
      </Col>
    </Row>
  );
};

export default FormUser;
