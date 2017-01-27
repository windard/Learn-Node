var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");
var User = require("../models/user.js");
/* GET users listing. */

router.get('/',function(req,res){
    res.redirect('/');
});

router.get('/:user', function(req, res, next) {
    var username = req.params.user;
    User.get(username,function(err,user){
        if(user){
            Post.get(username,function(err,docs){
                if(err){
                    req.flash("error",err);
                    return res.redirect("/");
                }else{
                    return res.render("user",{title:username,posts:docs});
                }
            })
        }else{
            req.flash("error","用户不存在");
            return res.redirect('/');
        }
    })
});

module.exports = router;
