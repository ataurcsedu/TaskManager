const Tasks = require('../models').Tasks;
const successTypes = require('../helpers/success-types');
const Utils = require('../helpers/Utils');
const responseManager = require('../helpers/response-manager');
var Sequelize = require('../db/connection.js');


const getAllTasks = (req, res) => {
    const reqBody = req.body;
    var query = "SELECT t.id,t.taskTitle as title,t.taskDescription as description,t.progress, "+
    "case t.status when 1 then 'ACTIVE' when 2 then 'INACTIVE' when 3 then 'IN PROGRESS' when 4 then 'COMPLETED' end as status, "+
    "DATE_FORMAT(t.creationDate,'%d-%m-%Y') as creationDate, DATE_FORMAT(t.updatedDate,'%d-%m-%Y') as assignedOn, "+
    "a.userName as assignedBy ,b.userName as assigneeId, c.userName as createdBy FROM Tasks t "+
    "INNER JOIN User a ON t.assignedBy=a.id "+
    "INNER JOIN User b ON t.assigneeId=b.id "+
    "INNER JOIN User c ON t.createdBy=c.id "+
    "WHERE ";

    if(typeof reqBody.id!='undefined' && reqBody.id!=''){
      query+="t.id = "+reqBody.id+" and ";
    }
    if(typeof reqBody.title!='undefined' && reqBody.title!=''){
      query+="t.taskTitle LIKE "+"'%"+reqBody.title+"%'"+" and ";
    }

    if(typeof reqBody.description!='undefined' && reqBody.description!=''){
      query+="t.taskDescription LIKE "+"'%"+reqBody.description+"%'" +" and ";
    }
    if(typeof reqBody.assigneeId!='undefined' && reqBody.assigneeId!=''){
      query+="t.assigneeId = "+reqBody.assigneeId +" and ";
    }
    if(typeof reqBody.assignedBy!='undefined' && reqBody.assignedBy!=''){
      query+="t.assignedBy = "+reqBody.assignedBy +" and ";
    }
    if(typeof reqBody.progress!='undefined' && reqBody.progress!=''){
      query+="t.progress = "+reqBody.progress +" and ";
    }
    if(typeof reqBody.status!='undefined' && reqBody.status!=''){
      query+="t.status = "+reqBody.status +" and ";
    }else{
      
      query+="t.status = 1"+" and ";
    }
    
    query += " 1=1 ORDER BY t.id ASC";
    

    console.log(query);

    Sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
    .then(tasks=>{
      res.json({message:tasks,success:true});
    }).catch((err) => res.json({message:err,success:false}))

    /*
    Tasks.findAll({
          where:{
            TaskSearchCriteria
            /*taskTitle:{
              [Op.like] : '%'+TaskSearchCriteria.taskTitle+'%'
            },
            taskDescription:{
              [Op.like] : '%'+TaskSearchCriteria.taskDescription+'%'
            },
            status:{
              [Op.eq] : TaskSearchCriteria.status
            },
            progress:{
              [Op.eq] : TaskSearchCriteria.progress
            },
            assignedBy:{
              [Op.eq] : TaskSearchCriteria.assignedBy
            },
            assigneeId:{
              [Op.eq] : TaskSearchCriteria.assigneeId
            }
          },
          order:['id']
        })
      .then((tasks) => res.json({success:true,message:tasks}))
      .catch((err) => console.log(err))*/
}


const getTaskById = (req, res) => {
  console.log()
  if(Number.isInteger(parseInt(req.params.task_id))){
    var query = "SELECT t.id,t.taskTitle as title,t.taskDescription as description,t.progress, "+
    "case t.status when 1 then 'ACTIVE' when 2 then 'INACTIVE' when 3 then 'IN PROGRESS' when 4 then 'COMPLETED' end as status, "+
    "DATE_FORMAT(t.creationDate,'%d-%m-%Y') as creationDate, DATE_FORMAT(t.updatedDate,'%d-%m-%Y') as assignedOn, "+
    "a.userName as assignedBy ,b.userName as assigneeId, c.userName as createdBy FROM tasks t "+
    "INNER JOIN user a ON t.assignedBy=a.id "+
    "INNER JOIN user b ON t.assigneeId=b.id "+
    "INNER JOIN user c ON t.createdBy=c.id "+
    "WHERE t.id="+req.params.task_id;

    Sequelize.query(query,{ type: Sequelize.QueryTypes.SELECT})
    .then(tasks=>{
      res.json({message:tasks[0],success:true});
    }).catch((err) => res.json({message:err,success:false})) 
  }else{
    res.json({message:"Please provide a valid task id.",success:false})
  }
    
     

    /*Tasks.findById(req.params.task_id ,{where:{status:'1'}})
      .then((task) => res.json({success:true,message:task}))
      .catch((err) => res.json({success:false,message:err}))*/
}

const deleteTaskById = (req, res) => {
  Tasks.destroy({where:{id:req.params.task_id}})
    .then((task) => res.json({success:true,message:"Task deleted successfully."}))
    .catch((err) => res.json({success:false,message:err}))
}

const createTask = (req, res) => {
    //console.log(req.user.dataValues);
    Tasks.findOrCreate({
            where:{taskTitle:req.body.title},
            defaults:{
                taskDescription:req.body.description,
                createdBy:req.user.dataValues.id,
                assigneeId:req.body.assigneeId,
                assignedBy:req.user.dataValues.id,
                progress:req.body.progress,
                creationDate:(new Date()).toLocaleDateString(),
                updatedDate:(new Date()).toLocaleDateString(),
                versionId:1,
                status:req.body.status
            }
        }).spread((task,created)=>{
            if(created){
                //res.json({success:true,data:task});
                res.json({success:true,message:"Task Created Successfully.",id:task.id});
            }else{
                res.json({success:false,message:"Task already created."});
            }
            
        }).catch(function(err){
          console.log(err);
            res.json({message: "Task creation failed", success: false,cause:err});
        })
}


const updateTask = (req, res) => {
    var taskVersionId = "";
    const updateData ={};
    Tasks.findById(req.params.task_id)
      .then(function(task){
          if(typeof req.body.title!='undefined' && req.body.title!=''){
            updateData.taskTitle = req.body.title
          }
          if(typeof req.body.description!='undefined' && req.body.description!=''){
            updateData.taskDescription = req.body.description
          }
          if(typeof req.body.assigneeId!='undefined' && req.body.assigneeId!=''){
            updateData.assigneeId = req.body.assigneeId
          }
          if(typeof req.body.assignedBy!='undefined' && req.body.assignedBy!=''){
            updateData.assignedBy = req.user.dataValues.id // current user id
          }
          if(typeof req.body.progress!='undefined' && req.body.progress!=''){
            updateData.progress = req.body.progress
          }
          updateData.updatedDate = (new Date()).toLocaleDateString()
      
          if(typeof req.body.status!='undefined' && req.body.status!=''){
            updateData.status = req.body.status
          }
          
          updateData.versionId = parseInt(task.dataValues.versionId)+1;
          
          Tasks.update(updateData,{where:{id:req.params.task_id}})
          .then(() =>  res.json({success:true, message:"Task updated successfully."}))
          .catch(function(err){res.json({success:false, message:err})})
        
      })
  }


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTaskById
  }