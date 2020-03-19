import React from "react";
import UserList from "../components/UserList";

const Match = () => {
  const USER = [
    {
      key: "1",
      name: "Obama",
      image: require("../../img/profile_picture/obama.jpg"),
      bio: "Coucou moi c'est Obama President des Etats Unis :)",
      interest: ["politic", "music", "movies", "food"],
      gender: "man",
      age: "44",
      score: "33",
      online: "Online",
      id: "U1",
      coordinates:{
          lat: 40.7484405,
          lng: -73.9878584
      }
    },
    {
      key: "2",
      name: "Julie",
      image: require("../../img/profile_picture/julie.jpg"),
      bio: "Coucou moi c'est Julie de Tinder",
      interest: ["politic", "music", "movies", "meeting"],
      gender: "girl",
      age: "27",
      score: "330",
      online: "Online",      
      id: "U2",
      coordinates:{
        lat: 48.896607,
        lng: 2.3163123
    }
    }
  ];

  return <UserList items={USER} />;
};
export default Match;
