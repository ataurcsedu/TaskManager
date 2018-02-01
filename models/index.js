var sequelize = require('../db/connection.js');

var models = [                 
  'User',
  'Tasks',
  'Mac_address',
  'Calendar',
  'Usercalendar'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});