/* Game Helpers
-------------------------------------------------- */
var spawn               = require('child_process').spawn,
    fs                  = require('fs-extra'),
    _                   = require('lodash'),
    path                = require('path'),
    database            = require(__base + 'api/database/database.local'),
    listPlatforms       = require(__base + 'api/api.platforms').listPlatforms,
    execute             = require(__base + 'system/system.exec'),
    readJSON            = require(__base + 'system/system.read').readJSONFile,
    settings            = require(__base + 'system/system.settings').settings,
    helpers             = require(__base + 'system/system.helpers'),
    achievements        = require(__base + 'system/achievements/achievement.loop');

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



/*  List Save States
-------------------------------------------------- */
var listSaveStates = function() {
    console.log("no");
}
// var listSaveStates = _.debounce(_listSaveStates, 1000);

function _listSaveStates(nsp, filepath) {

    console.log("called");

    var root = path.basename(filepath, path.extname(filepath));

    // console.log(root);
    // console.log(settings.get.paths.saves);
    var results = [];
    fs.readdir(settings.get.paths.saves, function(err, resultsObj) {

        if (err) { console.log(err); }

        // console.log(resultsObj);

        _(resultsObj).forEach(function(filename, i) {
             if (filename.indexOf(root+".state") > -1) {
                 results.push(filename);

                //  fs.stat(settings.get.paths.saves+"/"+resultsObj[i], function(err, stats) {
                //     console.log(stats.mtime);
                //  });
             }
        }).value();

        if (results) {
            results = results.slice(0,3);
            nsp.emit('api', { saveStates: results });
        }

    });
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

    readJSON(null, __appdirectory+"/config/platforms/commandline/"+software+".json", function(err, results) {

        if (err) {
            console.log(err);
        }

        else {

            if (nsp) {
                nsp.emit('api', {commandlineConfig: results});
            }

            if (callback) {
                callback(null, results);
            }
        }

    });

}


