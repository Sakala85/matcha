import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ChatItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {useCookies} from "react-cookie";
import { Modal } from "react-bootstrap";
import { Icon } from "@material-ui/core";
import history from "../../../shared/components/Navigation/history";

const ChatItem = props => {
  const { sendRequest } = useHttpClient();

  const [cookies] = useCookies(['token']);

  const unmatchProfile = async () => {
    try {
    await sendRequest(
        `http://localhost:5000/api/user/match/${props.id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        }
      );
      history.push({
        pathname: "/join",
      });
    } catch (err) {}
  };

      const reportProfile = async () => {
        // setShowDetail(false); //SEND A VISIT NOTIF
        try {
          await sendRequest(
            `http://localhost:5000/api/user/match/report/${cookies.userId}`,
            "POST",
            JSON.stringify({
              reported: props.id,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.token,
            }
          );
        } catch (err) {}
      };

      const blockProfile = async () => {
        // setShowDetail(false); //SEND A VISIT NOTIF
        try {
          await sendRequest(
            `http://localhost:5000/api/user/match/block/${cookies.userId}`,
            "POST",
            JSON.stringify({
              blocked: props.id,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.token,
            }
          );
        } catch (err) {}
      };
  const link = `/chat?name=${props.username}&room=${props.room_id}&roomName=${props.name}`;
  return (
    <Card className="card-chat">
      <Modal.Header className="title">
        <h3 className="title__chat">The Love begin here ! </h3>
      </Modal.Header>
      <Row>
        <Link to={link} key={props.room_id}>
          <Col>
            <Image src={props.image} roundedCircle className="image__chat" />
            <h2 className="title__card">{props.name}</h2>
          </Col>
        </Link>
        <Col className="bouton_report">
          <Row>
            <button className="button__report" onClick={unmatchProfile}>
              Unmatch <Icon className="chaticon" color="primary">delete_forever</Icon>
            </button>
          </Row>
          <Row>
            <button className="button__report" onClick={reportProfile}>
              Report <Icon className="chaticon" color="primary">report</Icon>
            </button>
          </Row>
          <Row>
            <button className="button__report" onClick={blockProfile}>
              Block <Icon className="chaticon" color="primary">block</Icon>
            </button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ChatItem;
