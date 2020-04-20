import React from "react";

import moment from "moment-timezone/builds/moment-timezone-with-data";

import NotificationItem from "./NotificationItem";
import "./NotificationList.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const timezone = "Europe/Paris";

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
    

      <div md={{ span: 10, offset: 1 }}>
      {props.items.map(item => {
        return (
          <Card className= "card-1">
            <NotificationItem
              type={item.type}
              image={item.picture1}
              key={item.id}
              name={item.username}
              date={moment(item.date).tz(timezone).format("DD/MM/YYYY HH:mm")}
              link=""
            />
          </Card>
        );
      })}
      </div>
  );
};

export default NotificationList;

