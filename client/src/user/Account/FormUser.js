import React from "react";
import { Col, Row, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateInterest from "./UpdateInterest";
import UpdatePicture from "./UpdatePicture";

const FormUser = props => {
  return (
    <React.Fragment>
      <Card className="settingsPicture">
        <UpdatePicture items={props.items} />
      </Card>
      <Card className="settingsInterest">
        {/* <h1>Update your interest</h1> */}
        <UpdateInterest />
      </Card>

      {/* DIV POUR PROFIL */}
      <Card className="settingsProfil">
        {/* <h1>Update your profile</h1> */}
        <UpdateProfile items={props.items} />
      </Card>

      {/* DIV POUR PASSWORD */}
      <Card className="settingsPassword">
        {/* <h1>Update your password</h1> */}
        <UpdatePassword />
      </Card>
    </React.Fragment>
  );
};

export default FormUser;
