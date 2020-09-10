const users = [];

const addUserBack = ({ id, username, userId }) => {
  const existingUser = users.find((user) => user.username === username);
  const user = { id, username, userId };
  console.log(user);
  if (!existingUser) {
    users.push(user);
    console.log("ID Added");
  } else {
    const index = users.findIndex((user) => user.userId === userId);
    users[index].id = id;
    console.log("ID MODIFIED");
  }
};

const getUserBack = (id) => {
  const user = users.find((user) => user.userId === String(id));
  return user;
};

const isOnline = (username) => {
  const user = users.find((user) => user.username === String(username));
  if (!user) {
    return false;
  } else {
    if (user.id === "0") {
      return false;
    } else {
      return user.id;
    }
  }
};

const disconnectUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    users[index].id = "0";
    return users[index].userId;
  } else {
    return 0;
  }
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  isOnline,
  disconnectUser,
  getUsersInRoom,
  addUserBack,
  getUserBack,
};
