import io from "socket.io-client";

const sendNotification = (id_user1, id_user2, type, token) => {
  const ENDPOINT = "localhost:5000";
  let socket = io(ENDPOINT);
  socket.emit('notifReceiver', { id_user1, id_user2, type }, (error) => {
    if(error) {
      alert(error);
    }
    console.log("Notif Send to the back")
  });
  try {
    fetch(`http://localhost:5000/api/user/notification/${id_user1}`, {
      method: "POST",
      body: JSON.stringify({
        id_user2: id_user2,
        type: type,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {}
};

export default sendNotification;
