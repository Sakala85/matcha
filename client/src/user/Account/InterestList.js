import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import InterestItem from "./InterestItem";
import { AuthContext } from "../../shared/context/auth-context";

const InterestList = () => {
  const [loadedInterest, setLoadedInterest] = useState();
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/interest/${auth.userId}`,
          "GET",
          null,
          {
            authorization: "Bearer " + auth.token,
          }
        );
        setLoadedInterest(responseData.interest);
      } catch (err) {}
    };
    fetchInterest();
  }, [sendRequest, auth.token, auth.userId]);

  const interestDeleteHandler = (deletedInterestId) => {
    setLoadedInterest((prevInterest) =>
      prevInterest.filter((interest) => interest.id !== deletedInterestId)
    );
  };
  if (!loadedInterest) {
    return (
      <div className="center">
        <h2>
          You don't have Interest Yet you must add at least one for start
          matching !
        </h2>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal show={error} error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        <ul>
          {loadedInterest.map((item) => (
            <InterestItem
              key={item.id}
              id={item.id}
              interest={item.interest}
              onDelete={interestDeleteHandler}
            />
          ))}
        </ul>
      }
    </React.Fragment>
  );
};

export default InterestList;
