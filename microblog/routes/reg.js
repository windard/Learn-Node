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
    res.render('reg', { title: '注册' });
});

router.post('/',checkLogin);
router.post('/',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if (password && password != repassword ){
      req.flash("error","两次输入的密码不一致");
      return res.redirect("/reg");
    }
    var md5 = crypto.createHash("md5");
    password = md5.update(password).digest("hex");
    var newUser = new User({
        username:username,
        password:password,
    });
    User.get(newUser.username,function(err,user){
        if(user){
            req.flash('error', "用户名已存在！");
            return res.redirect('/reg');
        };
        if(err){
            req.flash("error",err);
            return res.redirect("/reg");
        };
        newUser.save(function(err){
            if(err){
                req.flash("error",err);
                return res.redirect("/reg");
            };
            req.session.username = username;
            req.flash("success","注册成功！");
            return res.redirect('/');
        })
    });

});

module.exports = router;
