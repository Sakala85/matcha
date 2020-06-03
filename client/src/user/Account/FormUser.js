import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import PopularInterest from "./PopularInterest";
import UpdatePicture from "./UpdatePicture";

const FormUser = (props) => {
  return (
    <Row>
      <React.Fragment>
        <Col className="form__div__account">
          <Card className="settingsPicture">
            <UpdatePicture items={props.items} />
          </Card>
        </Col>

        <Col className="form__div__account">
          <Card className="settingsProfil">
            <UpdateProfile items={props.items} />
          </Card>
        </Col>
        <Col className="form__div__account">
          <Card className="settingsPassword">
            <UpdatePassword />
          </Card>
          <Card className="settingsInterest">
            <PopularInterest />
          </Card>          
        </Col>
      </React.Fragment>
    </Row>
  );
};

export default FormUser;
