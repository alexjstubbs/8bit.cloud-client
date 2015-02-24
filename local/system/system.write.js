/* Writing / Reading filesystem
-------------------------------------------------- */

var fs      = require('fs-extra'),
    exec    = require('child_process').exec,
    network = require('child_process').exec,
    _       = require('lodash'),
    read    = require(__base + 'system/system.read');


/*  Remove a file
-------------------------------------------------- */
var removeFile = function(nsp, file, callback) {

    file = __appdirectory + file;

    fs.unlink(file, function (err) {
        if (err) {

            if (nsp) {
                nsp.emit('messaging', {type: 0, body: err });
            }

            if (callback || typeof callback == "function") {
                callback(err, null);
            }

        }

        else {

            if (callback || typeof callback == "function") {
                callback(null, true);
            }

        }

    });

};

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

    });

};


/* Read JSON files, modify properties/property and re-save file
-------------------------------------------------- */

var writeJSONSync = function(nsp, data, callback) {

    var file;

    console.log(data);
    
    if (data.path) {

        file = __appdirectory + data.path + "/" + data.filename;

    }

    else {

         file = data.filename;

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

                });
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

};

/* Write/Overwrite a new json File
-------------------------------------------------- */

var writeJSON = function(nsp, data, callback) {

    var file;

    if (data.path) {

        file = __appdirectory + data.path + "/" + data.filename;

    }

    else {

         file = data.filename;

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

};

/*  Unique Advanced Config Files
-------------------------------------------------- */
var writeAdvancedConfig = function(nsp, data, callback) {

    if (!data.package) {
        var error = "There was an error saving your configuration. Please try again.";
        nsp.emit('messaging', {type: 0, body: error });
    }

    else {

        var file = __appdirectory + "/config/platforms/commandline/" + data.package + ".json";

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
                    console.log(value);
                    results.arguements[key].defaults = value;
                });

                var a = 0;
                _.forIn(results.arguements, function(value, key){
                    results.arguements[key].ticked = selectList[a];
                    a++;
                });

                results.path = "/config/platforms/commandline/user";
                results.filename = platform;

                writeJSON(null, results, function(err, data) {

                    if (err) {
                        var error = "There was an error saving your configuration. Please try again.";
                        nsp.emit('messaging', {type: 0, body: error });
                    }

                });

            }

        });

    }


};


/*  Write Simple Wifi Config
-------------------------------------------------- */
var writeWifiConfig = function(nsp, data, callback) {

    if (!data.ssid || !data.passphrase) {
        nsp.emit('messaging', {type: 0, body: "A required field is missing" });
    }

    var file = '/etc/wpa_supplicant/wpa_supplicant.conf';
    // var file = '/Users/alexstubbs/_wpa_supplicant.conf';

    delete data.formTitle;
    delete data.server;

    var contents = 'ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\n' +
                    'update_config=1\n' +
                    '\n' +
                    'network={\n' +
                    '   ssid="'+data.ssid+'"\n' +
                    '   psk="'+data.passphrase+'"\n' +
                    '   key_mgmt="'+data.key_mgmt+'"\n' +
                    '}\n';

    // Ensure file exists
    fs.ensureFile(file, function(err) {
        if (err) {
            nsp.emit('messaging', {type: 0, body: err });
        }

            // Make Backup
            copyFile(nsp, file, file + "~backup", function(err) {
                if (err) {
                    nsp.emit('messaging', {type: 0, body: err });
                }

                // Write new Config
                else {
                    fs.outputFile(file, contents, function(err) {
                        if (err) {
                            nsp.emit('messaging', {type: 0, body: err });
                        }

                        // Test Configuration
                        else {
                            // nsp.emit('clientEvent', {command: "toggleAnimateElement", params: "tester-spin" });
                            exec('wpa_supplicant -B -i interface -c /etc/wpa_supplicant/example.conf', function(err, stderr, stdout) {

                                if (!err && !stderr) {

                                    network.isOnline(null, function(online) {

                                        // Test Suceeded
                                        if (online) {
                                            nsp.emit('clientEvent', {command: "toggleAnimateElement", params: "tester-spin" });
                                            nsp.emit('messaging', {type: 1, body: "This configuration is valid! You may now create an online profile." });
                                        }

                                        // Test Failed
                                        else {
                                            nsp.emit('clientEvent', {command: "toggleAnimateElement", params: "tester-spin" });
                                            nsp.emit('messaging', {type: 0, body: "No connection could be established with this configuration." });
                                        }

                                    });
                                }
                                else {
                                    nsp.emit('clientEvent', {command: "toggleAnimateElement", params: "tester-spin" });
                                    nsp.emit('messaging', {type: 0, body: err + "\n" + stderr });
                                }
                            });
                        }
                    });

                }
            });

    });


};


/* Write Text file
-------------------------------------------------- */
var writeTextSync = function(nsp, data, callback) {

};

/* Exports
-------------------------------------------------- */
exports.removeFile              = removeFile;
exports.writeJSONSync           = writeJSONSync;
exports.writeJSON               = writeJSON;
exports.writeTextync            = writeTextSync;
exports.copyFile                = copyFile;
exports.writeWifiConfig         = writeWifiConfig;
exports.writeAdvancedConfig     = writeAdvancedConfig;
