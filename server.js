'use strict';
var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ServiceHandler = require('./services/serviceHandler.js');
var serviceHandler = new ServiceHandler();
var configDB = require('./config/database'); 
mongoose.connect(configDB.url); //Connect to our database

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); //Logger to log the Requests

var server = app.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});

//Socket IO Declaration
var io = require('socket.io')(server);

app.get('/',function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/users',function(req, res){
   res.sendfile('./public/users.html');
});

app.get('/chat',function(req, res){
	console.log("I'm sending chat.html");	
	res.sendfile('./public/chat.html');
});

app.post('/chat',function(req, res){

   console.log(JSON.stringify(req.body));
   if(req.body){
	   io.on('connection',function(socket){
		   //Private emit
			console.log(req.body.name+' connected');
			socket.emit("message", req.body.name+" stepped in");
		});
	   res.send('/chat');
	   //For all
	   io.emit("announce", req.body.name+" joined the chat!");
	   }
	});

app.get('/api/users',function(req, res){
    return serviceHandler.getUsers(res);
});