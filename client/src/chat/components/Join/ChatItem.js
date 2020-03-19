import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ChatItem.css";

const ChatItem = props => {
  return (
    <Link to={props.link}>
      <Card className="bg-dark text-white card__container_notif">
        <Row>
          <Col>
            <Image src={props.image} roundedCircle className="image__notif" />
            <h3 className="title__card">{props.name}</h3>
          </Col>
          <Col><h3 className="title__card">Open Chat Room</h3></Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ChatItem;
