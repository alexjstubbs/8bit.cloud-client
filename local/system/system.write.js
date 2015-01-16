/* Writing / Reading filesystem
-------------------------------------------------- */

var fs   = require('fs-extra')
,   _    = require('lodash');

/* Copy a file
-------------------------------------------------- */
var copyFile = function(nsp, src, dest, callback) {

    console.log(src);
    console.log(dest);

    fs.copy(src, dest, function(err) {

        if (err) {

            nsp.emit('messaging', {type: 0, body: err });

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

        }

        else {

             if (callback || typeof callback == "function") {
                callback(null, true);
            }

        }

    })

};


/* Read JSON files, modify properties/property and re-save file
-------------------------------------------------- */

var writeJSONSync = function(nsp, data, callback) {

    console.log(data.ensureExists);

    if (data.path) {

        var file = appDir + data.path + "/" + data.filename;

    }

    else {

         var file = data.filename;

    }

    if (data.ensureExists) {



        fs.ensureFile(file, function(err) {


            if (err) {
                console.log(err);
            }

            else {


                fs.writeJson(file, {created: Date.now() / 1000 | 0}, function(err) {
                    if (err) {
                        console.log(err);
                    }

                    else {
                        writeFile();
                    }

                })
            }

        });
    }

    else {
        writeFile();
    }

    function writeFile() {


        fs.readJson(file, function(err, object) {

            if (err) {

                console.log(err);

                if (callback || typeof callback == "function") {
                    callback(err, null);

                }

            }

            else {

                var merged = _.merge(object, data);

                delete merged.formTitle;
                delete merged.path;
                delete merged.filename;
                delete merged.ensureExists;
                delete merged.server;
                delete merged.created;

                fs.outputJson(file, merged, function(err) {

                    if (err) {

                        if (callback || typeof callback == "function") {
                            callback(err, null);
                        }

                    }

                    else {

                        console.log("[i] Wrote Data: " + data);

                        if (callback || typeof callback == "function") {
                            callback(null, data);
                        }

                    }

                });

            }

        });

    }

}

/* Write/Overwrite a new json File
-------------------------------------------------- */

var writeJSON = function(nsp, data, callback) {

    if (data.path) {

        var file = appDir + data.path + "/" + data.filename;

    }

    else {

         var file = data.filename;

    }

    delete data.filename;
    delete data.formTitle;
    delete data.path;

    fs.outputJson(file, data, function(err) {


        if (err) {

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

        }

        else {

                console.log("[i] Wrote Data: " + data);

                if (callback || typeof callback == "function") {
                    callback(null, data);
                }

            }

    });

}



/* Write Text file
-------------------------------------------------- */
var writeTextSync = function(nsp, data, callback) {

}

/* Exports
-------------------------------------------------- */
exports.writeJSONSync   = writeJSONSync;
exports.writeJSON       = writeJSON;
exports.writeTextync    = writeTextSync;
exports.copyFile        = copyFile;
