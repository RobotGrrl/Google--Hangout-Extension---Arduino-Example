/*
Google+ Hangout Extension / Interactive Web App Demo
---

This is the server side javascript. This is where the
websockets communicate, and also send a message back
to the tcp sockets.
        
This is based off of node-session by John Schimmel
https://github.com/johnschimmel/node-session

With some minor fixes in it to make it run better.

Example by RobotGrrl
robotgrrl.com
robobrrd.com
CC-BY
*/
 
console.log('Hello!');

var http = require('http')
  , net = require('net')
  , url = require('url')
  , fs = require('fs')
  , io = require('socket.io')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;

// -- PORTS -- //
var HTTP_PORT = port; // TODO: add your http port here
var TCP_PORT = port; // TODO: add your tcp port here

// -- MISC -- //
var clientCount = 0;
var incrementCount = 0;
var tcpGuests = [];
var webGuests = [];

// let's go! start the server!
server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Welcome. Try the <a href="/index.html">example</a>.</h1>');
      res.end();
      break;
      
    case '/json.js':
    case '/index.html':
      fs.readFile(__dirname + path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
        res.write(data, 'utf8');
        res.end();
      });
      break;
      
    default: send404(res);
  }
  
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

// start listening
server.listen(HTTP_PORT);

// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server)
  , buffer = [];
  
// connect to sockets io
io.on('connection', function(client){

  // in this example, when we say 'client', it means another web browser
  // that is open. so basically, someone else, or another page.

  console.log('Connected!');
  clientCount++;
  incrementCount++;
  
  // give a name to our new visitor (will come in useful when they leave)
  client.name = "webclient" + incrementCount;
  
  // tell the socket whenever someone joins
  io.sockets.emit('alert-join', clientCount);
  
  // send nothing, then tell everyone that someone has connected
  client.send({ buffer: buffer });
  client.broadcast.send({ announcement: client.name + ' connected' });
  
  // add this new client to the collection
  webGuests.push(client);
  
  // when a client gets a message...
  client.on('message', function(message){

    // broadcast the message to ALL the clients
    var msg = { message: [client.name, message] };
    console.log('msg obj', msg);
    client.broadcast.json.send(msg);
    
    // now send the message to ALL the tcp connections
    for (g in tcpGuests) {
        console.log('sending msg');
        tcpGuests[g].write(message);
    }
    
    for(c in webGuests) {
    	if(c == client) {
        	console.log('yep');
        }
    }
    
  });
  
  // when someone leaves, decrement and remove them
  client.on('disconnect', function(){
      clientCount--;
      client.broadcast.emit('alert-join', clientCount);
      
    client.broadcast.send({ announcement: client.name + ' disconnected' });
    webGuests.splice(webGuests.indexOf(client), 1);
  });
  
});


// let's start the tcp server now!
var tcpServer = net.createServer(function (socket) {
  // just for (in)sanity
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('tcp server running on port ', TCP_PORT);
  console.log('web server running on port ', HTTP_PORT);
});

// whenever a new processing sketch connects to the socket
tcpServer.on('connection',function(socket){
    
    // add the new socket, let us know how many there are
    socket.write('connected to the tcp server\r\n');
    console.log('num of connections on tcp: ' + tcpServer.connections);
    tcpGuests.push(socket);

    // when the sketch closes, remove their socket
    socket.on('close', function() {
		console.log("disconnected from TCP");
		tcpGuests.splice(tcpGuests.indexOf(socket), 1);
	});
    
});
tcpServer.listen(TCP_PORT);
