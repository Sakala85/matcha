import React from "react";
import UserList from "../components/UserList";

const Match = () => {
  const USER = [
    {
      key: "1",
      name: "Obama",
      image: require("../../img/profile_picture/obama.jpg"),
      placeCount: "5",
      id: "U1"
    },
    {
      key: "2",
      name: "Julie",
      image: require("../../img/profile_picture/julie.jpg"),
      placeCount: "5",
      id: "U2"
    }
  ];

  return <UserList items={USER} />;
};
export default Match;
