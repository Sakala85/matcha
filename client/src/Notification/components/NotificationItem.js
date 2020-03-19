import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./NotificationItem.css";

const NotificationItem = props => {
  const Message = () => {
    if (props.type === "Like") {
      return <h3 className="title__card">Like your profile</h3>;
    }
    if (props.type === "Visit") {
      return <h3 className="title__card">Visit your profile</h3>;
    }
    if (props.type === "Chat") {
      return <h3 className="title__card">Send you a NEW Message</h3>;
    }
  };
  console.log(props.image);
  return (
    <Link to={props.link}>
      <Card className="bg-dark text-white card__container_notif">
        <Row>
          <Col>
            <Image src={props.image} roundedCircle className="image__notif" />
            <h2 className="title__card">{props.name}</h2>
          </Col>
          <Col>{Message()}</Col>
          <Col>
            <h2 className="title__card">{props.date}</h2>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default NotificationItem;
