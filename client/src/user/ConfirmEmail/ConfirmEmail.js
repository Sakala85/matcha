import React, { useEffect, useState, useContext } from "react";
// import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
// import { AuthContext } from "../../shared/context/auth-context";

const ConfirmEmail = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const tokenEmail = useParams().tokenEmail;

  useEffect(() => {
    const confirmEmail = async () => {
      try {
          const responseData = await sendRequest(

            `http://localhost:5000/api/user/valid/${tokenEmail}`,
            "GET",
            null
          );
          setLoadedUsers(responseData.user.result);
      } catch (err) {

      }
    
    };
    confirmEmail();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading}
    </React.Fragment>
  );
};
export default ConfirmEmail;
