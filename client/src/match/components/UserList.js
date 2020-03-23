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
        <ul>
      {props.items.map(user => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            picture={user.picture1}
            username={user.username}
            bio={user.bio}
            gender={user.gender}
            // A ecrire en Anglais (gender) (pas test encore)
            age={user.age}
            popularity={user.popularity}
            online={user.online}
            // Ajouter les autres photos
            // A Changer par une var Online (pas test)
          />
        );
      })}
      </ul>
      </Col>
  );
};

export default UserList;

