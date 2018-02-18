var Sequelize = require('../db/connection.js');
const Countcache = require('../models').Countcache;



const updateCount = function a (){
    var getCount = 'SELECT ( SELECT COUNT(id) FROM user) AS userCount,( SELECT COUNT(id) FROM tasks) AS taskCount FROM dual;';
    Sequelize.query(getCount,{ type: Sequelize.QueryTypes.SELECT }).then((res)=>{
        var result = JSON.parse(JSON.stringify(res));
        //console.log(result[0].taskCount);
        //console.log(result[0].userCount);
        const updateData ={};
        updateData.countValue = result[0].userCount;
        Countcache.update(updateData,{where:{countKey:'USER_COUNT'}}).then(function(res){
            
        })

        updateData.countValue = result[0].taskCount;

        Countcache.update(updateData,{where:{countKey:'TASK_COUNT'}}).then(function(res){
            
        })

        

    })
}

const getCount = function getC(){
    Countcache.findAll({
        where:{}
      })
    .then(function(result){
        //console.log(JSON.stringify(result))
      return JSON.stringify(result);
    })
    .catch((err) => {return err})
}

function updateCountTable(){
    var getCount = 'SELECT ( SELECT COUNT(id) FROM user) AS userCount,( SELECT COUNT(id) FROM tasks) AS taskCount FROM dual;';
    Sequelize.query(getCount).then((res)=>{
        
    })
}

module.exports = {
    updateCount,
    getCount
  }