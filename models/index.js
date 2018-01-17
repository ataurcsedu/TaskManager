var sequelize = require('../db/connection.js');

var models = [                 
  'Student',
  'User',
  'Tasks'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});