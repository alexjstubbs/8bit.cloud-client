/* Reading filesystem
-------------------------------------------------- */

var fs       = require('fs-extra'),
    _        = require('lodash'),
    settings = require(__base + 'system/system.settings').settings,
    crc      = require('crc');

/*  Read directory, find CRC32 match
-------------------------------------------------- */
var readDirCRC = function(platform, crc32, callback) {
    // console.log(platform);
    // console.log(crc32);

    var path = settings.get.paths.roms+platform;

    fs.readdir(path, function(err, results) {

        if (!err) {

            var buffered,
                filepath,
                i = 0,
                match = 0;

                _(results).forEach(function(result) {

                filepath = path + "/" + result;

                fs.readFile(filepath, function(err, data) {

                    i++;

                        if (!err) {

                            if (data) {

                                buffered = crc.crc32(data).toString(16);

                                if (buffered == crc32) {
                                    if (callback && typeof callback === "function") {
                                        callback(null, path+"/"+result);
                                        match++;
                                    }
                                }

                                else {

                                }

                                // console.log(match);
                            }

                            else {
                                if (callback && typeof callback === "function") {
                                    callback(null, null);
                                }
                            }
                        }

                        else {
                            if (err.code != "EISDIR") {
                                if (callback && typeof callback === "function") {
                                    callback(err, null);
                                }
                            }
                        }


                    // Check if match
                    if (i == results.length) {

                        if (match === 0) {
                            if (callback && typeof callback === "function") {
                                callback(null, null);
                            }
                        }

                    }
                });


            }).value();


        }


        else {
            if (callback && typeof callback === "function") {
                callback(err, null);
            }
        }



    });



};

/* Read JSON file
-------------------------------------------------- */
var readJSONFile = function(nsp, file, callback) {

      fs.readJson(file, function(err, readObject) {

        if (err) {

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

            if (nsp) {
                  nsp.emit('messaging', {type: 0, body: err });
            }

        }

        else {

            if (callback || typeof callback == "function") {
                callback(null, readObject);
            }

            if (nsp) {
                  nsp.emit('api', readObject);
            }

        }

    });

};


/*  Read Directory and Return JSON files
-------------------------------------------------- */
var findJSONFiles = function(path, callback) {

    var results = [];

    if (!path) {

        callback ? callback("No Path Supplied: findJSONFiles", null) : null;

    }

    else {

        fs.readdir(path, function(err, resultsObj) {

            _(resultsObj).forEach(function(filename) {

                if (path.extname(filename) == ".json") {
                    results.push(filename);
                }

            }).value();

                callback ? callback(null, results) : null;

        });

    }

}


/* Exports
-------------------------------------------------- */
exports.readDirCRC     = readDirCRC;
exports.readJSONFile   = readJSONFile;
exports.findJSONFiles  = findJSONFiles;
