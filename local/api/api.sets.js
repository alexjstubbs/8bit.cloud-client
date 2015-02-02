/* List Roms by System
-------------------------------------------------- */

var fs      = require('fs-extra'),
    path    = require('path');

/*  Get Set
-------------------------------------------------- */
function getSet(nsp, set) {

    var _path = path.join('./config',set + ".set.json");

    fs.readJson(_path, function(err, eventPackage) {

        nsp.emit('api', {eventSet: eventPackage});

    });


}

/*  Exports
-------------------------------------------------- */
exports.getSet = getSet;
