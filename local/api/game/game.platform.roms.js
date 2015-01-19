/* List Roms by System
-------------------------------------------------- */
var fs      = require('fs-extra')
,   path    = require('path')
,   _       = require('lodash')
,   platforms
,   config;


/*  List Roms
-------------------------------------------------- */
function listRoms(nsp, platform) {

    fs.readJson(appDir+'/config/config.json', function(err, packageObj) {

        if (!err) {

            config = packageObj;

            fs.readJson(appDir+'/config/platforms.json', function(err, packageObj) {

                if (!err) {

                    platforms = packageObj;

                    var listObj = [],
                        list,
                        _path;

                    var initDir = config.roms + platforms[platform].short;

                    fs.readdir(initDir, function(err, list) {

                        if (err) {

                            console.log(err);


                            nsp.emit('api', {gamesList: null});

                        } else {

                            _(list).forEach(function(filename) {

                                // if (path.extname(filename) )
                                // _.contains(collection, target, [fromIndex=0])


                                _path = path.join(initDir, filename);

                                listObj.push({
                                    "filename": filename,
                                    "path": _path,
                                    "ext": path.extname(filename),
                                    "title": filename
                                });

                            });

                            nsp.emit('api', {gamesList: listObj});

                        }

                    });

                };

            })

        };
    })

}

/*  Exports
-------------------------------------------------- */
exports.listRoms = listRoms;
