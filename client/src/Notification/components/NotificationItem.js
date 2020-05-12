import React from "react";
// import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
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
    if (props.type === "UnLike") {
      return <h4 className="title__card"> <Icon>favorite</Icon><span>Unlike your profile</span></h4>;
    }
    if (props.type === "Match") {
      return <h4 className="title__card"> <Icon>favorite</Icon><span>Mached with you !</span></h4>;
    }
  };
  const link = `http://localhost:3000/match?profile=${props.name}`
  return (
    <div>
      <Image src={props.image} roundedCircle className="image__notif" />
      <h6 className="title__card">{props.date}</h6>
      <a href={link}><h2 className="title__card">{props.name}</h2></a>
      <Message src={Message()}></Message>
      <br></br>
    </div>
  );
};

export default NotificationItem;
