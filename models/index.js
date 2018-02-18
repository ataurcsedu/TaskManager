var sequelize = require('../db/connection.js');

var models = [                 
  'User',
  'Tasks',
  'Mac_address',
  'Calendar',
  'Usercalendar',
  'Countcache'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});