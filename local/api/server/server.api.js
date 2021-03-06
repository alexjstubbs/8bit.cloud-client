/* Ignition Server API
-------------------------------------------------- */
var fs          = require('fs-extra'),
    path        = require('path'),
    request     = require('request'),
    sockets     = require(__base + 'api/server/server.sockets'),
    helpers     = require(__base + 'system/system.helpers'),
    forms       = require(__base + 'api/api.forms'),
    profiles    = require(__base + 'api/api.profiles'),
    fileFunc    = require(__base + 'system/system.write');


/* Set up
-------------------------------------------------- */
// fileRead.readJSONFile(null, './config/server.json', function(err, data) {
//
//     if (!err) {
//         var serverapi = data.protocol + path.join(data.address, "api", (data.api));
//     }
//
//     else {
//         nsp.emit('messaging', {type: 0, body: err });
//     }
//
// });

var server = "ignition.io:3000",
    v = "v1";


/* Get User Profile
-------------------------------------------------- */
var getProfile = function(nsp, username) {
    sockets.networkInterface(nsp, { cmd: 'getProfile', parameters: username});
};

/* Add a Friend Endpoint
-------------------------------------------------- */
var addFriend = function(nsp, data) {
    sockets.networkInterface(nsp, { cmd: 'addFriend', parameters: data});
};

/* Friends Endpoint
-------------------------------------------------- */
var getFriends = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getFriends' });
};

/* Activities Endpoint
-------------------------------------------------- */
var getActivities = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getActivities' });
};

/*  Store Activity
-------------------------------------------------- */
var storeActivity = function(nsp, activity) {
    sockets.networkInterface(nsp, {cmd: 'storeActivity', parameters: activity});
};


/* Messages Endpoint
-------------------------------------------------- */
var getMessages = function(nsp) {
    sockets.networkInterface(nsp, { cmd: 'getMessages' });
};

/* Delete Message
-------------------------------------------------- */
var deleteMessage = function(nsp, message) {
    sockets.networkInterface(nsp, { cmd: 'deleteMessage', parameters: message });
};

/*  Send Message
-------------------------------------------------- */
var passMessage = function(nsp, data) {

    if (!data) {
        nsp.emit('messaging', {type: 0, body: "Required Data is Missing from the Form." });
    }

    else {

        var _data = {
            To         : data.To,
            Type       : data.Type,
            Attachment : false,
            Body       : data.Body,
            Invite     : data.Invite
        };

        // Invite     : {
        //     gameTitle : data.Invite.gameTitle,
        //     platform  : data.Invite.platform,
        //     software  : data.Invite.software,
        //     version   : data.Invite.version,
        //     md5       : data.Invite.md5,
        //     crc32     : data.Invite.crc32
        // }

        if (_data.Type == "invite") {
            console.log(data.Invite);
        }

        sockets.networkInterface(nsp, { cmd: 'passMessage', parameters: _data });

        nsp.emit('clientEvent', {command: "closeDialog", params: null });
    }


};

/* Submit Cache Form (offline/online store)
-------------------------------------------------- */
var submitCache = function(nsp, data, callback) {

    switch(data.formTitle) {

        // new Sign Up Form
        case "signUp": {

            profiles.newProfile(nsp, data);
            break;
        }

        case "logIn": {

            offlineSignUp(nsp, data, function() {
                profiles.profileLogin(nsp);
            });

            break;
        }

        default: {
            return;
        }

    }

};


/* Submit Dynamic Form
-------------------------------------------------- */
var validateForm = function(nsp, data, callback) {

    // Validate form then run network command based on form name. Done!
    forms.validate(data, function(validation) {

        if (validation === undefined) {

            if (callback || typeof callback == "function") {
                callback(null, null);
            }
        }

        else {

            nsp.emit('messaging', {type: 0, body: validation });

        }

    });

};

