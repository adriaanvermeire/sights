require('dotenv').config();
const path = require('path');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const users = require('./routes/users');

mongoose.connect(process.env.DB_SERVER);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection to database succeeded!');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


const routes = {
  users,
};

app.use('/users', routes.users);

app.get('/', (req, res) => {
  res.send('Sights API');
});

app.listen(process.env.PORT || 8081);
