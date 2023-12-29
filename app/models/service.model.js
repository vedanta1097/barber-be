module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define('services', {
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  });

  return Service;
};
