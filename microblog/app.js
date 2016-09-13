var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/microblog");
var flash = require('connect-flash');

var routes = require('./routes/index');
// var user = require('./routes/user');
var post = require('./routes/post');
var reg = require('./routes/reg');
var login = require("./routes/login");
var user = require("./routes/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'microblog',
    key: 'sid',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(function(req,res,next){
  res.locals.user=req.session.username;

  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;

  next();
});

app.use('/', routes);
// app.use('/u/:user', user);
app.use('/post',post);
app.use('/reg',reg);
app.use('/u/',user);
app.use("/login",login);

app.get('/logout', function(req, res) {
  if (req.session.username){
    req.session.username = null;
    req.flash('success', '登出成功');
    res.redirect('/');
  }else{
    res.redirect('/');
  }
});

// app.get('/home', function (req, res) {
//   res.send('GET request to the homepage');
// });

// app.get('/file/:year/:month/:day/:title',function(req,res) {
//   var filename =
//   './blog/'+
//   req.params.year + '-' +
//   req.params.month + '-' +
//   req.params.day + '-' +
//   req.params.title +'.md'
//   fs.readFile(filename,'utf-8',function(err,data) {
//     if (err) res.send(err)
//     res.send(data)
//   });
// });

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
