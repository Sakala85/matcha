import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";
import { Card } from "react-bootstrap";
import {useCookies} from "react-cookie";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdateUser = () => {
  const [cookies] = useCookies(['token']);
  const [loadedUser, setLoadedUser] = useState(false);
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${cookies.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + cookies.token,
          }
        );
        // ! UID (16) === UID AuthUser
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, cookies]);

  if (!loadedUser) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find your profile!</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        <div>
          {loadedUser.map((item) => (
            <span key={item.id}>
              <FormUser items={item} />
            </span>
          ))}
        </div>
      }
      ;
    </React.Fragment>
  );
};

export default UpdateUser;
