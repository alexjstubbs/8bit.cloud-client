/* Server socket API 
-------------------------------------------------- */

var networkConnection = function(token) {

var io = require('socket.io-client'),
    
    // Connect to /Network, pass credidentials.
    nsp = io('http://localhost:6052/network', {

        'query': 'token=' + token

    });

    // Successfully Connected and Auth'd
    nsp.on('connect', function () {

        console.log('Connected to /Network');

    }).on('disconnect', function () {

        console.log('disconnected from /Network');

    });

    // Could not connect or could not authenticate
    nsp.on("error", function(error) {

      // ||Client Box||: Your server token is invalid
      console.log(error)
    });

}

  
exports.networkConnection = networkConnection;