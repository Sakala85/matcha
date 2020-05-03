import React, { useEffect, useContext, useState } from "react";
import io from "socket.io-client";
import { store } from "react-notifications-component";
import { useCookies } from "react-cookie";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./socketClient.css";
import { NavLink } from "react-router-dom";
import "../components/Navigation/NavLinks.css";
import Icon from "@material-ui/core/Icon";
let socket;

const SocketClient = (props) => {
  const ENDPOINT = "localhost:5000";
  const [cookies, setCookie] = useCookies(["token"]);
  const [cookieSet, setCookieSet] = useState(false);
  const [notifNumber, setNotifNumber] = useState(cookies.notification);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();


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

    const notifReset = async (e) => {
      if (
        cookies.userId !== false &&
        cookies.userId !== null &&
        cookies.token
      ) {
        try {
          await sendRequest(
            `http://localhost:5000/api/user/notification/${cookies.userId}`,
            "PATCH",
            null,
            {
              Authorization: "Bearer " + cookies.token,
            }
          );
          setCookie("notification", 0);
        } catch (err) {}
        
      }
      setNotifNumber("0");
      return 1;

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

            <NavLink to="/notification" onClick={notifReset}>
          <Icon className="navBouton"> notifications_none</Icon>
          {notifNumber}
        </NavLink>
  );
};

export default SocketClient;
