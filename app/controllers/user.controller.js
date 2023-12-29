const db = require('../models');
const User = db.user;
const Role = db.role;

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role
    });
    res.status(200).send(users.map(user => {
      const authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
      }
    }))
  } catch {
    res.status(500).send('Error. Please try again next time.');
  }
}
