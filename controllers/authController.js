const bcrypt = require('bcryptjs'),
  User = require('../models/').User,
  errorTypes = require('../helpers/error-types'),
  successTypes = require('../helpers/success-types'),
  responseManager = require('../helpers/response-manager')

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '';





const login = (req, res) => {
  User.getByName(req.body.name) // Search user (by name) in database
    .then((user) => {
      if (!user)
        throw new errorTypes.AuthenticationError('Invalid Username/Password')

      return bcrypt.compare(req.body.password, user.password) // User found by the name, now check the password
    })
    .then((found) => {
      if (found)
        return responseManager.sendSuccess(res, successTypes.OK)

      throw new errorTypes.AuthenticationError('Invalid Username/Password')
    })
    .catch((err) => responseManager.sendError(res, err))
}





const getToken = (req, res) => {
  User.find({
        where:{status:'ACTIVE',username:req.body.username}
      },
      { 
        attributes: { exclude: ['password']}
      })
    .then((user) => {
      if (!user)
        throw new errorTypes.AuthenticationError('Invalid Username/Password')

      return bcrypt.compare(req.body.password, user.password) // User found by the name, now check the password
    })
    .then((found) => {
      if (found){
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
      }else{
          throw new errorTypes.AuthenticationError('Invalid Username/Password')
      }
      
    })
    .catch((err) => responseManager.sendError(res, err))
}


const register = (req, res) => {
  const saltRounds = 10

  User.getByName(req.body.name) // Search user (by name) in database
    .then((user) => {
      if (user)
        throw new errorTypes.DuplicateError('User is already exists by this \'name\'')

      return bcrypt.hash(req.body.password, saltRounds) // Create salted hash of the given password
    })
    .then((hash) => {
      req.body.password = hash
      return req.body
    })
    .then((data) => User.create(data))
    .then(() => responseManager.sendSuccess(res, successTypes.CREATED))
    .catch((err) => responseManager.sendError(res, err))
}

module.exports = {
  login,
  register,
  getToken
}