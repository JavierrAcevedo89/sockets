var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//array qeu guarda los mensajes
var messages = [{
    id:1,
        texto:"K rollo con el pollo",
        autor: "Jabi Acevedo"
}];
app.use(express.static('public'));

app.get('/',function(req, res){
    res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
   socket.emit('messages', messages);
    socket.on('new-message',function(dat){
        message.push(data);
        //queremos que todos los mensajes se manden a todos los clientes
        io.socket.emit('messages', messages);
    });
});

server.listen(3005, function(){
    console.log("El servidor está corriendo en http://localhost:3005");
});
