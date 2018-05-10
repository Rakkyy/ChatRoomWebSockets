// Connect to socket
var socket = io.connect("http://13.232.21.145:4000");

var message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    handle = document.getElementById('handle'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing',handle.value);
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong> ${data.handle} : </strong> ${data.message} </p> `;
});

socket.on('typing',function(data){
    feedback.innerHTML = `<p><em> ${data} is typing a message... </em></p>`;
});