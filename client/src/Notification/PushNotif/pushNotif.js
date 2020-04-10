import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../shared/context/auth-context";

let socket;
const PushNotif = props => {
  const auth = useContext(AuthContext);

  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const username = auth.username;
    socket = io(ENDPOINT);
    socket.emit("connectNew", { username }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, auth.username]);

  useEffect(() => {
    socket.on("notifPusher", (user) => {
      console.log("Notif Received In the front ;)");
    });
  }, [ENDPOINT, props.username]);
  return <h1>NotifGestion</h1>;
};

export default PushNotif;
