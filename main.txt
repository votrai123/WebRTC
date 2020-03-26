const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
    appId: '968603',
    key: 'e2584ae45ff7673a1b25',
    secret: 'efcd67fd8e67470d8c3e',
    cluster: 'ap1',
    encrypted: true
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

//listen on the app
app.listen(5000, () => {
    return console.log('Server is up on 3000')
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
function openStream() {
  const config = { audio: false, video: true };
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
  const video = document.getElementById(idVideoTag);
  video.srcObject = stream;
  video.play();
}

// openStream().then(stream => playStream("selfview", stream));
