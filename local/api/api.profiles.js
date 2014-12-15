/* List Profiles
-------------------------------------------------- */

var fs      = require('fs-extra')
,   path    = require('path')
,   _       = require('lodash')
,   server  = require('./server/server.api');

/* List All Profiles
-------------------------------------------------- */
function listProfiles(nsp) {

    var loc = appDir+"/config/profiles";
    var listObj = [],
        list;

    fs.readdir(loc, function(err, dir) {

        if (err) { console.log(err) }

        else {
            
            _(dir).forEach(function(profile) { 
                listObj.push(
                    {"username": path.basename(profile, '.json')}

                )
            });

            nsp.emit('api', {profiles: listObj});
        }

    })

}

/* New Profile
-------------------------------------------------- */
function newProfile(nsp, data) {

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
                   nsp.emit('clientEvent', {command: "nextScreen", params: null });   
                   nsp.emit('clientEvent', {command: "preloadDashboard", params: null })
                    ;
                }

            });
        
        }

    });



}


/* Exports
-------------------------------------------------- */
exports.listProfiles     = listProfiles;
exports.newProfile       = newProfile;