var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/microblog");

function User(user){
    this.username = user.username;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback){
    var user = {
        username : this.username,
        password : this.password,
    };
    var mongoUser = db.get("user");
    mongoUser.insert(user,function(err,docs){
        if(err){
            return callback(err);
        };
        callback(err,docs);
    });
};

User.get = function get(username,callback){
    var mongoUser = db.get("user");
    mongoUser.findOne({"username":username},function(err,docs){
        if(docs){
            var user = new User(docs);
            callback(err,user);
        }else{
            callback(err,null);
        };
    });
};
