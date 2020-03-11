import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "./Welcome.css";
import "bootstrap/dist/css/bootstrap.css";
import Love from "./WelcomeImg/love.jpg";
import Match from "./WelcomeImg/couple.gif";
import Welcomeimg from "./WelcomeImg/Welcome.jpg";
const Welcome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Welcomeimg}
          alt="First slide"
          height="1300rem"
        />
        <Carousel.Caption>
          <h3 className="button__index">Welcome on Matcha</h3>
          <Button className="button__index" variant="success" size="lg">
            Sign In
          </Button>
          <Button variant="dark" size="lg">
            LogIn
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Love}
          alt="Third slide"
          height="1300rem"
        />

        <Carousel.Caption>
        <h3 className="button__index">Find someone for the life</h3>
          <Button className="button__index" variant="success" size="lg">
            Sign In
          </Button>
          <Button variant="dark" size="lg">
            LogIn
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Match}
          alt="Third slide"
          height="1300rem"
        />

        <Carousel.Caption>
        <h3 className="button__index">Find someone pour one Night</h3>
          <Button className="button__index" variant="success" size="lg">
            Sign In
          </Button>
          <Button variant="dark" size="lg">
            LogIn
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Welcome;
