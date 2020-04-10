import React from "react";

import ChatItem from "./ChatItem";
import "./ChatList.css";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const ChatList = (props) => {
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
      {props.items.map((user) => {
        return (
          <ChatItem
            id={user.id}
            image={user.picture1}
            key={user.id}
            name={user.username}
            username={props.userName}
          />
        );
      })}
    </Col>
  );
};

export default ChatList;
