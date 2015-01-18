/* Writing / Reading filesystem
-------------------------------------------------- */

var fs   = require('fs-extra')
,   read = require('./system.read')
,   _    = require('lodash');

/* Copy a file
-------------------------------------------------- */
var copyFile = function(nsp, src, dest, callback) {

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

                if (callback || typeof callback == "function") {
                    callback(null, data);
                }

            }

    });

}

/*  Unique Advanced Config Files
-------------------------------------------------- */
var writeAdvancedConfig = function(nsp, data, callback) {

    if (!data.package) {
        var error = "There was an error saving your configuration. Please try again.";
        nsp.emit('messaging', {type: 0, body: error });
    }

    else {

        var file = appDir + "/config/platforms/commandline/" + data.package + ".json";

        read.readJSONFile(null, file, function(err, results) {

            if (err) {
                var error = "There was an error reading the configuration file. Please try again.";
                nsp.emit('messaging', {type: 0, body: error });
            }

            else {

                var platform = data.filename;
                var selectList = data.selectList;

                delete data.filename;
                delete data.formTitle;
                delete data.path;
                delete data.package;
                delete data.ensureExists;
                delete data.server;
                delete data.selectList;

                _.forIn(data, function(value, key) {
                    results.arguements[key].default = value;
                });

                var a = 0;
                _.forIn(results.arguements, function(value, key){
                    results.arguements[key].ticked = selectList[a];
                    console.log(selectList[a]);
                    a++;
                });

                results.path = "/config/platforms/commandline/user";
                results.filename = platform;

                writeJSON(null, results, function(err, data) {

                    if (err) {
                        var error = "There was an error saving your configuration. Please try again.";
                        nsp.emit('messaging', {type: 0, body: error });
                    }

                })

            }

        });

    }


}

/* Write Text file
-------------------------------------------------- */
var writeTextSync = function(nsp, data, callback) {

}

/* Exports
-------------------------------------------------- */
exports.writeJSONSync           = writeJSONSync;
exports.writeJSON               = writeJSON;
exports.writeTextync            = writeTextSync;
exports.copyFile                = copyFile;
exports.writeAdvancedConfig     = writeAdvancedConfig;
