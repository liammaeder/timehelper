const express           = require('express');
const app               = express();
const cors              = require('cors');
// const https             = require('https');
// const fs                = require('fs');
const participantsRoute = require('./routes/api/participantsRoutes');
const racesRoute        = require('./routes/api/racesRoutes');
const racersRoute       = require('./routes/api/racersRoutes');
const usersRoute        = require('./routes/api/userRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
   res.json({ data: 'Connection to src success' });
});

app.use('/participants', participantsRoute);
app.use('/races', racesRoute);
app.use('/racers', racersRoute);
app.use('/users', usersRoute);

// https.createServer(
//     app
// ).listen(8000, () => {
//    console.log('listening on port 8000');
// })

// const port = process.env.NODE_PORT || 8000;
//
app.listen(8000, () => {
   console.log(`Node.js HTTP server is running on port ${8000}`);
});