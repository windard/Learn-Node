var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var setting = require('./setting.js')
var flash = require('connect-flash');

var routes = require('./routes/index');
// var users = require('./routes/users');

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
    secret: 'nodetodo',
    key: 'sid',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(function(req,res,next){
  // res.locals.user=req.session.username;

  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;

  next();
});

app.use('/', routes);
app.post('/new',function(req,res,next){
  var priority = req.body.priority;
  var content = req.body.content;
  var current = new Date();
  var connection = setting.connection;
  connection.query('INSERT INTO note(content,priority,start) VALUES("'+content+'",'+priority+',"'+current.Format("yyyy-MM-dd hh:mm:ss")+'")', function(err, rows, fields) {
    if (err){
      req.flash("error",err[0]);
      return req.redirect('/');
    };
    req.flash("success","添加成功～");
    res.redirect('/')
  });
});

// app.use('/users', users);
app.get('/:id/finish',function(req,res,next){
  var id = req.params.id;
  var current = new Date();
  var connection = setting.connection;
  connection.query('UPDATE note SET has_finished=true , end="'+current.Format("yyyy-MM-dd hh:mm:ss")+'" WHERE id='+id, function(err, rows, fields) {
    if (err){
      req.flash("error",err[0]);
      return res.redirect('/')
    };
    req.flash("success","恭喜完成了一项任务～");
    res.redirect('/')
  });
});

app.get('/:id/backout',function(req,res,next){
  var id = req.params.id;
  var connection = setting.connection;
  connection.query('UPDATE note SET has_finished=false , end=null WHERE id='+id, function(err, rows, fields) {
    if (err){
      req.flash("error",err[0]);
      return res.redirect('/')
    };
    req.flash("success","还没有完成么？");
    res.redirect('/')
  });
});

app.get('/:id/delete',function(req,res,next){
  var id = req.params.id;
  var connection = setting.connection;
  connection.query('DELETE FROM note WHERE id='+id, function(err, rows, fields) {
    if (err){
      req.flash("error",err[0]);
      return res.redirect('/')
    };
    req.flash("success","删除成功～");
    res.redirect('/')
  });
});

app.post('/:id/modify',function(req,res,next){
  var id = req.params.id;
  var content = req.body.content;
  var priority = req.body.priority;
  var start = new Date(req.body.start);
  var end = new Date(req.body.end);
  if (!content){
    req.flash("error","任务内容不能为空！");
    return res.redirect('/');
  }
  if(start > end){
    req.flash("error","结束时间不能早于开始时间！");
    return res.redirect('/')
  }
  var connection = setting.connection;
  connection.query('UPDATE note SET priority='+priority+',content="'+content+'",start="'+start.Format("yyyy-MM-dd hh:mm:ss")+'",end="'+end.Format("yyyy-MM-dd hh:mm:ss")+'" WHERE id='+id,function(err,rows,fields){
    if (err){
      req.flash("error",err);
      return res.redirect('/')
    };
    req.flash("success","修改成功～");
    res.redirect('/')
  })
})

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

Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

module.exports = app;
