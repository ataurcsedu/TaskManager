const Mac_address = require('../models').Mac_address;
const successTypes = require('../helpers/success-types');
const Utils = require('../helpers/Utils');
const responseManager = require('../helpers/response-manager');
var Sequelize = require('../db/connection.js');
const Calendar = require('../models').Calendar;
const Usercalendar = require('../models').Usercalendar;
const today = new Date().toJSON().slice(0,10);
const time =new Date();



const getMac = (req, res) => {
    var query = "select * from mac_address where mac='"+req.params.mac+"'";

    Sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT}).then(function(mac){
        if(mac=='' || typeof mac == 'undefined' || mac.length ==0){
            res.json({message:"You are not connected to office router",success:false});    
        }else{
            Calendar.findOne({
                where:{dates:today},
                attributes: ['id','dates']
            }).then(function(calendar){
                calendar = calendar.toJSON();
                Usercalendar.findOrCreate({
                    where:{
                        userId:req.user.dataValues.id,
                        calId:calendar.id,
                        dates:calendar.dates,
                        checkIn:1
                    },
                    defaults:{
                        //times:"'"+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+"'"
                    }
                }).spread((usercalendar,created) =>{
                    if(!created){ //row inserted already. find the column
                         res.json({message:"You are already checked in.",success:false});
                         console.log(usercalendar.toJSON())
                    }else{
                        usercalendar = usercalendar.toJSON();
                        console.log(usercalendar)
                        res.json({message:"Checked in successfully.",success:true});
                    }
                    
                    
                })

                
            })

        }
    })
    .catch((err) => res.json({message:err,success:false})) 
    
  }


  const checkOut = (req, res) => {
    var query = "select * from mac_address where mac='"+req.params.mac+"'";

    Sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT}).then(function(mac){
        if(mac=='' || typeof mac == 'undefined' || mac.length ==0){
            res.json({message:"You are not connected to office router",success:false});    
        }else{
            Calendar.findOne({
                where:{dates:today},
                attributes: ['id','dates']
            }).then(function(calendar){
                calendar = calendar.toJSON();
                Usercalendar.findOne({
                    where:{
                        userId:req.user.dataValues.id,
                        calId:calendar.id,
                        dates:calendar.dates,
                        checkIn:1
                    }
                }).then((usercalendar) =>{
                    if(usercalendar==null){ //row inserted already. find the column
                         res.json({message:"You must check in first to check out.",success:false});
                    }else{
                        usercalendar = usercalendar.toJSON();
                        console.log(usercalendar);
                        if(usercalendar.checkOut==1){
                            res.json({message:"You are already checked out.",success:true});
                        }else{
                            Usercalendar.update({checkOut:1}, {where:{id:usercalendar.id}}).then((success)=>{
                                res.json({message:"Check out successfully.",success:true});
                            }).catch((err)=>{
                                res.json({message:"Check out failed.",success:false});
                            })
                        }
                        
                        
                        
                    }
                    
                    
                }).catch((err)=>{
                     res.json({message:err,success:false});
                })

                
            })
        }
    }).catch((err) => res.json({message:err,success:false})) 
    
  }

  module.exports = {
    getMac,
    checkOut
  }