import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
import UpdateProfile from "./UpdateFunction/UpdateProfile";


const FormUser = props => {
  return (
    <Row>
      {/* PREMIERE DIV POUR INTERETS */}
      <Col className="form__div__account">
        <h1>Update your interest</h1>
        <Form>
          <Form.Group controlId="interest">
            <Form.Label>Interest</Form.Label>
            <br />
            Your Interest :{props.items.interest}
            <br />
            <Form.Check id="politic" label="#politic" inline />
            <Form.Check id="danse" label="#danse" inline />
            <Form.Check id="music" label="#music" inline />
            <Form.Check id="sport" label="#sport" inline />
            <Form.Check id="theatre" label="#theatre" inline />
            <Form.Check id="movies" label="#movies" inline />
            <Form.Check id="anime" label="#anime" inline />
            <Form.Check id="coding" label="#coding" inline />
          </Form.Group>
          <Form.Group controlId="Interest">
            <Form.Label>New Interest</Form.Label>
            <Form.Control type="text" placeholder="Enter interest" />
          </Form.Group>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </Form>
      </Col>

      {/* DIV POUR PROFIL */}
      <Col className="form__div__account">
        <h1>Update your profile</h1>
        <UpdateProfile items={props.items} />
      </Col>

      {/* DIV POUR PASSWORD */}
      <Col className="form__div__account">
        <h1>Update your password</h1>
        <Form>
          <Form.Group controlId="oldpassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="newpassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="newpasswordVerif">
            <Form.Label>Repeat New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default FormUser;
