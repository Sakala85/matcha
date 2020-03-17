import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./NotificationItem.css";

const NotificationItem = props => {
  const Message = () => {
    if (props.type === "Like") {
      return <h3>Like your profile</h3>;
    }
    if (props.type === "Visit") {
      return <h3>Visit your profile</h3>;
    }
    if (props.type === "Chat") {
      return <h3>Send you a NEW Message</h3>;
    }
  };
  console.log(props.image);
  return (
    <Link to={props.link}>
      <Card className="bg-dark text-white card__container_notif">
        <Row>
          <Col>
            <Image src={props.image} roundedCircle className="image__notif" />
            <h3 className="title__card">{props.name}</h3>
          </Col>
          <Col>{Message()}</Col>
          <Col>
            <h3>{props.date}</h3>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default NotificationItem;
