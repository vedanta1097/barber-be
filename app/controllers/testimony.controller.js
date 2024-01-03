const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const config = require("../config/auth.config.js");
const Testimony = db.testimony;

exports.addTestimony = async (req, res) => {
  try {
    // create new booking
    const newTestimony = await Testimony.create({
      date: req.body.date,
      rating: req.body.rating,
      description: req.body.description,
    });

    // add user to the testimony
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    await Promise.all([newTestimony.setUser(decoded.id)]);

    res.status(200).send({
      message: "Testimony is successfully created",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.findAll();
    res.status(200).send(testimonies);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.deleteTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByPk(req.params.id);
    if (!testimony) {
      return res.status(404).send({ message: "Testimony Not found." });
    }
    await Testimony.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "Testimony is successfully deleted",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};



