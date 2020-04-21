import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { AuthContext } from "../../../shared/context/auth-context";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState([]);
  const ENDPOINT = "localhost:5000";
  const auth = useContext(AuthContext);

  useEffect(() => {
    const { name, room, roomName } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    setRoomName(roomName);
    socket.emit("join", { name, room }, (error) => {
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
      Holdmessages.result.map((Holdmessage) => {
        mess = {
          user: Holdmessage.username,
          text: Holdmessage.message,
          date: Holdmessage.date,
        };
        setMessages([...messages, mess]);
        return null;
      });
    });

    socket.on("roomData", ({ users }) => {
      if (!users[1]) {
        setOnline(false);
      } else {
        setOnline(true);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(messages);
    if (message) {
      socket.emit("sendMessage", auth.userId, room, message, () =>
        setMessage("")
      );
    }
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
