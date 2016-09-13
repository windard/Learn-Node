var express = require('express');
var Post = require("../models/post.js");

var router = express.Router();

/* GET users listing. */

function checkLogin(req,res,next){
    if (!req.session.username){
        req.flash("error","未登入！");
        return res.redirect("/");
    };
    next();
}

router.get('/', function(req, res, next) {
    res.redirect("/");
});

// router.post('/',checkLogin);
router.post('/',function(req,res){
    var username = req.session.username;
    var content = req.body.content;
    var post = new Post(username,content);
    post.save(function(err){
        if(err){
            req.flash("error",err);
            return res.redirect('/');
        }
        req.flash("success","发表成功！");
        return res.redirect('/u/'+username);
    })
})

module.exports = router;
