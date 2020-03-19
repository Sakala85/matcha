import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";

const UpdateUser = () => {
  const USER = {
      key: "1",
      name: "Obama",
      image: require("../../img/profile_picture/obama.jpg"),
      bio: "Coucou moi c'est Obama President des Etats Unis :)",
      interest: ["politic", "music", "movies", "food"],
      gender: "Man",
      orientation: "Woman",
      age: "44", 
      email: "obama@president.president",
      score: "33",
      online: "Online",
      id: "U1",
      coordinates:{
          lat: 40.7484405,
          lng: -73.9878584
      }
    };
  return (
    <FormUser items={USER} />
  )
};

export default UpdateUser;
