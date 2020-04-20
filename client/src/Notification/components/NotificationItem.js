import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Icon from "@material-ui/core/Icon";

import "./NotificationItem.css";

const NotificationItem = props => {
  const Message = () => {
    if (props.type === "Like") {
      return <h4 className="title__card"> <Icon>favorite</Icon> <span>Like your profil</span></h4>;
    }
    if (props.type === "Visit") {
      return  <h4 className="title__card"><Icon color="primary">visibility</Icon><span >Visit your profil</span> </h4>;
    }
    if (props.type === "Chat") {
      return <h4 className="title__card"> <Icon>chat</Icon><span>Send you a new message</span></h4>;
    }
  };

  return (
    <div>
      <Image src={props.image} roundedCircle className="image__notif" />
      <h7 className="title__card">{props.date}</h7>
      <h2 className="title__card">{props.name}</h2>
      <Message src={Message()}></Message>
      <br></br>
    </div>
  );
};

export default NotificationItem;
