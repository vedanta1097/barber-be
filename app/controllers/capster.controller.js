const db = require('../models');
const User = db.capster;

exports.addCapster = async (req, res) => {
  try {
    res.status(200).send('Capster is successfully added.')
  } catch {
    res.status(500).send('Sorry, something went wrong on our end. Please try again later.');
  }
}

exports.updateCapster = async (req, res) => {
  try {
    res.status(200).send('Capster is successfully updated.')
  } catch {
    res.status(500).send('Sorry, something went wrong on our end. Please try again later.');
  }
}

exports.getCapsters = async (req, res) => {
  try {
    res.status(200).send('list of capsters')
  } catch {
    res.status(500).send('Sorry, something went wrong on our end. Please try again later.');
  }
}

exports.deleteCapster = async (req, res) => {
  try {
    res.status(200).send('Capster is successfully deleted')
  } catch {
    res.status(500).send('Sorry, something went wrong on our end. Please try again later.');
  }
}
