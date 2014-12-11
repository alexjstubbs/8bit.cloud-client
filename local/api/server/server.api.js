/* Ignition Server API
-------------------------------------------------- */
var fs          = require('fs-extra')
,   path        = require('path')
,   request     = require('request')
,   sockets     = require('./server.sockets')
,   database    = require('../../api/database/database.local')
,   helpers     = require('../../system/helpers')
,   network     = require('../../api/network/network.online')
,   forms       = require('../../api/api.forms')
,   bcrypt      = require('bcrypt')
,   profiles    = require('../../api/api.profiles');

/* Set up (use config file)
-------------------------------------------------- */

// var server      = "ignition.io:3000"
var server      = "127.0.0.1:3000"
,   port        = 3000
,   v           = "v1";

/* Password Hash
-------------------------------------------------- */
var passHash = function(input, callback) {
    var rand  = _.random(0, 1024);

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("SEGA", salt, function(err, hash) {
            
            if (err) {
                console.log(err);
            }

            else {
                callback(hash);
            }

        });
    });

}

/* Add a Friend Endpoint
-------------------------------------------------- */
var addFriend = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'addFriend', parameters: 'Alexander'});
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

/* Submit Cache Form (offline/online store)
-------------------------------------------------- */
var submitCache = function(nsp, data, callback) {

    switch(data.formTitle) {

        // new Sign Up Form
        case "signUp": {
            profiles.newProfile(nsp, data);
        }
        
    }

}


/* Submit Dynamic Form
-------------------------------------------------- */
var validateForm = function(nsp, data, callback) {

    // Validate form then run network command based on form name. Done!
    forms.validate(data, function(validation) {

        if (validation == undefined) {

            if (callback || typeof callback == "function") {
                callback(null, null);
            }
        }

        else {
           
            nsp.emit('messaging', {type: 0, body: validation });

        }

    });

}

/* Submit Dynamic Form
-------------------------------------------------- */
var submitForm = function(nsp, data, callback) {

    // Validate form then run network command based on form name. Done!
    forms.validate(data, function(validation) {

        if (validation == undefined) {
            
            var forms = {
                    signUp: function() {
                        signUp(nsp, data, callback);
                    }
                }

            var form = forms[data.formTitle];

            form();

            // if (callback || typeof callback == "function") {
            //     callback(true);
            // }
        }

        else {
           
            nsp.emit('messaging', {type: 0, body: validation });

        }

    });

    // sockets.networkInterface(nsp, {cmd: data.formTitle, data: data});
}

var saveForm = function(nsp, data) {
    console.log({cmd: data.formTitle, data: data});
}

/* Community Endpoint
-------------------------------------------------- */

var getCommunity = function(nsp) {

    var app = "Communities";
    _path = "http://" + path.join(server, "api", v, app);

   request.get({
        uri: _path
    }, function (error, response, body) {
            if (helpers.isJson(body)) {
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
        if (helpers.isJson(body)) {
            nsp.emit('api', {events: JSON.parse(body)}) 
        }
    });

}

/* Login 
-------------------------------------------------- */

var getSession = function(nsp, callback) {

    // Callback Sync
    function fnLog(err, msg) {
        if (callback || typeof callback == "function") {
            callback(err, msg);
        }
    }


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


            if (helpers.isJson(body)) {
                
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
                                
                                fnLog(null, "Logged In!");
                
                                console.log({message: 'Authenticated the session'});
                            }
                       })
                    }

            })


                fnLog(null, "Attemping Socket Connection...");
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

var signUp = function(nsp, profile, callback) {

    // Callback Sync
    function fnLog(err, msg) {
        if (callback || typeof callback == "function") {
            callback(err, msg);
            return;
        }

     }

    fnLog(null, "Contacting Server...");

    var app = "signup";

    _path = "http://" + path.join(server, app);

    var password = passHash(profile.username, function(hashed) {
   
        var query = { 
            Username: profile.username,
            Email: profile.email,
            validPassword: hashed,
            Avatar: profile.avatar
        };

        request.post({
            uri: _path,
            form: query
        }, function (error, response, body) {

                console.log("E");
                
            if (helpers.isJson(body)) {
                

                var status = JSON.parse(body);

                if (status.Username) {

                    fnLog(null, "Success! Saving New Profile...");

                    var file = appDir+'/config/profiles/' + status.Username + '.json';

                    fs.outputJson(file, status, function(err) {

                        if (err) {
                            nsp.emit('messaging', {type: 0, body: err });
                        }

                        else {
                            fs.copy(file, __sessionFile, function(err){
                              if (err) return console.error(err);

                                fnLog(null, "Logging into Ignition Server...");

                                getSession(nsp, function(err){

                                    if (!err) {
                                        fnLog(null, "Logged In!");
                                    }

                                    else {
                                         nsp.emit('messaging', {type: 0, body: err  });
                                    }

                                });
                            
                            });

                            nsp.emit('api',  {serverEvent: "signup"}); 

                        }

                    });

                }

                // Signup Error
                else {
                    nsp.emit('messaging', {type: 0, body: status.message  });
                }
            }

            // Currupt or undefined return
            else {
                nsp.emit('messaging', {type: 0, body: "Server returned an error." });

            }

            if (error) {

                console.log(error, "Server unreachable?");
            }

        });

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
            if (helpers.isJson(body)) {
                
                // nsp.emit('api', {messages: JSON.parse(body)})
            }
        });

}

/* Exports
-------------------------------------------------- */

exports.getCommunity    = getCommunity;
exports.getEvents       = getEvents;
// exports.getMessages     = signUp;
exports.getMessages     = getMessages;
exports.getSession      = getSession;
exports.leaveSession    = leaveSession;
exports.getFriend       = getFriend;
exports.getActivities   = getActivities;
exports.signUp          = signUp;
exports.submitForm      = submitForm;
exports.submitCache     = submitCache;
exports.validateForm    = validateForm;
