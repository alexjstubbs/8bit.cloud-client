/* Sockets.io api
-------------------------------------------------- */
var io = require('socket.io-client');
var api = io.connect(window.location.hostname);
// ('/api');

console.log("window.location.hostname");

/* Module Definitions
-------------------------------------------------- */

console.log("im included");
// Remove dependancy on this file 

var connect = function() {


    console.log("inc twice")
  api.on('connect', function(){

    console.log("Well i connected here")

    //  setTimeout(function() {
    //     api.emit('request', { request: 'listRoms', param: "Nintendo" });
    // }, 2000);

  });
    

};

/* Exports
-------------------------------------------------- */
exports.connect = connect;
exports.api = api;