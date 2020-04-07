import React, { useEffect, useState, useContext } from "react";
import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const Match = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (auth.userId !== false) {
        const responseData = await sendRequest(
          // Il faudra mettre ca en restful
          // `http://localhost:5000/api/users/${auth.userId}/matchs/`,
          /********************************************************* */
          `http://localhost:5000/api/user/match/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedUsers(responseData.user.result);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.token, auth.userId]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};
export default Match;
