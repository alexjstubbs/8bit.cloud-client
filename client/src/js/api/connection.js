/* Sockets.io api
-------------------------------------------------- */
var io      = require('socket.io-client')
,   api     = io.connect(window.location.hostname+"/api")
, 	dialog  = require('../dialogs');

/* Module Definitions
-------------------------------------------------- */

var connect = function() {

    api.on('connect', function(){
		
   	// Offset List roms? or list roms on switch tab
    //  setTimeout(function() {
    //     api.emit('request', { request: 'listRoms', param: "Nintendo" });
    // }, 2000);

  });
    
	api.on('messaging', function(data, sock) {
			
		dialog.general(null, data.type, data.body);

	});



};

/* Exports
-------------------------------------------------- */
exports.connect = connect;
exports.api = api;