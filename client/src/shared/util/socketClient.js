import { useEffect, useContext } from "react";
import io from "socket.io-client";
import { store } from "react-notifications-component";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../shared/context/auth-context";
let socket;

const SocketClient = () => {
  const ENDPOINT = "localhost:5000";
  const [cookies, setCookie] = useCookies(["token"]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (cookies.token) {
      socket = io(ENDPOINT);

      const username = cookies.username;
      const userId = cookies.userId;
      socket.emit("connectNew", { username, userId }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [ENDPOINT, cookies]);
  console.log(socket);

  useEffect(() => {
    socket.on("notifPusher", (param) => {
      auth.addNotification();
      console.log("notfi received");
      let notifNumber = +cookies.notification;
      notifNumber++;
      setCookie("notification", notifNumber);
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
  }, [cookies, setCookie, auth]);
  return null;
};

export default SocketClient;
