import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";
import { Card } from "react-bootstrap";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
// import { AuthContext } from '../../shared/context/auth-context';

const UpdateUser = () => {
  // const auth = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState(false);
  const { isLoading, error, sendRequest, clearError, errorMessage } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/user/16`);
        // ! UID (16) === UID AuthUser
        setLoadedUser(responseData.user);
      } catch (err) {
      }
    };
    fetchUser();
  }, [sendRequest]);

  if (!loadedUser && !error) {
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
      <ErrorModal show={error} error={errorMessage} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        <ul>
        {loadedUser.map(item => (
          <li key={item.id}>
      <FormUser items={item} />
          </li>
        ))}
      </ul>
      };
    </React.Fragment>
  );
};

export default UpdateUser;
