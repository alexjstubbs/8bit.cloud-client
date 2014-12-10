/* List Profiles
-------------------------------------------------- */

var fs      = require('fs-extra')
,   path    = require('path')
,   _       = require('lodash');

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

/* Exports
-------------------------------------------------- */
exports.listProfiles = listProfiles;
