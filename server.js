const express           = require('express');
const WebSocket         = require('ws');
const cors              = require('cors');
const bodyParser        = require('body-parser');
const participantRoutes = require('./routes/api/participantRoutes');
const raceRoutes        = require('./routes/api/raceRoutes');
const racerRoutes       = require('./routes/api/racerRoutes');
const userRoutes        = require('./routes/api/userRoutes');
const app               = express();

const server = app.listen(8000, () => {
   console.log(`Node.js HTTP server is running on port 8000`);
});

const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.json({ message: "api reached"});
});

app.use('/participant', participantRoutes);
app.use('/race', raceRoutes);
app.use('/racer', racerRoutes);
app.use('/user', userRoutes);

wss.on('connection', (ws) => {
   console.log("WebSocket connection established");

   ws.on('message', (message) => {
      console.log(message);

      ws.send('Message received loud and clear!');
   });


   ws.send('Hello WebSocket Client');
});