require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bcrypt = require('bcryptjs');

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
const Capster = db.capster;
const Service = db.service;
const Booking = db.booking;

async function initial() {
  // create roles
  Role.create({
    id: 1,
    name: 'user'
  });
  Role.create({
    id: 2,
    name: 'admin'
  });

  // create users
  const customer = await User.create({
    username: 'user1',
    email: 'user1@barber.com',
    password: bcrypt.hashSync('123456', 8),
    freezeExpiryDate: null
  })
  customer.setRoles([1])
  const userAdmin = await User.create({
    username: 'admin',
    email: 'admin@barber.com',
    password: bcrypt.hashSync('123456', 8),
    freezeExpiryDate: null
  })
  userAdmin.setRoles([2])

  // create capsters
  Capster.create({
    name: 'Rizky',
    placeOfBirth: 'Mojokerto',
    dateOfBirth: '1998-12-29 00:00:00',
    gender: 'M'
  })
  Capster.create({
    name: 'Gunawan',
    placeOfBirth: 'Denpasar',
    dateOfBirth: '1995-10-11 00:00:00',
    gender: 'M'
  })
  Capster.create({
    name: 'Fajar',
    placeOfBirth: 'Jakarta',
    dateOfBirth: '2000-01-21 00:00:00',
    gender: 'M'
  })

  // create services
  const basicCut = await Service.create({
    name: 'Basic Cut',
    price: 35000
  })
  Service.create({
    name: 'Hair Color',
    price: 80000
  })
  Service.create({
    name: 'Hair Perming',
    price: 250000
  })

  // create bookings
  const booking1 = await Booking.create({
    date: '2023-12-30 01:39:48',
    time: 19,
    isDone: false
  })
  customer.addBooking(booking1)
  basicCut.addBooking(booking1)
}

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to barber application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
