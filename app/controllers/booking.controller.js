const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth.config.js');
const Booking = db.booking;

exports.addBooking = async (req, res) => {
  try {
    // create new booking
    const newBooking = await Booking.create({
      date: req.body.date,
      time: req.body.time,
      isDone: false
    })

    // add user and service to the booking
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, config.secret)
    const asdasd = await Promise.all([
      newBooking.setUser(decoded.id),
      newBooking.setService(req.body.serviceId)
    ])

    res.status(200).send({
      message: 'Booking is successfully created'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.doneBooking = (req, res) => {
  try {
    res.status(200).send({
      message: 'Booking is successfully completed'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.getBookings = (req, res) => {
  try {
    res.status(200).send({
      message: 'Return list of bookings'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.getMyBookings = (req, res) => {
  try {
    res.status(200).send({
      message: 'Return my list of bookings based on my token'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.getBookingsTime = (req, res) => {
  try {
    res.status(200).send({
      message: 'Return list of time that already booked in that date'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}


exports.deleteBooking = (req, res) => {
  try {
    res.status(200).send({
      message: 'Booking is successfully deleted'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

