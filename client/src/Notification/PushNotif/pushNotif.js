import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../shared/context/auth-context";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

let socket;
const PushNotif = props => {
  const auth = useContext(AuthContext);

  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const username = auth.username;
    socket = io(ENDPOINT);
    if (username !== false && username !== null) { 
    const userId = auth.userId;
    socket.emit("connectNew", { username, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }
  }, [ENDPOINT, auth.username, auth.userId]);

  useEffect(() => {
    socket.on("notifPusher", (param) => {
      store.addNotification({
        title: `${param.username}`,
        message: `${param.type} your profile`,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    });
    return () => {
      socket.off();
    }
  }, [ENDPOINT, props.username]);
  return <div className="app-container">
  <ReactNotification />
</div>;
};

export default PushNotif;
