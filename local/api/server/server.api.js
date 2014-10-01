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

/* Login 
-------------------------------------------------- */

var getSession = function(nsp) {

    var app = "login";
        _path = "http://" + path.join(server, app);

        fs.readJson(__sessionFile, function(err, userProfile) {
          
            if (err) {
                console.log({error: err});
            }

            var creds = { 
                Username: userProfile.Username,
                validPassword: userProfile.validPassword
            };

            request.post({
                uri: _path,
                form: creds
            }, function (error, response, body) {


                if (isJson(body)) {
                    
                    // Got new token
                    
                    var _token = JSON.parse(body);

                    userProfile.token = _token.token;

                    fs.outputJson(__sessionFile, userProfile, function(err) {

                        if (err) {
                            console.log(err);
                        }

                        else {

                           fs.copy(__sessionFile, appDir + '/config/profiles/' + userProfile.Username + '.json', function(err){
                              
                                if (err) console.log({error: err});
                                
                                else {
                                    console.log({message: 'Authenticated the session'});
                                }
                           })
                        }

                })

                    getSockets(nsp, _token);
            }

            else {
                // Wrong Login Info (notify user)
                console.log(body);
                console.log({error: 'Could not authenticate user'});
            }

            });

        });

}

/* Signup 
-------------------------------------------------- */

var signUp = function(nsp) {

    var app = "signup";

    _path = "http://" + path.join(server, app);

    var query = { 
        Username: 'Samson',
        Email: 'alex@alexstubbs.com',
        validPassword: '469df27ea91ab84345e0051c81868535',
        Avatar: null
    };

    request.post({
        uri: _path,
        form: query
    }, function (error, response, body) {

        if (isJson(body)) {
            
            var status = JSON.parse(body);

            if (status.Username) {

                var file = appDir+'/config/profiles/' + status.Username + '.json';

                fs.outputJson(file, status, function(err) {

                    if (err) {
                        console.log(err);
                    }

                    else {
                        fs.copy(file, __sessionFile, function(err){
                          if (err) return console.error(err);
                            getSession();
                        }); 

                    }

                });

            }
        }

        else {
            // ||Client Box||: Could not sign up?
            console.log(body);
        }

        if (error) {
            console.log(error, "Server unreachable?")
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
            validPassword: 'Pass'
        };

       request.post({
            uri: _path,
            form: { Username: "Alex", validPassword: "469df27ea91ab84345e0051c81868535" }
        }, function (error, response, body) {
            if (isJson(body)) {
                
                // nsp.emit('api', {messages: JSON.parse(body)})
            }
        });

}

/* Add a Friend Endpoint
-------------------------------------------------- */
var addFriend = function(nsp) {
    sockets.networkInterface(nsp, {cmd: 'addFriend', parameters: 'Samson'})
}

/* Friends Endpoint
-------------------------------------------------- */
var getFriend = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getFriends' });
}

/* Activities Endpoint
-------------------------------------------------- */
var getActivities = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getActivities' });
}

/* Message Endpoint
-------------------------------------------------- */
var getMessages = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getMessages' });
}


/* Exports
-------------------------------------------------- */

exports.getCommunity    = getCommunity;
exports.getEvents       = getEvents;
exports.getMessages     = signUp;
// exports.getMessages     = getMessages;
exports.getSession      = getSession;
exports.leaveSession    = leaveSession;
exports.getFriend       = getFriend;
exports.getActivities   = getActivities;
exports.signUp          = signUp;
