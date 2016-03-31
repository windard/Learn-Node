var http = require("http");
var url  = require("url");

function start(route,handle){
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("request for "+ pathname + " Reveived");

		route(handle,pathname);

		response.writeHead(200,{'Content-Type':'text/plain'});
		response.write("hello world");
		response.end();
	}
	http.createServer(onRequest).listen(8082);
	console.log("Server is listening ...");
}

exports.start= start;


