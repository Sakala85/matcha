import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import { useCookies } from "react-cookie";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [cookies] = useCookies(["token"]);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room, roomName } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    setRoomName(roomName);
    socket.emit("join", { name, room, roomName }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("messages", (Holdmessages) => {
      let mess;
      const allMess = [];
      Holdmessages.result.map((Holdmessage) => {
        mess = {
          user: Holdmessage.username,  
          text: Holdmessage.message,
          date: Holdmessage.date,
        };
        allMess.push(mess);
        return null;
      });
      setMessages(allMess);
    });

    socket.on("roomData", ({ users }) => {
      if (!users) {
        setOnline(false);
      } else {
        setOnline(true);
      }
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", cookies.userId, room, message, () =>
        setMessage("")
      );
    }
    
    return () => {
      socket.off();
    };
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={roomName} online={online} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
