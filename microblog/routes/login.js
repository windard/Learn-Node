var express = require('express');
var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/microblog");
var crypto = require("crypto");
var User = require("../models/user.js");

var router = express.Router();

/* GET home page. */

function checkLogin(req,res,next){
    if (req.session.username){
        req.flash("error","已登入！");
        return res.redirect("/");
    };
    next();
}

router.get('/',checkLogin);
router.get('/', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

router.post('/',checkLogin);
router.post('/',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var md5 = crypto.createHash("md5");
    password = md5.update(password).digest("hex");
    var newUser = new User({
        username:username,
        password:password,
    });
    User.get(newUser.username,function(err,user){
        if(user){
            var mongoUser = db.get("user");
            mongoUser.findOne({"username":username,"password":password},function(err,docs){
                if(!docs){
                    req.flash("error","密码错误！");
                    return res.redirect("/login");
                }else{
                    req.session.username = username;
                    req.flash("success","登陆成功！");
                    return res.redirect('/');
                };
            });
        }else{
            req.flash("error","用户不存在！");
            return res.redirect("/login");
        };
    });
});

module.exports = router;
