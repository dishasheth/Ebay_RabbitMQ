/**
 * 
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require('./mongo');
var loginDatabase = "mongodb://localhost:27017/myEbay";
var ejs = require("ejs");
var mq_client = require('../rpc/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {
    
    	var msg_payload = {
    		"username" : username,
    		"password" : password,
    		"queue":"login"
    	};

console.log("harsh");
        process.nextTick(function(){
       
        	mq_client.make_request('login_queue', msg_payload, function(err, results) {
        		var user=results.user;
        		console.log("logging user..........."+user);
        		if(err) {
                      return done(err);
                  }
                  
                  if(!user) {
                      return done(null, false);
                  }

                  if(user.password != password) {
                      done(null, false);
                  }

                   console.log(user.username);
                  done(null, user);
        	});
        	
                   
                });
       
    }));
}


