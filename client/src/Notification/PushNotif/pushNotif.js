import React, { useEffect } from "react";
import io from "socket.io-client";

const PushNotif = () => {
  const ENDPOINT = "localhost:5000";
  let socket = io(ENDPOINT);
  useEffect(() => {
    socket.on("notifPusher", (user) => {
      console.log("VOICI LA NOTFI")
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [socket])
  return <h1>Notif</h1>;
};

export default PushNotif;
