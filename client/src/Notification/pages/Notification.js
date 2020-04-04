import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NotificationList from "../components/NotificationList";

const Notification = () => {
  const [loadedNotif, setLoadedNotif] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const responseData = await sendRequest(
          // Il faudra mettre le ID User
          /********************************************************* */
          "http://localhost:5000/api/user/notification/20"
        );
        setLoadedNotif(responseData.notification);
      } catch (err) {}
    };
    fetchNotif();
  }, [sendRequest]);
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
