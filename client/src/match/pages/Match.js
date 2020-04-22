import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useCookies} from "react-cookie";

const Match = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [cookies] = useCookies(['token']);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (cookies.userId !== false) {
        const responseData = await sendRequest(
          // Il faudra mettre ca en restful
          // `http://localhost:5000/api/users/${auth.userId}/matchs/`,
          /********************************************************* */
          `http://localhost:5000/api/user/match/${cookies.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + cookies.token,
          }
        );
        setLoadedUsers(responseData.user.result);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, cookies.token, cookies.userId]);
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
