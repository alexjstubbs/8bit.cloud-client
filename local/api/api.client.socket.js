/* Client Socket
-------------------------------------------------- */

/* Call API Keeper
-------------------------------------------------- */
var initSocket = function() { 
    api(nsp);
};

/* Export 
-------------------------------------------------- */
var clientSocket = function(callback) {
    callback(nsp);
}

exports.initSocket      = initSocket; 
exports.clientSocket    = clientSocket;