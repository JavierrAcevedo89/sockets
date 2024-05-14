var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//Array  que guarda los mensajes
var messages = [{
    id: 1,
    texto: "Q rollo con el pollo",
    autor: "Jabi Acevedo"
}];

/* Usamos un middleware para usar elementos estáticos en la sección pública de la aplicación */
app.use(express.static('public'));

app.get('/',function(req, res){
    res.status(200).send("Hola Mundo");
});

/* De esta forma activamos socket para que esté escuchando 
mandamos un mensaje de control por consola para saber que pasa
y tenemos que hacer el mensaje venga del navegador web mediante HTML y JS */
io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
    socket.emit('messages', messages);
    //ahora queremos escuchar los mensajes mandados por el cliente
    socket.on('new-message', function(data){
        messages.push(data);
        //queremos que todos los mensajes se manden a todos los clientes
        io.sockets.emit('messages', messages);
    });
});

server.listen(3005, function(){
    console.log("El servidor está corriendo en http://localhost:3005");
});