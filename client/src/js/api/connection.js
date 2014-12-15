/* Sockets.io api
-------------------------------------------------- */
var io      = require('socket.io-client')
,   api     = io.connect(window.location.hostname+"/api")
,   events  = require('../system.events').events
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


  /* Server to Client Notification
  -------------------------------------------------- */    
  api.on('messaging', function(data, sock) {
			
		dialog.general(null, data.type, data.body, data.dataFunction, data.dataParameters, data.button);

	});


  /* Server to Client Communication
  -------------------------------------------------- */
  api.on('clientEvent', function(data, sock) {
    
    events[data.command](data.params);

  });

};

/* Exports
-------------------------------------------------- */
exports.connect = connect;
exports.api = api;