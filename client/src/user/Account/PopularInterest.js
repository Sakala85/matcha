import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {useCookies} from "react-cookie";
import { Modal } from "react-bootstrap";

const PopularInterest = (props) => {
  const [loadedInterest, setLoadedInterest] = useState();
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/interest/${cookies.userId}`,
          "GET",
          null,
          {
            authorization: "Bearer " + cookies.token,
          }
        );
        setLoadedInterest(responseData.interest);
      } catch (err) {}
    };
    fetchInterest();
  }, [sendRequest, cookies.token, cookies.userId]);

//   const UpdateSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       await sendRequest(
//         `http://localhost:5000/api/user/interest/${cookies.userId}`,
//         "POST",
//         JSON.stringify({
//           interest: formState.inputs.interest.value,
//         }),
//         {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + cookies.token,
//         }
//       );
//     } catch (err) {}
//   };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Modal.Header className="title">
        <div className="titleUpdate">Popular Interest</div>
      </Modal.Header>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {!isLoading && loadedInterest ? (
          <ul className="interest">
          {loadedInterest.map((item) => (
            <button key={item.id}>#{item.interest}</button>
          ))}
        </ul>
      ) : (
          <h1>No more suggestion</h1>
      )
      }
    </React.Fragment>
  );
};

export default PopularInterest;
