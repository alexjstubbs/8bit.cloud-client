/* Ignition Server API
-------------------------------------------------- */
var fs = require('fs-extra')
,   path = require('path')
,   request = require('request')
,   sockets = require('./server.sockets')
,   database = require('../../api/database/database.local');

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

/* Get Token
-------------------------------------------------- */

var getToken = function(nsp) {

    var app = "token";
    _path = "http://" + path.join(server, app);

   request.get({
        uri: _path
    }, function (error, response, body) {
        var token = body;

        request.post({
            uri: "http://localhost:3000/token_auth",
            json: {
                "id": "123456",
                "token": token
            }
        })
    });

}


/* Message Endpoint
-------------------------------------------------- */

var getMessages = function(nsp) {

    sockets.networkInterface(nsp, { cmd: 'getMessages' });

   //  var app = "Messages";
   //  _path = "http://" + path.join(server, "api", v, app);

   //  var query = { 
   //      To: 'Alex'
   //  };

   // request.get({
   //      uri: _path,
   //      qs: { query: JSON.stringify(query) }
   //  }, function (error, response, body) {

   //      if (body === 'Unauthorized') {
   //          getSession();
   //      }
   //      if (isJson(body)) {
   //          // console.log(JSON.parse(body));
   //          nsp.emit('api', {messages: JSON.parse(body)})
   //      }
   //      else {
   //          console.log("not JSON")
   //      }
   //  });

}

/* Login 
-------------------------------------------------- */

var getSession = function(nsp) {

    var app = "login";
        _path = "http://" + path.join(server, app);

        var query = { 
            Username: 'Alex',
            Password: '469df27ea91ab84345e0051c81868535'
        };

       request.post({
            uri: _path,
            form: { Username: "Alex", Password: "469df27ea91ab84345e0051c81868535" }
        }, function (error, response, body) {

            if (isJson(body)) {
                
                // Got new token
                
                var _token = JSON.parse(body);

                database.storeData("network", _token, function(err, doc) {
                    if (!err) {
                        console.log("[i] Stored New Token: "+doc);
                    }
                })
                getSockets(nsp, _token);
            }

            else {
                // Wrong Login Info (notify user)
                console.log("Could not authenticate user");
            }
        });

}

/* Socket Connection
-------------------------------------------------- */

var getSockets = function(nsp, token) {


    var app = "sockets"
        _path = "http://" + path.join(server, app)

        var query = { 
            Token: token
        };

       request.post({
            uri: _path,
            form: {token: token.token }
        }, function (error, response, body) {
            sockets.networkConnection(token.token, nsp);
            console.log(body)
        });

}

/* Logout 
-------------------------------------------------- */

var leaveSession = function(nsp) {

    var app = "logout";
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
                
                // nsp.emit('api', {messages: JSON.parse(body)})
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


    sockets.networkInterface(nsp, { cmd: 'getActivities' });


   //  var app = "Users";
   //  _path = "http://" + path.join(server, "api", v, app);

   //  var query = { 
   //      Username: 'Alex'
   //  };

   // request.get({
   //      uri: _path,
   //      qs: { query: JSON.stringify(query) }
   //  }, function (error, response, body) {
   //      if (body === 'Unauthorized') {
   //          getSession();
   //      }
   //      if (isJson(body)) {
   //          // console.log(JSON.parse(body)[0].Activities);
   //          nsp.emit('api', {activity: JSON.parse(body)[0].Activities})
   //      }
   //      else {
   //          console.log("not JSON")
   //      }
   //  });

}



/* Exports
-------------------------------------------------- */

exports.getCommunity = getCommunity;
exports.getEvents = getEvents;
exports.getMessages = getActivities;
// exports.getMessages = getSession;
exports.getMessages = getMessages;
exports.getSession = getSession;
exports.leaveSession = leaveSession;
exports.getFriend = getFriend;
exports.getActivities = getActivities;
exports.getToken = getToken;

 // $or: [
 //                {name: '~Another'},
 //                {$and: [
 //                    {name: '~Product'},
 //                    {price: '<=10'}
 //                ]}
 //            ],
 //                price: 20
 //            };