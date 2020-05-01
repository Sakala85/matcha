import React, { useEffect, useContext, useState } from "react";
import io from "socket.io-client";
import { store } from "react-notifications-component";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../shared/context/auth-context";
import "./socketClient.css";
let socket;

const SocketClient = (props) => {
  const ENDPOINT = "localhost:5000";
  const [cookies, setCookie] = useCookies(["token"]);
  const [cookieSet, setCookieSet] = useState(false);
  const [notifNumber, setNotifNumber] = useState(cookies.notification);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (cookies.token && !cookieSet) {
      socket = io(ENDPOINT);

      const username = cookies.username;
      const userId = cookies.userId;
      socket.emit("connectNew", { username, userId }, (error) => {
        if (error) {
          alert(error);
        }
      });
      setCookieSet(true);
    }
  }, [ENDPOINT, cookies, cookieSet]);

  const notifReset = () => {
    setNotifNumber("0");
  };
  useEffect(() => {
    if (socket) {
      socket.on("notifPusher", (param) => {
        auth.addNotification();
        let notifFinal = +notifNumber;
        notifFinal++;
        setNotifNumber(notifFinal);
        setCookie("notification", notifFinal);
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
            onScreen: true,
          },
        });
      });
      return () => {
        socket.emit("disconnect");
        socket.off("notifPusher");
      };
    }
  }, [cookies, setCookie, auth, notifNumber]);
  return (
    <button className="notif_number" onClick={notifReset}>
      {notifNumber}
    </button>
  );
};

export default SocketClient;
