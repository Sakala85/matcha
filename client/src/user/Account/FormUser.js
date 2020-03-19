import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./FormUser.css";
const FormUser = props => {
  return (
    <div className="form__div__account">
      <h1>Update your profile</h1>

      <Form>
        <Form.Group controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={props.items.email}
          />
        </Form.Group>
        <Form.Group controlId="Genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control as="select" defaultValue={props.items.gender}>
            <option>Man</option>
            <option>Woman</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="Orientation">
          <Form.Label>Orientation</Form.Label>
          <Form.Control as="select" defaultValue={props.items.orientation}>
            <option>Man</option>
            <option>Woman</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows="3" defaultValue={props.items.bio} />
        </Form.Group>
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
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Age"
            defaultValue={props.items.age}
          />
        </Form.Group>

        <Button type="submit2" variant="dark">
          Submit2
        </Button>
      </Form>
      <br/>
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
    </div>
  );
};

export default FormUser;
