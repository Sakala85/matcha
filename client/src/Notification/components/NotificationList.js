import React from "react";

import NotificationItem from "./NotificationItem";
import "./NotificationList.css";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const NotificationList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No user found.</h2>
        </Card>
      </div>
    );
  }
  return (

      <Col md={{ span: 10, offset: 1 }}>
      {props.items.map(user => {
        return (
          <NotificationItem
            id={user.id}
            type={user.type}
            image={user.image}
            key={user.key}
            name={user.userName}
            date={user.date}
            link={user.link}
          />
        );
      })}
      </Col>
  );
};

export default NotificationList;

