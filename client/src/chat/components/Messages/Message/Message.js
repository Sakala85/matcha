import React from 'react';

import './Message.css';
import moment from "moment-timezone/builds/moment-timezone-with-data";

const timezone = "Europe/Paris";

const Message = (props) => {
  let isSentByCurrentUser = false;

  const trimmedName = props.name.trim().toLowerCase();
  if(props.message.user.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{moment(props.message.date).tz(timezone).format("DD/MM HH:mm")}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{props.message.text}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{props.message.text}</p>
            </div>
            <p className="sentText pl-10 ">{moment(props.message.date).tz(timezone).format("DD/MM HH:mm")}</p>
          </div>
        )
  );
}

export default Message;