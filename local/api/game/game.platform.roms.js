/* List Roms by System
-------------------------------------------------- */
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var platforms = require(appDir+'/config/platforms.json'),
    config = require(appDir+'/config/config.json');

function listRoms(nsp, platform) {

    var listObj = [],
        list,
        _path;

    var initDir = config.roms + platforms[platform].short;

    fs.readdir(initDir, function(err, list) {

        if (err) {

            console.log(err)

        } else {

            _(list).forEach(function(filename) {

                _path = path.join(initDir, filename);


                listObj.push({"filename":filename,"path":_path,"ext":path.extname(filename),"title":filename})

                });

             nsp.emit('api', {gamesList: listObj});

        }

    });

}

exports.listRoms = listRoms;
