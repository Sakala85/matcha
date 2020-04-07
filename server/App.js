const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const matchRoutes = require("./routes/match-routes");
const userRoutes = require("./routes/user-routes");
const interestRoutes = require("./routes/interest-routes");
const notifRoutes = require("./routes/notification-routes");
const chatRoutes = require("./routes/chat-routes");
const configRoutes = require("./config/configDatabase");
const HttpError = require("./models/http-error");
const app = express();
global.db = require("./connexionDB");

app.use(bodyParser.json());

app.use('/uploads/img', express.static(path.join('uploads', 'img')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use("/api/user", userRoutes);
app.use("/api/user/match", matchRoutes);
app.use("/api/user/notification", notifRoutes);
app.use("/api/user/interest", interestRoutes);
app.use("/api/user/:uid/chat", chatRoutes);
app.use("/api/config", configRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured !" });
});

app.listen(5000);
