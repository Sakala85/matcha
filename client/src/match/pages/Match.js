import React, { useEffect, useState } from "react";
import FilterMatch from "../components/FilterMatch";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useCookies } from "react-cookie";

const Match = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [cookies] = useCookies(["token"]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (cookies.userId !== false) {
          const responseData = await sendRequest(
            // Il faudra mettre ca en restful
            // `http://localhost:5000/api/users/${auth.userId}/matchs/`,
            /********************************************************* */
            `http://localhost:5000/api/user/match/${cookies.userId}/${cookies.orientation}`,
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
  }, [sendRequest, cookies]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <FilterMatch items={loadedUsers} />}
      {!isLoading && !loadedUsers && <h2>No Match possible found</h2>}
    </React.Fragment>
  );
};
export default Match;
