/* Server Events
-------------------------------------------------- */
var api = require(__base + 'api/api');

/*  Entry Point for Network
-------------------------------------------------- */
var serverEvents = function(nsp) {

	nsp.on('network', function(data) {

	})

};

/*  Exports
-------------------------------------------------- */
exports.serverEvents = serverEvents;
