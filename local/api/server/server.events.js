/* Server Events
-------------------------------------------------- */
var api = require('../api');

var serverEvents = function(nsp) {

    nsp.on('network', function(data) {
        console.log("data:" +data);
    })

}

exports.serverEvents = serverEvents;
