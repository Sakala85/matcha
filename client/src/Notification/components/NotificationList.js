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
      {props.items.map(item => {
        return (
          <NotificationItem
            type={item.type}
            image={item.picture1}
            key={item.id}
            name={item.username}
            date={item.date}
            link=""
          />
        );
      })}
      </Col>
  );
};

export default NotificationList;

