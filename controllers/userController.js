//const Student = require('../models').Student;
const User = require('../models').User;
const successTypes = require('../helpers/success-types');
const Utils = require('../helpers/Utils');
const responseManager = require('../helpers/response-manager');
const bcrypt = require('bcryptjs');

var passwordSalt = bcrypt.genSaltSync(10);




const getAllUsers = (req, res) => {
    
  User.findAll({
        where:{status:'1'},
        attributes: { exclude: ['password']}
      })
    .then((users) => responseManager.sendSuccess(res, successTypes.OK, users))
    .catch((err) => responseManager.sendError(res, err))
}

const getAllUsersWithId = (req, res) => {
    
  User.findAll({
        where:{status:'1'},
        attributes: ['id','userName']
      })
    .then(function(users){
      res.json({message:users,success:true})
    })
    .catch((err) => res.json({success:false,message:err}))
}

const getUserById = (req, res) => {
  User.findById(req.params.user_id ,{where:{status:'1'},attributes: { exclude: ['password']}})
    .then((user) => responseManager.sendSuccess(res, successTypes.OK, user))
    .catch((err) => responseManager.sendError(res, err))
}

const getUserByUserName = (req, res) => {
  User.findAll({
    where:{userName:req.params.user_name}
  })
  .then(function(users){
    res.json({message:users[0],success:true})
  })
  .catch(function(err){
    res.json({success:false,message:err})
  })
  
}

const updateUser = (req, res) => {
  const updateData ={};
  
  if(typeof req.body.password!='undefined' && req.body.password!=''){
    updateData.password = bcrypt.hashSync(req.body.password, passwordSalt)
  }
  if(typeof req.body.firstName!='undefined' && req.body.firstName!=''){
    updateData.firstName = req.body.firstName
  }
  if(typeof req.body.lastName!='undefined' && req.body.lastName!=''){
    updateData.lastName = req.body.lastName
  }
  if(typeof req.body.phone!='undefined' && req.body.phone!=''){
    updateData.phone = req.body.phone
  }
  if(typeof req.body.email!='undefined' && req.body.email!=''){
    updateData.email = req.body.email
  }
  if(typeof req.body.designation!='undefined' && req.body.designation!=''){
    updateData.designation = req.body.designation
  }
  if(typeof req.body.status!='undefined' && req.body.status!=''){
    updateData.status = req.body.status
  }

  //console.log(updateData);
  User.update(updateData,{where:{id:req.user.dataValues.id}})
  .then(() =>  res.json({success:true, message:"User updated successfully."}))
  .catch(function(err){res.json({success:false, error:err})})
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getAllUsersWithId,
  getUserByUserName
}

Date.prototype.yyyymmdd = function() {         
                                
        var yyyy = this.getFullYear().toString();                                    
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = this.getDate().toString();             
                            
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
   };

