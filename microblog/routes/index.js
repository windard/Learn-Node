var express = require('express');
var Post = require("../models/post.js");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.get("",function(err,docs){
        if(err){
            req.flash("error",err);
            return res.redirect("/");
        }else{
            res.render("index",{title:"MicroBlog",posts:docs});
        }
    })
});

module.exports = router;
