const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db_user = process.env.MYSQL_USER || 'root'
const db_password = process.env.MYSQL_PASSOWRD || 'civs'
const db_host = process.env.MYSQL_HOST || '192.168.103.18'

const sequelize = new Sequelize('taskmanager', db_user, db_password, {
  host: db_host,
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
