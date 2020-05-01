const users = [];

const addUserBack = ({ id, username, userId }) => {
  const existingUser = users.find((user) => user.username === username);
  const user = { id, username, userId };
  if (!existingUser) {
    users.push(user);
  } else {
    const index = users.findIndex((user) => user.userId === userId);
    users[index].id = id;
  }
};

const getUserBack = (id) => {
  const user = users.find((user) => user.userId === String(id));
  return user;
};

const getUserBackByName = (username) => {
  const user = users.find((user) => user.username === String(username));
  return user;
};

const disconnectUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    users[index].id = "0";
    return(users[index].userId)
  } else {
    return 0;
  }
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  getUserBackByName,
  disconnectUser,
  getUsersInRoom,
  addUserBack,
  getUserBack,
};
