import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ChatList from "./ChatList";
import "./Join.css";
import {useCookies} from "react-cookie";

const SignIn = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (cookies.userId !== false) {
          const responseData = await sendRequest(
            // Il faudra mettre ca en restful
            // `http://localhost:5000/api/users/${auth.userId}/matchs/`,
            /********************************************************* */
            `http://localhost:5000/api/user/${cookies.userId}/matched`,
            "GET",
            null,
            {
              Authorization: "Bearer " + cookies.token,
            }
          );
          setLoadedUsers(responseData.matched);
        }
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest, cookies]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <ChatList items={loadedUsers} userName={cookies.username} />
      )}
    </React.Fragment>
  );
};

export default SignIn;
