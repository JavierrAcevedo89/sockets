var socket = io.connect('http://localhost:3005', {'forceNew': true});

/*El cliente manejara datos mediante mensajes, esto se llamara eventos y se mostraran por la consola en el navergador */
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    //Restructuramos esta seccion para que se maneje el array
    //elem es un conjunto de cosas
    //con ma recorremos el array

    var html = data.map(function(elem, index){
            return(`<div>
                    <strong>${elem.autor}</strong>:
                    <em>${elem.texto}</em>
                    </div>`);
    }).join(" ");

                document.getElementById('messages').innerHTML = html;
}

//Cada ves que alguien precione el boton enviar en el formulario
//El cliente emite un nuevo mensaje y manda el payload
//Culminar el proyecto a una version Beta
function addMessage(e){
    var payload = {
        autor: document.getElementById('username').value,
        texto: document.getElementById('texto').value

    };
    socket.emit('new-message', payload);
    return false;
}