var bcrypt = require('bcryptjs');
var config = require('../config/database');

const User = require('../models/users');

module.exports = {

    
    getUserById: (id, callback) => {
        User.findById(id, callback);
    },

    getUserByUsername: (username, callback) => {
        const query = {username: username}
        User.findOne(query, callback);
    },

    addUser: (newUser, callback) => {
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt,function(err, hash){
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    },

    comparePassword: (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch){
            if(err) throw err;
            callback(null, isMatch);
        });
    }
}

/*
    we can interact with mongoose in 3 ways

    1) Callbacks
    2) Promises
    3) Async/Await (Promises)
*/