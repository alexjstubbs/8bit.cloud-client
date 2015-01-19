/* Game Helpers
-------------------------------------------------- */
var database            = require(appDir+'/local/api/database/database.local')
,   execute             = require(appDir+'/local/system/system.exec')
,   achievements        = require(appDir+'/local/system/achievements/achievement.loop').achievements
,   util                = require('util')
,   spawn               = require('child_process').spawn
,   fs                  = require('fs-extra')
,   _                   = require('lodash')
,   listPlatforms       = require(appDir+'/local/api/api.platforms').listPlatforms
,   readJSON            = require(appDir+'/local/system/system.read').readJSONFile;

/* Check for valid JSON return
-------------------------------------------------- */
function isJson(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

/* Check For Sequels
-------------------------------------------------- */
function hasNumbers(string) {
    var regex = /\d/g;
    return regex.test(string);
}

/* Cap For DB Store
-------------------------------------------------- */
function toCap(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/*  Get Specific Commandline Config
-------------------------------------------------- */
function getSpecificCommandLineConfig(nsp, software, callback) {

    readJSON(null, appDir+"/config/platforms/commandline/"+software+".json", function(err, results) {

        if (err) {
            console.log(err);
        }

        else {

            if (nsp) {
                nsp.emit('api', {commandlineConfig: results});
            };

            if (callback) {
                callback(null, results);
            };
        }

    })

};


/*  Get Default Commandline Options
-------------------------------------------------- */
function getCommandlineConfig(nsp, payload, callback) {

    // Possible User Config File String
    var pFile = appDir+"/config/platforms/commandline/user/"+payload.shortname+".json";

    // User Has Specific Config
    if (fs.existsSync(pFile)) {

        listPlatforms(null, function(listobj) {

            var platform = listobj[payload.platform]

            readJSON(null, pFile, function(err, results) {

                if (nsp) {
                    nsp.emit('api', {commandlineConfig: results});
                    nsp.emit('api', {softwareChoices: platform.emulators});
                }

                if (callback) {
                    callback(null, results);
                }

            });

        });

    }

    // No User Config, Use Default Config
    else {

        listPlatforms(null, function(listobj) {

            var platform = listobj[payload.platform]

            readJSON(null, appDir+"/config/platforms/commandline/"+platform.emulators[0]+".json", function(err, results) {


                if (nsp) {
                    nsp.emit('api', {commandlineConfig: results});
                    nsp.emit('api', {softwareChoices: platform.emulators});
                };

                if (callback) {
                    callback(null, results);
                };

            })

        });
    }

}


/* Launch Game/Emulator
-------------------------------------------------- */
function gameLaunch(nsp, payload) {

    getCommandlineConfig(null, payload, function(err, results) {


        var selectedArgs = _.where(results.arguements, { 'ticked': true });
            commandline  = [];


        _.forEach(selectedArgs, function(option, i) {
            commandline.push(option.arg, option.defaults);
        });

        // Path to executable
        var expath = results.path;


        //Retroarch is the selected emulator
        if (results.cores) {

            //No specified Core Selected
            if (!_.contains(commandline, "-L")) {

            var core = results.platforms[payload.shortname].cores[0];
            commandline.push("-L", results.cores[core].path);

            }

        }

        console.log("command: "+ results.expath +" " + commandline.join(' ') + ' "'+payload.filepath+'"');

        // Launch Emulator

        execute(results.expath +" " + commandline.join(' ') + ' "'+payload.filepath+'"', function(error, stderr, stdout) {

            if (stderr) {
                nsp.emit('messaging', {type: 0, body: stderr });
            }

            nsp.emit('clientEvent', {command: "resumeClient", params: "null" });

        });


    });

}

/* Call Archive.vg API to store and populate game
-------------------------------------------------- */
function apicall(nsp, game, callback) {

    // python archive_api_call.py api.archive.vg/2.0/Archive.search/json/ Super+Castlevania
    var vg = spawn('python', ['/Users/alexstubbs/projects/Ignition/Release/local/api/database/py/archive_api_call.py', 'api.archive.vg/2.0/Archive.search/json/', game]);

    var data = '';

    vg.stdout.on('data', function(buffer) {
        data += buffer;
    });

    vg.stdout.on('end', function(err) {

        data = data.toString('utf8');

        var rLength = data.length;
        var isjson = isJson(data);

        // JSON Friendly Data
        if (isjson == true) {

            data = JSON.parse(data); // Errors

            _document = data;

            if (rLength > 50) {

                database.storeGame(_document, function(newDocument) {
                    if (newDocument) {
                        callback(null, newDocument);
                        // console.log("found and stored");

                        // nsp.emit('api', {updateGame: newDocument});
                    } else {
                        console.log("error: No New Document");
                    }
                });
            } else {
                console.log("error: Document was Shorter than 50 chars so assuming empty.");
            }
        }

        // Not JSON friendly DATA
        else {

            console.log("error: not JSON data");
        }

    });

    vg.stderr.on('data', function(data) {
        // console.log("error stdouts: " + data)
        callback(data, null);
    });

}


/* Get Preview Profile
-------------------------------------------------- */
function gameProfileSmall(nsp, game) {

    game = game.trim();

    var research = new RegExp(game, "i");

    database.compactDatabase("games");

    database.findGame({
        $or: [{
            "games.game.title": {
                $regex: research
            }
        }, {
            "games.game.title": 'THE ' + {
                $regex: research
            }
        }]
    }, function(doc) {

        if (doc[0].timestamp) {

            doc = doc[0];
            doc = JSON.stringify(doc);
            doc = JSON.parse(doc);

            var gameTitleThe = "THE " + game.toUpperCase();
            var gameTitle = game.toUpperCase();

            if (doc.games.game[0]) {
                var recordTitle = doc.games.game[0].title.toUpperCase()
            } else {
                var recordTitle = doc.games.game.title.toUpperCase()
            };

            if (gameTitle == recordTitle || gameTitleThe == recordTitle) {

                // console.log("[!!!] MATCHED in Database");

                nsp.emit('api', {updateGame: doc});

            } else {
                for (key in doc.games.game) {
                    if (doc.games.game[key].title) {
                        if (doc.games.game[key].title.toUpperCase() == gameTitle || gameTitleThe == doc.games.game[key].title.toUpperCase()) {
                            doc.games.game[0] = doc.games.game[key];
                            break;
                        } else {
                            // delete doc.games.game[key];
                        }
                    }
                }
            }

           nsp.emit('api', {gameInfo: doc.games.game[0]});


        } else {

            console.log("[!!!] Didn't Match in Database");

            apicall(null, game, function(err, newDoc) {
                if (err) {
                    console.log(err);
                } else {
                    nsp.emit('api', {updateGame: newDoc});
                }
            });
        }
    });

}

/* Large Game Profile
-------------------------------------------------- */
function gameProfileLarge(req, res, callback) {

    res.render('profile', {
        'locals': [{
            passed: "Stuff"
        }]
    });


}


/* Exports
-------------------------------------------------- */
exports.apicall                         = apicall;
exports.gameLaunch                      = gameLaunch;
exports.gameProfileSmall                = gameProfileSmall;
exports.gameProfileLarge                = gameProfileLarge;
exports.getCommandlineConfig            = getCommandlineConfig;
exports.getSpecificCommandLineConfig    = getSpecificCommandLineConfig;
