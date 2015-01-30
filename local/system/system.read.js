/* Reading filesystem
-------------------------------------------------- */

var fs   = require('fs-extra')
,   _    = require('lodash');

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
exports.readJSONFile   = readJSONFile;
exports.findJSONFiles  = findJSONFiles;