/*  Get Default Commandline Options
-------------------------------------------------- */
function getCommandlineConfig(nsp, payload, callback) {

    // Possible User Config File String
    var pFile = __appdirectory+"/config/platforms/commandline/user/"+payload.shortname+".json";

    // User Has Specific Config
    if (fs.existsSync(pFile)) {

        listPlatforms(null, function(listobj) {

            var platform = listobj[payload.platform];

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

            var platform = listobj[payload.platform];

            readJSON(null, __appdirectory+"/config/platforms/commandline/"+platform.emulators[0]+".json", function(err, results) {


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

}

/*  Set up Multiplayer Launch
-------------------------------------------------- */
function multiplayerPrep(nsp, payload, result) {

    if (helpers.isJSON(payload)) {

        payload = JSON.parse(payload);

        console.log("payload", payload);
        console.log("result", result);

        // { invite:
        //    { gameTitle: '0 SMB.',
        //      platform: 'nes',
        //      software: 'RetroArch',
        //      version: null,
        //      md5: null,
        //      crc32: '3448e736' },
        //   Username: 'alex22',
        //   IP: '162.204.117.255',
        //   _id: '54f92529a1d8ea647ac2f407',
        //   Timestamp: '2015-03-06T03:55:21.375Z' }


        // Payload:
        //     { platform: 'Nintendo',
        //   filepath: '/Users/alexstubbs/roms/nes/0 SMB..zip',
        //   shortname: 'nes',
        //   title: '' }

        var options = {

        };

    }

    else {
        nsp.emit('messaging', {type: 0, body: "Invite contained malformed data." });
    }

}

/* Launch Game/Emulator
-------------------------------------------------- */
function gameLaunch(nsp, payload, config) {

    var bufferSize,
        stateSize,
        atype,
        offset,
        timing,
        asupport = false;

    // if (!config) {

    getCommandlineConfig(null, payload, function(err, results) {

        // Emulator has a setup
        if (results) {

            var selectedArgs = _.where(results.arguements, { 'ticked': true });
            var commandline  = [];

            _.forEach(selectedArgs, function(option) {
                commandline.push(option.arg, option.defaults);
            });

            //Retroarch is the selected emulator
            if (results.cores) {

                //No specified Core Selected
                if (!_.contains(commandline, "-L")) {

                    var core = results.platforms[payload.shortname].cores[0];

                    commandline.push("-L", results.cores[core].path);

                    if (results.cores[core].achievements) {

                        asupport   = true;
                        offset     = results.cores[core].achievements.offset;
                        timing     = results.cores[core].achievements.default_timing;
                        bufferSize = results.cores[core].achievements.buffer_length;
                        stateSize  = results.cores[core].achievements.state_size;
                    }

                }

                else {
                    var ind = _.indexOf(commandline, "-L");
                    ind++;
                    var achievement_list = _.pluck(_.where(commandline, { 'path': commandline[ind] }), 'achievements');

                    if (achievement_list) {
                        asupport   = true;
                        offset     = achievement_list.offset;
                        bufferSize = achievement_list.buffer_length;
                        stateSize  = achievement_list.state_size;
                        timing     = achievement_list.default_timing;
                    }
                }

            }

            // Launch Emulator
            if (payload.filepath) {

                // console.log(payload);

                achievements.dumpRetroRamInit(payload.filepath, function(listedAchievements) {

                    if (!isJson) asupport = false;
                    if (asupport && !timing) timing = 1;
                    if (asupport && !atype)  atype = "UDP";

                    execute('killall qmlscene | renice +20 -p $(pidof qtbrowser)', function() {});

                    var _child = spawn(results.expath, commandline.concat(payload.filepath));

                    // '-c',
                    // '/opt/configs/all/retroarch.cfg',
                    // '-L',
                    // '/opt/emulatorcores/fceu-next/fceumm-code/fceumm_libretro.so',
                    // '/Users/alexstubbs/roms/nes/0 Super Mario Bros..zip' ]

                    var processObj = {
                        name: results.package,
                        pid: _child.pid
                    };

                    __api.emit('processStorage', { processStorage: processObj });
                    nsp.emit('processStorage', { processStorage: processObj });

                    // Start Achievement Loop
                    if (asupport && settings.get.gameplay.run_achievements == "true") { setTimeout(function() { achievements.achievementTimer(nsp, atype, timing); }, 10000); }

                    // TODO: On exit, crash, return to ignition

                    _child.stdout.on('data', function(data) {
                        console.log('(stdout) : ' + data);
                    });


                    _child.stderr.on('data', function(data) {

                        if (data.length >= stateSize) {

                            if (asupport && listedAchievements) {
                                achievements.achievementCheck(nsp, listedAchievements[0], data, offset, bufferSize, function() {});
                            }

                            else {
                                // console.log('(stderr) : ' + data);
                            }
                        }

                        else {
                            // console.log('(stderr) : ' + data);
                        }
                    });


                }); // End of Launch Func/Obj
        }

        else {
            nsp.emit('clientEvent', {command: "resumeClient", params: null });
            var err = "Filepath to ROM is empty or not found";
            nsp.emit('messaging', {type: 0, body: err });

        }

        }

        // No Emulator has been Configured
        else {

            nsp.emit('clientEvent', {command: "resumeClient", params: null });

            var err = "No software has been configured for this specific package.";
            nsp.emit('messaging', {type: 0, body: err });

        }

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

    vg.stdout.on('end', function() {

        data = data.toString('utf8');

        var rLength = data.length;
        var isjson = isJson(data);

        // JSON Friendly Data
        if (isjson === true) {

            data = JSON.parse(data); // Errors

            var _document = data;

            if (rLength > 50) {

                database.storeGame(_document, function(newDocument) {
                    if (newDocument) {
                        callback(null, newDocument);
                        // console.log("found and stored");
                        // nsp.emit('api', {updateGame: newDocument});
                    } else {
                        // console.log("error: No New Document");
                    }
                });
            } else {
                // console.log("error: Document was Shorter than 50 chars so assuming empty.");
            }
        }

        // Not JSON friendly DATA
        else {
            // console.log("error: not JSON data");
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
    var recordTitle;

    // var research = new RegExp(game, "i");

    database.findGame({
        $or: [{
            "games.game.title": game
        }, {
            "games.game.title": 'THE ' + game
        }]
    }, function(doc) {


        if (doc[0].timestamp) {

            doc = doc[0];
            doc = JSON.stringify(doc);
            doc = JSON.parse(doc);

            var gameTitleThe = "THE " + game.toUpperCase();
            var gameTitle = game.toUpperCase();

            if (doc.games.game[0]) {
                recordTitle = doc.games.game[0].title.toUpperCase();
            } else {
                recordTitle = doc.games.game.title.toUpperCase();
            }

            if (gameTitle == recordTitle || gameTitleThe == recordTitle) {

                // console.log("[!!!] MATCHED in Database");

                nsp.emit('api', {updateGame: doc});

            } else {
                for (var key in doc.games.game) {
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

            // console.log("[!!!] Didn't Match in Database");

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


/* Exports
-------------------------------------------------- */
exports.listSaveStates               = listSaveStates;
exports.apicall                      = apicall;
exports.multiplayerPrep              = multiplayerPrep;
exports.gameLaunch                   = gameLaunch;
exports.gameProfileSmall             = gameProfileSmall;
exports.getCommandlineConfig         = getCommandlineConfig;
exports.getSpecificCommandLineConfig = getSpecificCommandLineConfig;
