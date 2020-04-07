import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NotificationList from "../components/NotificationList";
import { AuthContext } from "../../shared/context/auth-context";

const Notification = () => {
  const [loadedNotif, setLoadedNotif] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/notification/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token
          }
        );
        setLoadedNotif(responseData.notification);
      } catch (err) {}
    };
    fetchNotif();
  }, [sendRequest, auth.token, auth.userId]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !loadedNotif && <h1>You don't have any notification</h1>}
      {!isLoading && loadedNotif && <NotificationList items={loadedNotif} />}
    </React.Fragment>
  );
};

export default Notification;
