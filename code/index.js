var server = require('./new_server.js');
var router = require('./route.js');
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['upload'] = requestHandlers.upload;

server.start(router.route,handle);
// server.start(router.route);
// router.start();
