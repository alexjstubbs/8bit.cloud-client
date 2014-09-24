/* Server socket API 
-------------------------------------------------- */
var io = require('socket.io-client'),
socket = io.connect('localhost', {
    port: 6052
});

network = io('/network');

var networkConnection = function(token) {
    
    network.on('connect', function () {
        network.emit('hello server!');
    });

}
  
exports.networkConnection = networkConnection;
