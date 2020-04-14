import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

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
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room, roomName } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoomName(roomName);
    const id_user1 = 41;
    const id_user2 = 43;
    socket.emit("join", { name, room, id_user1, id_user2 }, (error) => {
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
      console.log(Holdmessages.result);
      let mess;
      Holdmessages.result.map((Holdmessage) => {
        mess = { user: "mo", text: Holdmessage.message }
        setMessages([...messages, mess]);
        console.log("OL")
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

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(messages)
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
