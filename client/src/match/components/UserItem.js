import React from "react";
// import { Link } from "react-router-dom";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import "./UserItem.css";

const UserItem = props => {
  console.log(props.image);
  return (
    <Card className="bg-dark text-white card__container">
      <Row>
        <Col>1 of 3</Col>
        
        <Col>
          <Image src={props.image} roundedCircle className="image__profile" />
          <h1 className="title__card">{props.name}</h1>
          <Container className="card_center">
            <Row>
              <Col xs={6}>
                <Card.Link href="#" className="like_dislike">
                  <Image
                    src={require("../../img/iconProfile/heart.png")}
                    width="50px"
                    height="50px"
                  />
                </Card.Link>
              </Col>
              <Col xs={6}>
                <Card.Link href="#" className="like_dislike">
                  <Image
                    src={require("../../img/iconProfile/remove.png")}
                    width="50px"
                    height="50px"
                  />
                </Card.Link>
              </Col>
            </Row>
          </Container>
        </Col>

        <Col>3 of 3</Col>
      </Row>
    </Card>
  );
};

export default UserItem;
