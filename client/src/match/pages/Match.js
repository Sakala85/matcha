import React, { useEffect, useState } from "react";
import FilterMatch from "../components/FilterMatch";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useCookies } from "react-cookie";
import queryString from "query-string";

const Match = ({ location }) => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [cookies] = useCookies(["token"]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (cookies.userId !== false) {
          const responseData = await sendRequest(
            `http://localhost:5000/api/user/match/${cookies.userId}/${cookies.orientation}/${cookies.gender}`,
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
      {!isLoading && loadedUsers && (
        <FilterMatch
          items={loadedUsers}
          profile={queryString.parse(location.search)}
        />
      )}
      {!isLoading && !loadedUsers && <h2>No Match possible found</h2>}
    </React.Fragment>
  );
};
export default Match;
