import React from "react";

import UserItem from "./UserItem";
import "./UserList.css";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const UserList = props => {
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
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            bio={user.bio}
            interest={user.interest}
            gender={user.gender}
            age={user.age}
            score={user.score}
            online={user.online}
            coordinates={user.coordinates}

          />
        );
      })}
      </Col>
  );
};

export default UserList;

