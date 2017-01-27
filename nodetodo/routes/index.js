var express = require('express');
var setting = require('../setting.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = setting.connection;

  connection.query('SELECT * FROM note', function(err, rows, fields) {
    if (err){
      req.flash("error",err[0]);
      return res.redirect('/')
    };
    // console.log('The solution is: ', rows);
    res.render('index',{title:'Node TODO',notes:rows});
  });
});

module.exports = router;
