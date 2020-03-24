import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
// import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
// import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hook";
class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    try {
        fetch(
          `http://localhost:5000/api/user/16`,
          "PATCH",
          JSON.stringify({
            username: data.username.value,
            bio: data.email.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
      } catch (err) {}
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="text" />



        <button>Send data!</button>
      </form>
    );
  }
}

const UpdateProfile = props => {


  return (
      <MyForm />
    // <React.Fragment>
    //   <Form>
    //     <Form.Group controlId="username">
    //       <Form.Label>Username</Form.Label>
    //       <Form.Control
    //         type="username"
    //         placeholder="Enter Username"
    //         //   onInput={inputHandler}
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="email">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter email"
    //         //   onInput={inputHandler}
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="gender">
    //       <Form.Label>Gender</Form.Label>
    //       <Form.Control
    //         as="select"
    //         //   onInput={inputHandler}
    //       >
    //         <option>Man</option>
    //         <option>Woman</option>
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="orientation">
    //       <Form.Label>Orientation</Form.Label>
    //       <Form.Control
    //         as="select"
    //         //   onInput={inputHandler}
    //       >
    //         <option>Man</option>
    //         <option>Woman</option>
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="bio">
    //       <Form.Label>Bio</Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         rows="3"
    //         //   onInput={inputHandler}
    //       />
    //     </Form.Group>
    //     <Button type="submit2" variant="dark">
    //       Submit
    //     </Button>
    //   </Form>
    // </React.Fragment>
  );
};

export default UpdateProfile;
