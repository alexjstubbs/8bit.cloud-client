/* List Profiles
-------------------------------------------------- */

var fs      = require('fs-extra')
,   path    = require('path')
,   _       = require('lodash');


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

/* List Latest Profile (for SignUp)
-------------------------------------------------- */
function latestProfile(nsp) {

    var dir = appDir+"/config/profiles";
    var files = fs.readdirSync(dir);

    var maxxed = _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });

    var _status = "Reading: " + maxxed;

    nsp.emit('api', { status: _status });
    // console.log(maxxed);
}


/* Exports
-------------------------------------------------- */
exports.listProfiles     = listProfiles;
exports.latestProfile    = latestProfile;