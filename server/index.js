//Définition des modules
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');

// //Connexion à la base de donnée
// mongoose
//   .connect("mongodb://localhost/db")
//   .then(() => {
//     console.log("Connected to mongoDB");
//   })
//   .catch((e) => {
//     console.log("Error while DB connecting");
//     console.log(e);
//   });

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');


// //On définit notre objet express nommé app
const app = express();

const server = http.createServer(app);
const io = socketio(server);

// //Body Parser
// const urlencodedParser = bodyParser.urlencoded({
//   extended: true
// });
// app.use(urlencodedParser);
// app.use(bodyParser.json());

// //Définition des CORS
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors());
app.use(router);


io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});



server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));