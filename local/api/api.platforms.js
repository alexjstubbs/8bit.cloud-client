/* List Roms by System
-------------------------------------------------- */

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var config = require(appDir+'/config/config.json');

function listPlatforms(nsp) {

        var listObj = [],
            list;

        var initDir = path.join(__dirname, '../', 'config/platforms');

        fs.readdir(initDir, function(err, list) {
            if (err) {
                console.log(err)
            } else {
                console.log(list);

                _(list).forEach(function(filename) { 

                    listObj.push(
                         {"name": path.basename(filename, '.json'), "short":"snes","ext":".sms","emulators":{"snes9x":{"path":"/path/to/emu.so","Achievements":{"offset":123,"buffer_length":321,"timing":1}}}}
                        )
                    });

                 nsp.emit('api', {platforms: listObj});

                                 
            }
        });


}

exports.listPlatforms = listPlatforms;
