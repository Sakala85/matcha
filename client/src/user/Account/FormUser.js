import React from "react";
import { Card, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateInterest from "./UpdateInterest";
import UpdatePicture from "./UpdatePicture";

const FormUser = props => {
  return (
    <Row>
      <React.Fragment>
        <Col className="form__div__account">
          <Card className="settingsPicture">
            <UpdatePicture items={props.items} />
          </Card>
        </Col>

        <Col className="form__div__account">
          {/* DIV POUR PROFIL */}
          <Card className="settingsProfil">
            {/* <h1>Update your profile</h1> */}
            <UpdateProfile items={props.items} />
          </Card>
        </Col>
          <Col className="form__div__account">
            {/* DIV POUR PASSWORD */}
            <Card className="settingsPassword">
              {/* <h1>Update your password</h1> */}
              <UpdatePassword />
            </Card>
          {/* </Col> */}

          {/* <Col className="form__div__account"> */}
            <Card className="settingsInterest">
              {/* <h1>Update your interest</h1> */}
              <UpdateInterest />
            </Card>
          </Col>
      </React.Fragment>
    </Row>
  );
};

export default FormUser;
