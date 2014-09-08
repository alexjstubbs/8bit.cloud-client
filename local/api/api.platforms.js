/* List Roms by System
-------------------------------------------------- */

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    platforms = require('../../config/platforms.json');

var config = require(appDir+'/config/config.json');

function listPlatforms(nsp) {

        var listObj = [],
            list;

        _(platforms).forEach(function(platform) { 
            listObj.push(
                 {"long": platform.long, "short": platform.short,"ext": platform.ext,"emulators": platforms.emulators}
                )
            });

        nsp.emit('api', {platforms: listObj});

}

exports.listPlatforms = listPlatforms;
