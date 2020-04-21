import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ChatItem.css";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";



const ChatItem = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();


  const unmatchProfile = async () => {
    try {
    await sendRequest(
        `http://localhost:5000/api/user/match/${auth.userId}`,
        "DELETE",
        JSON.stringify({
          unmatched: props.id,
          
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  const link = `/chat?name=${props.username}&room=${props.room_id}&roomName=${props.name}`;
  return (
    <Link to={link} key={props.room_id}>
      <Card className="bg-dark text-white card__container_notif">
        <Row>
          <Col>
            <Image src={props.image} roundedCircle className="image__notif" />
            <h3 className="title__card">{props.name}</h3>
          </Col>
          <Col><h3 className="title__card">Open Chat Room</h3></Col>
          <Col><button onClick={unmatchProfile}>UNMATCH</button></Col>
        </Row>
      
      </Card>
    </Link>
  );
};

export default ChatItem;
