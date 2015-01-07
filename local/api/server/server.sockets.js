/* Server socket API
-------------------------------------------------- */
var fs 							= require('fs-extra')
,   database 					= require('../../api/database/database.local')
,   networkMethods 				= require('../../api/network/network.methods')
, 	io 							= require('socket.io-client')
, 	_ 							= require('lodash')
, 	async 						= require('async')
, 	_await 						= false
,   network
,   issuedToken;


/*  Remove Issued Token
-------------------------------------------------- */
var removeToken = function() {
	issuedToken = '';
}

/*  Remove Dead Connections
-------------------------------------------------- */
var removeConnection = function() {
	if (network) {
		network.disconnect();
		console.log("removed previous socket...");
	}
}


/* Get Network Status
-------------------------------------------------- */
var networkStatus = function(callback) {

	if (!network) {

		setTimeout(function() {

			if (!network) {
				callback(null, false);
			}

			else {
				callback(null, network.connected);
			}

		}, 1);

	}

	else {

		callback(null, network.connected);

	}
}

/* Get issued Token (if available)
-------------------------------------------------- */
var issueToken = function(callback) {


      fs.readJson(__sessionFile, function(err, userProfile) {


            if (err) {
                console.log("Token Error: " + err);
            }

            if (userProfile) {
                if (userProfile.token) {

                    var issuedToken = userProfile.token;
                    callback(null, issuedToken);

                }

                else {
                    callback("No token in session", null);
                }

            }

            else {
                callback({error: "No token supplied"});
            }

      })
};

var networkDebounce = _.throttle(function() {
	console.log("why twice?");
}, 500);

/* Initialize Network Connection
-------------------------------------------------- */
var networkConnection = function(token, ansp, callback) {

   /* Connect to /Network (i.io) namespace/network
   -------------------------------------------------- */

	if (!network) {
		nsp = io.connect('http://ignition.io:6052/network', {
	        'query': 'token=' + token,
	        secure: true
	    });
	}

	else {
		callback(null, network);
	}

    /* Connection "" successfull
    -------------------------------------------------- */
    nsp.on('connect', function (socket, sock) {

		ansp.emit('api', { isOnline: true });

        network = nsp;

        if (callback) {
            callback(null, network);
        }

   /* Disconnected from ""
   -------------------------------------------------- */
    }).on('disconnect', function () {

		ansp.emit('api', { isOnline: false });

    });

    /* Data from "" Recieved
    -------------------------------------------------- */
    nsp.on('network', function(data, sock) {


    	/* If command recieved, run.
    	-------------------------------------------------- */
        // if (data.run) {
		//
        //     // networkMethods[data['cmd']](nsp, data);
        // }

        /* If just binding data, emit.
        -------------------------------------------------- */
        // else {
            __api.emit('network-api', data);

			console.log("-----");
			console.log(data);

			console.log("-----");
			// { result: resultList[id], object: object };
			// __api.emit('messaging', {type: 1, body: data });

        // }

    })

    /* Could not connect, or auth. General Error. (Invalid Token?).
    -------------------------------------------------- */
    nsp.on("error", function(error) {

      // ||Client Box||: Your server token is invalid
      console.log(error)

      if (callback) {
          callback(error, null);
      }

    });

}

/* Check i.io Connection (needs work)
-------------------------------------------------- */
var networkCheckConnection = function(callback) {

	if (callback || typeof callback == "function") {

		networkConnection(null, null, function(result) {

			callback(network);

		});

	}
}

/* Network Interfacing (!!)
-------------------------------------------------- */
var networkInterface = function(ansp, json) {

	/* Check if Issued Token Exists
	-------------------------------------------------- */

    if (!issuedToken) {
        issueToken(function(err, token) {
            if (!err) {
                issuedToken = token;
                json.token = token;
                networkCommand(ansp, json);
            }

            else {
                return;
            }
        });
    }

    /* Token Exists, proceed.
    -------------------------------------------------- */
    else {
        json.token = issuedToken;
        networkCommand(ansp, json);
    }

}


/* Send Command to Network
-------------------------------------------------- */
var networkCommand = function(ansp, json) {

	/* Token was removed manually by user. Error out.
	-------------------------------------------------- */
    if (!json.token) {
        console.log("[!] No Token Supplied");
        // issueToken here as well...
    }

    /* Network Connection doesn't Exist. Attempt to connect and proceed.
    -------------------------------------------------- */
    if (!network) {

		if (_await != true) {

			_await = true;

			networkConnection(issuedToken, ansp, function(err, network) {

				if (err) {
					// ||Client Box||: You are not connected to the server interface
					console.log("[!] Network Authentication Error: "+err);
				}

				else {
					network.emit('cmd', json);
					openNetwork = true;
				}

			});

		}

	else {

		async.until(
				function () { return network; },
				function (callback) {
					setTimeout(callback, 1000);
				},
				function (err) {
					network.emit('cmd', json);
				}
			);
		}
	}


	/* All is well. Send Command
	-------------------------------------------------- */
	else {
		network.emit('cmd', json);
	}

}

/* Exports
-------------------------------------------------- */
exports.removeToken		   		= removeToken;
exports.removeConnection  		= removeConnection;
exports.networkStatus   		= networkStatus;
exports.networkConnection   	= networkConnection;
exports.networkInterface    	= networkInterface;
exports.networkCommand      	= networkCommand;
exports.networkCheckConnection  = networkCheckConnection;
