var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/microblog");

function Post(username,post,time){
    this.username = username;
    this.post = post;
    if (time){
        this.time = time;
    }else{
        this.time = new Date();
    }
};

module.exports = Post;

Post.prototype.save = function save(callback){
    var post = {
        username:this.username,
        post:this.post,
        time:this.time,
    };
    var mongoPost = db.get("post");
    mongoPost.insert(post,function(err,docs){
        if(err){
            return callback(err);
        }
        callback(err,post);
    });
};

Post.get = function get(username,callback){
    var mongoPost = db.get("post");
    var query = {};
    if(username){
        query.username = username;
    };
    // var posts = [];
    mongoPost.find(query,function(err,docs){
        if (err){
            return callback(err);
        };
        callback(err,docs.reverse());
    })
}
