'use strict';
var users = require('../models/users.js');

var serviceHandler = function() {
    
};

serviceHandler.prototype.getUsers = function(res){
    var onUsersFetch = function(err, userRes){
        if(err){return res.send(err); }
        res.json(userRes);
    };
    return users.find({},onUsersFetch);
}

module.exports = serviceHandler;