/* List Profiles
-------------------------------------------------- */

var fs       = require('fs-extra')
,   path     = require('path')
,   _        = require('lodash')
,   server   = require('./server/server.api')
,   sysRead  = require('../system/system.read')
,   sysWrite = require('../system/system.write');


/* Create Session
-------------------------------------------------- */
function createSession(nsp, copyObject) {

    sysWrite.copyFile(nsp, copyObject.src, copyObject.dest, function(err) {

        if (err) {

             nsp.emit('messaging', {type: 0, body: err });

        }

        else {

            profileLogin(nsp);

        }

    });

}


/* Get Session
-------------------------------------------------- */
function getSession(nsp) {

    sysRead.readJSONFile(null, "config/profiles/Session.json", function(err, sessionObject) {

        if (err) {

            nsp.emit('messaging', {type: 0, body: err });

        }

        else {

            var sessionObject = {

                session: sessionObject

            }

            nsp.emit('api', sessionObject)
        }

    });

}

/* List All Profiles
-------------------------------------------------- */
function listProfiles(nsp) {

    var loc = appDir+"/config/profiles";
    var listObj = [],
        list;

    fs.readdir(loc, function(err, dir) {

        if (err) {
            nsp.emit('messaging', {type: 0, body: err });
        }

        else {

            _(dir).forEach(function(profile) {

                if (profile != "Session.json" && profile != ".DS_Store") {

                    listObj.push({"username": path.basename(profile, '.json')});

                }

            });

            nsp.emit('api', {profiles: listObj});
        }

    })

}

/* Profile Login to server
-------------------------------------------------- */
function profileLogin(nsp) {

    // Error Handeling
     function profileError(err) {

        switch(err.id) {

            case "wrong_password":
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "closeDialog", dataParameters: null, button: "Reset Password" });
                break;

            default:
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "preloadDashboard", dataParameters: null, button: "Continue Offline" });
                break;
        }
    }

        // Server Login
        server.getSession(nsp, function(err, msg) {

            if (err) {

                nsp.emit('clientEvent', {command: "preloadDashboard", params: null });

                profileError(err);
            }

            // Success! Load Dashboard
            else {
                
                nsp.emit('clientEvent', {command: "preloadDashboard", params: null });

            }

        });

}


/* New Profile
-------------------------------------------------- */
function newProfile(nsp, data) {

    // Error Handeling
    function profileError(err) {

        switch(err.id) {

            case "username_taken":
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "closeDialog", dataParameters: null, button: "Choose another Username" });
                break;

            case "email_taken":
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "profileScreen", dataParameters: null, button: "Login" });
                break;

            case "password_notmatched":
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "closeDialog", dataParameters: null, button: "Re-enter my password" });
                break

            default:
                nsp.emit('messaging', {type: 0, body: err.message, dataFunction: "preloadDashboard", dataParameters: null, button: "Load Dashboard Anyway" });
                break;

        }
    };

    // Validate Form
    server.validateForm(nsp, data, function(err) {

        if (err) {

            profileError(err);

        }

        // Travel to next screen.
        else {

            // Server Signup
            server.signUp(nsp, data, function(err, msg) {

                if (err) {

                    profileError(err);

                }

                // Success! Load Dashboard
                else {

                   // nsp.emit('clientEvent', {command: "nextScreen", params: null });
                   nsp.emit('clientEvent', {command: "preloadDashboard", params: null });

                }

            });

        }

    });

}


/* Exports
-------------------------------------------------- */
exports.createSession    = createSession;
exports.getSession       = getSession;
exports.listProfiles     = listProfiles;
exports.newProfile       = newProfile;
exports.profileLogin     = profileLogin;
