import React from 'react';

import ChatList from "./ChatList";
import './Join.css';

const CHAT = [
  {
      id:"2",
      userName: "Julie",
      image: require("../../../img/profile_picture/julie.jpg"),
      link: "/chat?name=moi&room=Julie",
      key: "2"
  },
  {
      id:"3",
      userName: "Obama",
      image: require("../../../img/profile_picture/obama.jpg"),
      link: "/chat?name=moi&room=Obama",
      key: "3"
  }
]

export default function SignIn() {
    return <ChatList items={CHAT} />;
}
