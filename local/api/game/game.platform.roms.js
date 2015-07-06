/* List Roms by System
-------------------------------------------------- */
var fs          = require('fs-extra'),
    path        = require('path'),
    _           = require('lodash'),
    helpers     = require(__base + 'system/system.helpers'),
    platforms,
    config;

/*  List Roms
-------------------------------------------------- */
function listRoms(nsp, obj) {

    var platform = obj.platform,
        start    = obj.start,
        end;

    fs.readJson(__appdirectory+'/config/config.json', function(err, packageObj) {

        if (!err) {

            config = packageObj;

            fs.readJson(__appdirectory+'/config/platforms.json', function(err, packageObj) {

                if (!err) {

                    platforms = packageObj;

                    var listObj = [],
                        list,
                        _path;

                    var initDir = config.paths.roms + platforms[platform].short;

                    fs.readdir(initDir, function(err, list) {

                        if (err) {

                            nsp.emit('api', {gamesList: "null", end: 0});

                        } else {
                            start = parseInt(start);

                            end = list.length;

                            list = list.slice(start, start+20);

                            _(list).forEach(function(filename) {

                                if (!helpers.isUnixHiddenPath(filename) && path.extname(filename) !== '') {

                                    // if (path.extname(filename) )
                                    // _.contains(collection, target, [fromIndex=0])

                                    _path = path.join(initDir, filename);

                                    listObj.push({
                                        "filename": filename,
                                        "path": _path,
                                        "ext": path.extname(filename),
                                        "title": filename
                                    });

                                }

                                else {
                                    end--;
                                }

                            }).value();

                            nsp.emit('api', {gamesList: listObj, page: start, end: end});

                        }

                    });

                }

            });

        }
    });

}

/*  Exports
-------------------------------------------------- */
exports.listRoms = listRoms;
