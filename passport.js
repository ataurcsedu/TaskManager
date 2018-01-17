var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : ''
				});

connection.query('USE vidyawxx_build2');	

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });	

 	passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

         connection.query("SELECT * FROM users WHERE email = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            } 
			
			if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			return done(null, rows[0]);			
		
		});
		


    }));

};