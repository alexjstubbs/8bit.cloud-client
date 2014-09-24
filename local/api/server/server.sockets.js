/* Server socket API 
-------------------------------------------------- */

var networkConnection = function(token) {

var io = require('socket.io-client'),
    nsp = io('http://localhost:6052/network');


    // console.log(token);

    // var socket = io.connect('http://localhost:6052', {
    //     query: 'token=' + "token"
    //   });

    console.log(token)

      nsp.on('connect', function () {
        console.log('Connected to /Network');
      }).on('disconnect', function () {
        console.log('disconnected from /Network');
      });
    

    nsp.on("error", function(error) {
      console.log(error)
    });

}

  
exports.networkConnection = networkConnection;