const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.capster = require('./capster.model.js')(sequelize, Sequelize);
db.service = require('./service.model.js')(sequelize, Sequelize);
db.booking = require('./booking.model.js')(sequelize, Sequelize);

// many to many user & role
db.role.belongsToMany(db.user, {
  through: 'user_roles'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles'
});

// user 1 to n booking
db.user.hasMany(db.booking)
db.booking.belongsTo(db.user)

// service 1 to n booking
db.service.hasMany(db.booking)
db.booking.belongsTo(db.service)

db.ROLES = ['user', 'admin'];

module.exports = db;