/* Submit Dynamic Form
-------------------------------------------------- */
var submitForm = function(nsp, data, callback) {

    // Validate form then run network command based on form name. Done!
    forms.validate(data, function(validation) {

        if (validation === undefined) {

            var forms = {

                    signUp: function() {
                        signUp(nsp, data, callback);
                    },

                    addFriend: function() {
                        addFriend(nsp, data);
                        // TODO: Add loopback
                        nsp.emit('clientEvent', {command: "closeDialog", params: null });

                    },

                    passMessage: function() {
                        passMessage(nsp, data);
                    }
                };

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
};

/* Community Endpoint
-------------------------------------------------- */

var getCommunity = function(nsp) {

    var app = "Communities";
    var _path = "https://" + path.join(server, "api", v, app);

   request.get({
        uri: _path,
        rejectUnauthorized: false
    }, function (error, response, body) {

            if (helpers.isJSON(body)) {
                nsp.emit('api', {community: JSON.parse(body)});

            }
    });

};


/* Events Endpoint
-------------------------------------------------- */

var getEvents = function(nsp) {

    var app = "Events";

    var _path = "https://" + path.join(server, "api", v, app);

   request.get({

        uri: _path,

        rejectUnauthorized: false

    }, function (error, response, body) {

        if (helpers.isJSON(body)) {

            nsp.emit('api', {events: JSON.parse(body)});

        }

    });

};

/* Login
-------------------------------------------------- */

var getSession = function(nsp, callback) {

    // sockets.removeConnection(nsp);

    // Callback Sync
    function fnLog(err, msg) {
        if (callback || typeof callback == "function") {
            callback(err, msg);
        }
    }

    var app = "login";

    var _path = "https://" + path.join(server, app);

    fs.readJson(__sessionFile, function(err, userProfile) {

        if (err) {

            console.log("error with session: "+err);
            // nsp.emit('messaging', {type: 0, body: err });

        }

        var creds = {
            Username: userProfile.Username,
            validPassword: userProfile.validPassword
        };

        request.post({
            uri: _path,
            form: creds,
            rejectUnauthorized: false
        }, function (error, response, body) {

            if (helpers.isJSON(body)) {

                // Got new token

                sockets.removeToken();

                var _token = JSON.parse(body);

                userProfile.token = _token.token;

                userProfile.filename = __sessionFile;

                // Write it
                fileFunc.writeJSON(nsp, userProfile, function(err) {

                    if (!err) {

                        // Copy succeeded session file to profile file
                       fileFunc.copyFile(nsp, __sessionFile, __appdirectory + '/config/profiles/' + userProfile.Username + '.json', function(err) {

                            if (err) console.log({erroree: err});

                            else {

                                fnLog(null, "Logged In!");

                                getSockets(nsp, _token);

                            }
                       });

                    }
            });

        }


        else {

            if (!error) {
                error = {};
                error.code = "default";
            }

            switch(error.code) {

                case "ECONNREFUSED": {

                    // nsp.emit('messaging', {type: 0, body: "The ignition server seems to be temporarily down. Logging in Offline." });

                    // TODO: Findout if user is offline or server is offline. Notify if user is online but server is not, do not notify the other way around (offline mode).

                     nsp.emit('clientEvent', {command: "preloadDashboard", params: null });
                     break;
                }

                default: {

                    console.log(error);

                    nsp.emit('messaging', {type: 0, body: "Could Not Authenticate User. Make sure you have a valid username and password." });

                }

            }

        }


        });

    });

};

/* Signup
-------------------------------------------------- */

var signUp = function(nsp, profile, callback) {


    nsp.emit('clientEvent', {command: "signUpSubmit", params: null });

    // Callback Sync
    function fnLog(err, msg) {
        if (callback || typeof callback == "function") {
            callback(err, msg);
            return;
        }

     }

    var app = "signup";
    var _path = "https://" + path.join(server, app);

        var query = {
            Username: profile.username,
            Email: profile.email,
            validPassword: profile.password,
            Avatar: profile.avatar
        };

        request.post({
            uri: _path,
            form: query,
            rejectUnauthorized: false
        }, function (error, response, body) {

            if (helpers.isJSON(body)) {

                var status = JSON.parse(body);

                if (status.error) {
                     fnLog(status.error, null);
                }

                else {

                    var file = __appdirectory + '/config/profiles/' + status.profile.Username + '.json';

                    if (status.profile.Username) {

                        status.profile.validPassword = profile.password;
                        status.profile.filename = file;


                        fileFunc.writeJSON(nsp, status.profile, function(err) {

                            if (err) {
                                console.log(err);
                            }

                            else {

                                fileFunc.copyFile(nsp, file, __sessionFile, function(err) {

                                  if (err) {
                                      console.error(err);
                                  }

                                  else {

                                    getSession(nsp, function(err){

                                        if (!err) {
                                            fnLog(null, "Logged In!");
                                        }

                                        else {
                                             nsp.emit('messaging', {type: 0, body: err  });
                                        }

                                    });

                                }

                            });

                                nsp.emit('api',  {serverEvent: "signup"});

                            }

                        });

                    }

                    else {


                    fnLog(status, null);

                    // nsp.emit('messaging', {type: 0, body: status.message  });
                    }

                }


                // Signup Error

            }

            // Currupt or undefined return
            else {
                // nsp.emit('messaging', {type: 0, body: "Server returned an error." });

                //  fnLog("Server Returned an Error", null);

                offlineSignUp(nsp, query, function() {
                    fnLog("Server Returned an Error", null);
                });

            }

            if (error) {

                // Server most likely Offline
                fnLog({error: { id: "server_offline", message: "Your connection to the server cannot be established. Please check your internet connection and the status of the ignition.io service."}}, null);

            }

    });

};

/*  Offline SignUp
 *  TODO: Move this to profiles. Break everything into smaller functions
-------------------------------------------------- */
var offlineSignUp = function(nsp, passedProfile, callback) {

        var profile = {
            Username:       passedProfile.username,
            validPassword:  passedProfile.password
        };


        var file = __appdirectory + '/config/profiles/' + profile.Username + '.json';

        profile.filename = file;

        if (profile.Username) {

            fileFunc.writeJSON(nsp, profile, function(err) {

                if (err) {
                    console.log(err);
                }

                else {

                    fs.ensureFile(__sessionFile, function(err) {

                        if (!err) {
                            fileFunc.copyFile(nsp, file, __sessionFile, function(err) {
                                  if (err) {
                                      console.error(err);
                                  }

                                  else {
                                      callback();
                                  }

                                });
                        }
                });

            }

        });

    }
};

/* Socket Connection
-------------------------------------------------- */

var getSockets = function(nsp, token) {

    var app = "sockets";
    var _path = "https://" + path.join(server, app);

       request.post({
            uri: _path,
            rejectUnauthorized: false,
            form: {token: token.token }
        }, function (error, response, body) {
            sockets.networkConnection(token.token, nsp);
        });

};

/* Logout
-------------------------------------------------- */

var leaveSession = function(nsp) {

    var app = "logout";
    var _path = "https://" + path.join(server, app);

       request.post({
            uri: _path,
            rejectUnauthorized: false,
            form: { Username: "", validPassword: "" }
        }, function (error, response, body) {
            if (helpers.isJSON(body)) {

                // nsp.emit('api', {messages: JSON.parse(body)})
            }
        });

};

/* Exports
-------------------------------------------------- */

exports.getProfile      = getProfile;
exports.getCommunity    = getCommunity;
exports.getEvents       = getEvents;
exports.getMessages     = getMessages;
exports.deleteMessage   = deleteMessage;
exports.getSession      = getSession;
exports.leaveSession    = leaveSession;
exports.getFriends      = getFriends;
exports.getActivities   = getActivities;
exports.storeActivity   = storeActivity;
exports.signUp          = signUp;
exports.offlineSignUp   = offlineSignUp;
exports.submitForm      = submitForm;
exports.submitCache     = submitCache;
exports.validateForm    = validateForm;
