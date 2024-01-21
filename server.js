const express           = require('express');
const app               = express();
const cors              = require('cors');
const bodyParser        = require('body-parser');
const participantsRoute = require('./routes/api/participantsRoutes');
const racesRoute        = require('./routes/api/racesRoutes');
const racersRoute       = require('./routes/api/racersRoutes');
const usersRoute        = require('./routes/api/userRoutes');

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.json({ message: "api reached"});
});

app.use('/participants', participantsRoute);
app.use('/races', racesRoute);
app.use('/racers', racersRoute);
app.use('/users', usersRoute);

app.listen(8000, () => {
   console.log(`Node.js HTTP server is running on port 8000`);
});