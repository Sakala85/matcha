import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
  // const [isLoading, setisLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [loadedUser, setLoadedUser] = useState(false);

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setisLoading(true);
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/users/35`);
  //       const responseData = await response.json();
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }
  //       setLoadedUser(responseData.users);
  //       setisLoading(false);
  //     } catch (err) {
  //       setisLoading(false);
  //       setError(err.message);
  //     }
  //   };
  //   sendRequest();
  // }, []);

  // const errorHandler = () => {
  //   setError(null);
  // };
  return (
    // <React.Fragment>
    //   <ErrorModal error={error} onClear={errorHandler} />
    //   {isLoading && (
    //     <div className="center">
    //       <LoadingSpinner />
    //     </div>
    //   )}
    //   {!isLoading && loadedUser && 
      <FormUser items={USER} />
    //   };
    // </React.Fragment>
  );
};

export default UpdateUser;
