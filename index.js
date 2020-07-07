var express = require('express');
var fs = require('fs');
var app = express();

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
};
app.get('/',function(req, res) {
	    res.sendFile(__dirname + '/client/tarea.html');
});
app.use('/client',express.static(__dirname + '/client'));

var serv = require('https').createServer(options,app);

serv.listen(3000);
console.log("Server started.");

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	    console.log('socket connection'); 
	    socket.on('happy',function(data){
		            console.log('happy because ' + data.reason);
		        });
	    socket.emit('serverMsg',{
		    msg:'hello',
		        });
	   
});
//#########COMANDOS PARA GENERAR CERTIFICADO PROPIO#########
//openssl genrsa -out key.pem
//openssl req -new -key key.pem -out csr.pem
//openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
