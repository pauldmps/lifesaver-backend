/**
 * User authentication controller
 * © Shantanu Paul. All rights reserved
 */

var passport = require('passport');
var User = require('../Models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(email,password,callback) {
    User.findOne({email:email},function(err, user){
       if(err){return callback(err);}

       if(!user){return callback(null,false);}

        user.matchPassword(password,function(err,isMatch){
            if(err){return callback(err);}

            if(!isMatch){return callback(null,false);}

            return callback(null,user);
        });
    });
}));

exports.authorize = passport.authenticate('local', { session : false });