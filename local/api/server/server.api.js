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


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/* Community Endpoint
-------------------------------------------------- */

var getCommunity = function(nsp) {

    var app = "Communities";
    _path = "http://" + path.join(server, "api", v, app);

   request.get({
        uri: _path
    }, function (error, response, body) {
            if (isJson(body)) {
                nsp.emit('api', {community: JSON.parse(body)}) 
            }
            
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
        if (isJson(body)) {
            nsp.emit('api', {events: JSON.parse(body)}) 
        }
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
        if (body === 'Unauthorized') {
            getSession();
        }
        if (isJson(body)) {
            console.log(JSON.parse(body));
            nsp.emit('api', {messages: JSON.parse(body)})
        }
        else {
            console.log("not JSON")
        }
    });

}

/* Login 
-------------------------------------------------- */

var getSession = function(nsp) {

    var app = "login";
        _path = "http://" + path.join(server, app);

        var query = { 
            Username: 'Alex',
            Password: 'Pass'
        };

       request.post({
            uri: _path,
            form: { Username: "Alex", Password: "469df27ea91ab84345e0051c81868535" }
        }, function (error, response, body) {
            if (isJson(body)) {
                nsp.emit('api', {messages: JSON.parse(body)})
            }
        });

}

/* Friends Endpoint
-------------------------------------------------- */
var getFriend = function(nsp) {

    var app = "Users";
    _path = "http://" + path.join(server, "api", v, app);

    var query = { 
        Username: 'Alex'
    };

   request.get({
        uri: _path,
        qs: { query: JSON.stringify(query) }
    }, function (error, response, body) {
        if (body === 'Unauthorized') {
            getSession();
        }
        if (isJson(body)) {
            nsp.emit('api', {friends: JSON.parse(body)})
        }
        else {
            console.log("not JSON")
        }
    });

}

/* Activities Endpoint
-------------------------------------------------- */
var getActivities = function(nsp) {

// Todo: Store body appended in DB, emit DB, sort by time

    var app = "Users";
    _path = "http://" + path.join(server, "api", v, app);

    var query = { 
        Username: 'Alex'
    };

   request.get({
        uri: _path,
        qs: { query: JSON.stringify(query) }
    }, function (error, response, body) {
        if (body === 'Unauthorized') {
            getSession();
        }
        if (isJson(body)) {
            console.log(JSON.parse(body)[0].Activities);
            nsp.emit('api', {activity: JSON.parse(body)[0].Activities})
        }
        else {
            console.log("not JSON")
        }
    });

}



/* Exports
-------------------------------------------------- */

exports.getCommunity = getCommunity;
exports.getEvents = getEvents;
exports.getMessages = getActivities;
// exports.getMessages = getMessages;
exports.getSession = getSession;
exports.getFriend = getFriend;
exports.getActivities = getActivities;

 // $or: [
 //                {name: '~Another'},
 //                {$and: [
 //                    {name: '~Product'},
 //                    {price: '<=10'}
 //                ]}
 //            ],
 //                price: 20
 //            };