/* List Roms by System
-------------------------------------------------- */
var fs          = require('fs-extra')
,   path        = require('path')
,   _           = require('lodash')
,   platforms
,   config;


/*  List Roms
-------------------------------------------------- */
function listRoms(nsp, obj) {

    var platform = obj.platform,
        start    = obj.start;

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

                            res.status(500).json({gamesList: null})

                        } else {


                            start = parseInt(start);

                            list = list.slice(start, start+20)

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

                            nsp.emit('api', {gamesList: listObj, page: start});

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
