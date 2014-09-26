/* Server socket API 
-------------------------------------------------- */
var fs = require('fs-extra')
,   database = require('../../api/database/database.local')
// ,   serverEvents = require("./server.events")
,   network
,   issuedToken;


/* Get issued Token (if available)
-------------------------------------------------- */
var issueToken = function(callback) {
    database.compactDatabase("network", function() {
        database.storeGet(null, "network", function(docs) {
            var issuedToken = docs[0].token;
            callback(issuedToken);
        });
    });
}

/* Initialize Network Connection
-------------------------------------------------- */
var networkConnection = function(token, ansp, callback) {

    var io = require('socket.io-client'),
    
    // Connect to /network, pass credidentials.
    nsp = io.connect('http://localhost:6052/network', {
        'query': 'token=' + token
    });

    // Successfully Connected and Auth'd
    nsp.on('connect', function (socket, sock) {

         nsp.on('network', function(data) {
        
            ansp.emit('networking', {activities: data});

            console.log("DAT: " +JSON.stringify(data));
        
        })

        console.log('Connected to /network');

        network = nsp;

        if (callback) {
            callback(null, network);
        }

    }).on('disconnect', function () {

        console.log('disconnected from /network');

    });

    // Could not connect or could not authenticate
    nsp.on("error", function(error) {

      // ||Client Box||: Your server token is invalid
      console.log(error)

      if (callback) {
          callback(error, null);
      }

    });

}

/* Network Interfacing
-------------------------------------------------- */
var networkInterface = function(ansp, json) {

    if (!issuedToken) {
        issueToken(function(token) {
            issuedToken = token;
            json.token = token;
            networkCommand(ansp, json);
        });
    }

    else {
        json.token = issuedToken;
        networkCommand(ansp, json);
    }

}

var networkCommand = function(ansp, json) {

    if (!json.token) {
        console.log("[!] No Token Supplied");
    }
    
    if (!network) {

            console.log("Attempting Connect to send command");

            networkConnection(issuedToken, ansp, function(err, network) {
                    
                if (err) {
                   // ||Client Box||: You are not connected to the server interface
                    console.log("[!] Network Authentication Error: "+err);
                }

                else {
                    network.emit('cmd', json);
                }

            });

        }

        // Send Network Commands
        else {
            console.log("sending command: "+json)
            network.emit('cmd', json);
        }
}


exports.networkConnection   = networkConnection;
exports.networkInterface    = networkInterface;
exports.networkCommand      = networkCommand;