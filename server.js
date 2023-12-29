const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;
const User = db.user;

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  });

  Role.create({
    id: 2,
    name: 'admin'
  });

  User.create({
    username: 'admin',
    email: 'admin@barber.com',
    password: '123456',
    freezeExpiryDate: null,
  })
}

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
