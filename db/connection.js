const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('taskmanager', 'root', 'civs', {
  host: '192.168.103.18',
  dialect: 'mysql',
  define: {
        timestamps: false
    },
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;
