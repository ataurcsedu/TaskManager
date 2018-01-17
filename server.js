

var express = require('express');
var mysql = require("mysql");
var qs = require('querystring');
var cheerio     = require('cheerio');
var interceptor = require('express-interceptor');
var connection = require('./db/connection.js');
var Student = require('./models').Student;
var User = require('./models').User;
const routes = require('./routes');
const errorTypes = require('./helpers/error-types');
var bodyParser = require('body-parser')
var fs = require('fs')
var rfs = require('rotating-file-stream')
var path = require('path')
var morgan = require('morgan')
const Sequelize = require('sequelize')
/** for authentication */
const responseManager = require('./helpers/response-manager');
const bcrypt = require('bcryptjs');
var passwordSalt = bcrypt.genSaltSync(10);

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");
const Strategy = require('passport-local');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'sdfs';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  //console.log('payload received', jwt_payload);
  // usually this would be a database call:
  //console.log(jwt_payload['payload']['userName']);
  User.find({
        where:{status:"1",userName:jwt_payload['payload']['userName']}
      }).then((user) => {
          if(user!=''){
              next(null, user);
          }else{
              next(null, false);
          }
      });

});

passport.use(strategy);



connection
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.error('Unable to connect to the database:', err);
});





/*connection.transaction().then(function(t) {
    Student.create({
		departmentId:1,
		rollNumber:'12',
		name:'ataur',
        transaction: t
    }).then(function() {
        t.commit();
    }).catch(function(error) {
        console.log(error);
        t.rollback();
    });
});*/



var app = express();
app.use(passport.initialize());

// for better error handling

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send('Something broke!')
})


// for security purpose
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.use('/style',  express.static(__dirname + '/style'));

app.use(function(req, res, next){
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.all("/api/*", passport.authenticate('jwt', { session: false }))
app.use('/api/', routes);



/*

app.get('/',function(req,res){

  res.sendFile('home.html',{'root': __dirname + '/templates'});
})

app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/showSignUpPage',function(req,res){
  res.sendFile('signup.html',{'root':__dirname + '/templates'})
})

*/

var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
app.use(morgan('combined', {stream: accessLogStream}))

app.post('/token',function(req,res,next){
    //console.log(req.body);
    //console.log(req.body.password);
    User.find({
        where:{status:1,userName:req.body.userName}
      },
      { 
        attributes: { exclude: ['password']}
      })
    .then((user) => {
        if (!user){
            res.json({message: "Invalid user name", success:false});
        }else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                var payload = {userName: user.userName};
                var token = jwt.sign({exp : Math.floor(Date.now() / 1000) + (60*60), payload}, jwtOptions.secretOrKey);
                res.setHeader('jwt',token);
                res.json({message: "ok", token: token,expires_in:3600,success:true});

                next();
            }else{
                res.json({message: "Invalid password", success:false});
            }
        }
    })
    /*.then((found) => {
      if (found){
        var payload = {id: user.id};
        var token = jwt.sign(payload, 'sdfs');
        res.json({message: "ok", token: token});
      }else{
          throw new errorTypes.AuthenticationError('Invalid Username/Password')
      }
      
    })
    .catch((err) => responseManager.sendError(res, err))*/

})




app.post('/create-user',function(req,res,next){
    console.log("$$$$$$$$$$$$$$"+req.body.userName);
    
    User.findOrCreate({
        where:{
            userName:req.body.userName,
        },
        defaults:{
            password:bcrypt.hashSync(req.body.password, passwordSalt),
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phone:req.body.phoneNumber,
            email:req.body.email,
            designation:req.body.designation
        }
        
      }).spread((user, created)=>{
        console.log("$$$$$$$$$$$$$$"+created);
        if(created){
            var values = Object.assign({}, user.dataValues);
            //console.log(values);
            delete values.password;
            //console.log(values);
            //res.json({data:values, success: true});
            res.json({message:"User Created successfully.", success: true});
        }else{
            res.json({message: "User name already exist.", success: false});
            
        }
        
      }).catch(Sequelize.ValidationError,function(err){
          //console.log(JSON.parse(JSON.stringify(err['errors'])));
          var result  =JSON.parse(JSON.stringify(err['errors']))
          var resp =[];
          resp.push(result[0].message);
          for(var e = 0; e<result.length;e++){
              //resp.push(result[0].message);
          }
          res.json({message: resp, success: false});
      }).catch(function(err){
        res.json({message: err, success: false});
      })
    
})


// Binding express app to port 3000

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port,server_ip_address,function(){
    console.log('Node server running @' +server_ip_address+':'+server_port)
});
