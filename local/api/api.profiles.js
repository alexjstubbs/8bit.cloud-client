/* List Profiles
-------------------------------------------------- */

var fs      = require('fs-extra')
,   path    = require('path')
,   _       = require('lodash')
,   server  = require('./server/server.api')
,   async   = require('async');


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

    async.series([
        // Validate Form, Show Next Screen,
        function(callback){
            server.validateForm(nsp, data, function(err) {

                if (err) {
                     callback(err, null);
                }

                else {

                    // Validated Form
                    nsp.emit('clientEvent', {command: "nextScreen", params: null });
                    callback(null, "validated");
                
                }
               
            })
            
        },
        function(callback){

            server.signUp(nsp, data, function(err, msg) {
                console.log(msg);

                nsp.emit('api', { loadingStatus:msg });
            
            });

            // callback(null, 'two');
        }
    ],
    // optional callback
    function(err, results){

        if (err) {
           nsp.emit('messaging', {type: 0, body: err });
        }

        else {
            // Load Ignition Dashboard HERE
        }
    });

}


/* Exports
-------------------------------------------------- */
exports.listProfiles     = listProfiles;
exports.newProfile       = newProfile;