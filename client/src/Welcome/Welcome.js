import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "./Welcome.css";
import "bootstrap/dist/css/bootstrap.css";
import matchaWelcome from "./WelcomeImg/matchaWelcome.png";
const Welcome = () => {
  return (
        <Container>
      <Row>
        <Col className="back__img"><img src={matchaWelcome} alt="Welcome Here" className="matcha__welcome" /></Col>
      </Row>
    <Card className="text-center card__style">
      <Card.Body>
        <Card.Title>Create account or LogIn for Match !</Card.Title>
        <Button className="button__index" variant="success" size="lg">
          Sign In
        </Button>
        <Button variant="dark" size="lg">
          LogIn
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Enjoy</Card.Footer>
    </Card>
    </Container>

  );
};

export default Welcome;
