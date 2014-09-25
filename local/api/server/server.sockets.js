/* Server socket API 
-------------------------------------------------- */
var fs = require('fs-extra')
,   database = require('../../api/database/database.local')
,   network;

var networkConnection = function(token, callback) {

    var io = require('socket.io-client'),
    
    // Connect to /Network, pass credidentials.
    nsp = io.connect('http://localhost:6052/network', {

        'query': 'token=' + token

    });

    // Successfully Connected and Auth'd
    nsp.on('connect', function (socket, sock) {

        console.log('Connected to /Network');
        network = nsp;

        console.log(sock);

        if (callback) {
            callback(null, network);
        }

    }).on('disconnect', function () {

        console.log('disconnected from /Network');

    });


    nsp.on('server', function(data) {
        console.log(data);
    })

    // Could not connect or could not authenticate
    nsp.on("error", function(error) {

      // ||Client Box||: Your server token is invalid
      console.log(error)

      if (callback) {
          callback(error, null);
      }
    });

}


var networkInterface = function(json) {

    if (!network) {

        database.compactDatabase("network", function() {
            database.storeGet(null, "network", function(docs) {
                var token = docs[0].token;
                networkConnection(token, function(err, network) {
                    
                    if (err) {
                        console.log("[!] "+err);
                    }

                    else {
                        network.emit('cmd', json);
                    }

                })
            });
        });

        // ||Client Box||: You are not connected to the server interface
        console.log("[!] Tried to send network command but we are un-authorized. Attempting Login.");
    }

    // Send Network Commands
    else {
        network.emit('cmd', json);
    }

}

exports.networkConnection = networkConnection;
exports.networkInterface = networkInterface;