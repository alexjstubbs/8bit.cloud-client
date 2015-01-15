/* List Roms by System
-------------------------------------------------- */
var fs          = require('fs-extra')
,   path        = require('path')
,   _           = require('lodash')
,   platforms;

/*  List Platforms / Software
-------------------------------------------------- */
function listPlatforms(nsp) {

    fs.readJson(appDir+'/config/platforms.json', function(err, packageObj) {

        if (!err) {

            platforms = packageObj;

                var listObj = [],
                    list;

                _(platforms).forEach(function(platform) {

                    listObj.push({
                             "long": platform.long,
                             "short": platform.short,
                             "ext": platform.ext,
                             "emulators": platforms.emulators
                        });
                    });

                nsp.emit('api', {platforms: listObj});

            }

            else {
                console.log(err);
            }

    });

}

/*  Exports
-------------------------------------------------- */
exports.listPlatforms = listPlatforms;
