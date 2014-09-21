/* Ignition Server API
-------------------------------------------------- */
var fs = require('fs-extra')
,   path = require('path')
,   request = require('request');

/* Set up (use config file)
-------------------------------------------------- */
var server = "localhost:3000"
,   port = 3000
,   v = "v1"
,   api = path.join(server, "api", v);

/* Community Endpoint
-------------------------------------------------- */

var getCommunity = function(nsp) {

    var app = "Communities";
    _path = "http://" + path.join(server, "api", v, app);

   request.get({
        uri: _path
    }, function (error, response, body) {

            nsp.emit('api', {community: JSON.parse(body)}) 
    });

}

/* Events Endpoint
-------------------------------------------------- */

var getEvents = function(nsp) {

    var app = "Events";
    _path = "http://" + path.join(server, "api", v, app);

   request.get({
        uri: _path
    }, function (error, response, body) {
            nsp.emit('api', {events: JSON.parse(body)}) 
    });

}

/* Message Endpoint
-------------------------------------------------- */
var getMessages = function(nsp) {

    var app = "Messages";
    _path = "http://" + path.join(server, "api", v, app);

    var query = { 
        To: 'Alex'
    };

   request.get({
        uri: _path,
        qs: { query: JSON.stringify(query) }
    }, function (error, response, body) {
            nsp.emit('api', {messages: JSON.parse(body)})
    });

}

/* Exports
-------------------------------------------------- */

exports.getCommunity = getCommunity;
exports.getEvents = getEvents;
exports.getMessages = getMessages;

 // $or: [
 //                {name: '~Another'},
 //                {$and: [
 //                    {name: '~Product'},
 //                    {price: '<=10'}
 //                ]}
 //            ],
 //                price: 20
 //            };