const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const notifRoutes = require("./routes/notification-routes");
const chatRoutes = require("./routes/chat-routes");
const configRoutes = require("./config/configDatabase");
const HttpError = require("./models/http-error");
const app = express();
const db = require("./connexionBD");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //On met des header pour eviter les CROS
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader("Acces-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});


app.use("/api/user", userRoutes);
app.use("/api/user/:uid/notification", notifRoutes);
app.use("/api/user/:uid/liked/chat", chatRoutes);
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
