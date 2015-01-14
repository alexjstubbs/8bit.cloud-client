/* Sockets.io api
-------------------------------------------------- */
var io      = require('socket.io-client')
,   api     = io.connect(window.location.hostname+"/api", { 'timeout': 999999999999999999, 'reconnection limit' : 1000, 'max reconnection attempts' : 'Infinity'})
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

    console.log("conencted!")

  });

  api.on('connect_timeout', function(msg){
      console.log("timedout: "+msg)
  })

  api.on('reconnect_attempt', function(msg){
      console.log("reconnect_attempt: "+msg)
  })

  api.on('reconnecting', function(msg, w){
      console.log("reconnecting: "+msg, w)
  })

  api.on('reconnect_error', function(msg, w){
      console.log("reconnect_error: "+msg, w)
  })

  api.on('reconnect_failed', function(msg, w){
      console.log("reconnect_failed: "+msg, w)
  })

  api.on('reconnect', function(msg, w){
      console.log("reconnect: "+msg, w)
  })


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
exports.api     = api;
