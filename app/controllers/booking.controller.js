const db = require('../models');
const Booking = db.booking;

exports.addBooking = (req, res) => {
  try {
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
      message: 'Return list of bookings lalalalal'
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

