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


/* Exports
-------------------------------------------------- */
exports.readJSONFile   = readJSONFile;
