const calendar = require('../models').Calendar;
const usercalendar = require('../models').Usercalendar;
const successTypes = require('../helpers/success-types');
const Utils = require('../helpers/Utils');
const responseManager = require('../helpers/response-manager');
var Sequelize = require('../db/connection.js');

const Calendar = require('../models').Calendar;
const Usercalendar = require('../models').Usercalendar;
const today = new Date().toJSON().slice(0,10);
const time =new Date();

const CHECKED_IN = 1;
const CHECKED_OUT = 2;

const getSummary = (req,res)=>{
    //console.log("ksjfjksd");
    Usercalendar.findAll({
        where:{userId:req.user.dataValues.id}
    
    }).then((uc) =>{
        res.json({message:uc,success:true});
        console.log(JSON.stringify(uc));
    }).catch((err)=>{
        res.json({message:"Error occured during search",success:false});
    })
}


module.exports = {
    getSummary
}