/* Network.isOnline
-------------------------------------------------- */
var fs = require('fs'),
    _ = require('lodash');


function isOnline(nsp, username, hash) {

    nsp.emit('api', {isOnline: true, username: "Alex Stubbs"});       
           
}

exports.isOnline = isOnline;
