/* Sockets.io api
-------------------------------------------------- */
var io = require('socket.io-client');
var api = io.connect(window.location.hostname);
// ('/api');

// console.log("window.location.hostname");

/* Module Definitions
-------------------------------------------------- */

// Remove dependancy on this file 

var connect = function() {


    api.on('connect', function(){


    //  setTimeout(function() {
    //     api.emit('request', { request: 'listRoms', param: "Nintendo" });
    // }, 2000);

  });
    

};

/* Exports
-------------------------------------------------- */
exports.connect = connect;
exports.api = api;