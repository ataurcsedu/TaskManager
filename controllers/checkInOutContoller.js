const calendar = require('../models').Calendar;
const usercalendar = require('../models').Usercalendar;
const successTypes = require('../helpers/success-types');
const Utils = require('../helpers/Utils');
const responseManager = require('../helpers/response-manager');
var Sequelize = require('../db/connection.js');