// const express = require("express");
// const bodyParser = require("body-parser");
// const Pusher = require("pusher");
// const app = express();
// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // Session middleware

// // Create an instance of Pusher
// const pusher = new Pusher({
//   appId: "968603",
//   key: "e2584ae45ff7673a1b25",
//   secret: "efcd67fd8e67470d8c3e",
//   cluster: "ap1",
//   encrypted: true
// });

// app.get("/", (req, res) => {
//   return res.sendFile(__dirname + "/index.html");
// });

// // get authentictation for the channel;
// app.post("/pusher/auth", (req, res) => {
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;
//   var presenceData = {
//     user_id:
//       Math.random()
//         .toString(36)
//         .slice(2) + Date.now()
//   };
//   const auth = pusher.authenticate(socketId, channel, presenceData);
//   res.send(auth);
// });

// //listen on the app
// app.listen(4004, () => {
//   return console.log("Server is up on 4004");
// });

// pusher-encrypted-channels-node/server/index.js

require("dotenv").config({ path: "variable.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_APP_KEY,
//   secret: process.env.PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_APP_CLUSTER,
//   useTLS: true,
//   encryptionMasterKey: process.env.PUSHER_CHANNELS_ENCRYPTION_KEY
// });
// Create an instance of Pusher
const pusher = new Pusher({
  appId: "968603",
  key: "e2584ae45ff7673a1b25",
  secret: "efcd67fd8e67470d8c3e",
  cluster: "ap1",
  encrypted: true,
  auth: {
    params: {
      CSRFToken: "csrf_token"
    }
  },
  disableStats: true,
  forceTLS: false
});

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
    user_id:
      Math.random()
        .toString(36)
        .slice(2) + Date.now()
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

// app.post("/pusher/auth", function(req, res) {
//   var socketId = req.body.socket_id;
//   var channel = req.body.channel_name;
//   var auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
// });

app.set("port", process.env.PORT || 4004);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running on port ${server.address().port}`);
});
