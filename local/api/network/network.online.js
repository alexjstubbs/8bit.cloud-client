/* Network.isOnline
-------------------------------------------------- */
var fs = require('fs-extra'),
    _ = require('lodash');


/* Connected to the Internet
-------------------------------------------------- */

function sysIsOnline() {

	require('dns').resolve('www.google.com', function(err) {
	  if (err)
	  	console.log("NOT CONNECTED TO INTERNET");
	  else
	  	console.log("CONNECTED TO INTERNET!");
	});

}

/* Connected to the Ignition Server
-------------------------------------------------- */
function isOnline(nsp, username, hash) {

    nsp.emit('api', {isOnline: true, username: "Alex Stubbs"});       
           
}

exports.sysIsOnline = sysIsOnline;
exports.isOnline 	= isOnline;
