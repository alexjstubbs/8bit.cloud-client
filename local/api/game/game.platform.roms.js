/* List Roms by System
-------------------------------------------------- */
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

var platforms = require(appDir+'/config/platforms.json'),
    config = require(appDir+'/config/config.json');

function listRoms(nsp, platform) {

    var listObj = [],
        list;

    var initDir = process.env['HOME'] + config.roms + platforms[platform].short;

    fs.readdir(initDir, function(err, list) {
        
        if (err) {

            console.log(err)
        
        } else {

            _(list).forEach(function(filename) { 

                listObj.push({"filename":filename,"ext":path.extname(filename),"title":filename})
                
                });

             nsp.emit('api', {gamesList: listObj});
            
        }

    });

}

exports.listRoms = listRoms;
