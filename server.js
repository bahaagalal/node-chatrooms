var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var socketio = require('socket.io');

var server = http.createServer(function(request, response){
	var filePath = './public';
	filePath += (request.url == '/')? '/index.html' : request.url;

	fs.readFile(filePath, function(err, fileContents){
		if(err)
		{
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write('Error 404: resource not found.');
			response.end();
		}
		else
		{
			response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
			response.end(fileContents);
		}
	});
});

var io = socketio(server);

io.on('connection', function(socket){
	socket.on('message', function(message){
		io.emit('message', message);
	});
});

server.listen(3000);
