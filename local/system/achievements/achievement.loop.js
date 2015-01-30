/* Checks Achievements during gameplay
-------------------------------------------------- */
var fs          = require('fs-extra')
,   _           = require('lodash')
,   crc         = require('crc')
,   hex         = require(appDir+'/local/system/achievements/achievement.hex.helper')
,   exec        = require('child_process').exec
,   helpers     = require(appDir+'/local/system/system.helpers')
,   database    = require(appDir+'/local/api/database/database.local');

/* Set JS Conditional Operators into an iterable Object.
-------------------------------------------------- */
var operators = {
    '+': function(a, b) {
        return a + b
    },
    '<': function(a, b) {
        return a < b
    },
    '==': function(a, b) {
        return a == b
    },
    '!=': function(a, b) {
        return a != b
    },
    '>=': function(a, b) {
        return a >= b
    },
    '<=': function(a, b) {
        return a <= b
    }
};

/*  Get all Achievements of selected game for play session
------------------------------------------------- */
function dumpRetroRamInit(filepath, callback) {

    fs.readFile(filepath, function(err, data) {

        if (!err) {

            var fileCRC32 = crc.crc32(data).toString(16);
            console.log("file CRC32: "+fileCRC32);

            database.findAchievements({CRC32: { $in: [fileCRC32.toString('hex')] }}, function(data) {
                callback(data);
            });
        }

        else {
            console.log("[error] No data read from ROM for crc check "+err);
        }

    });

}

/*  Achievement Timer
-------------------------------------------------- */
function achievementTimer(nsp, type, interval) {

    var command,
        errcount = 0;

    if (!interval) interval = 1;

    // Type of Achievement Check Method
    switch (type) {
        case "UDP":
            command = "watch -n " + interval + " echo -n SYSTEM_RAM >/dev/udp/localhost/55355";
        break;
        default:
            command = "watch -n " + interval + "echo -n SYSTEM_RAM >/dev/udp/localhost/55355";
    }

    // Start Execution
    var watch = exec(command);

    watch.stderr.on('data', function(data) {
        errcount++;
        if (errcount > 20) {
            exec("killall watch", function(stderr, stdout) {});
            nsp.emit('messaging', {type: 0, body: "Could not start achievement client. Error: "+stderr});
        }
    });

    watch.stdout.on('data', function(data) {
        // console.log(data);
    });

    watch.on('close', function(code) {
        // TODO: If crash, restart with dialog and dump.
        console.log('(exitcode): ' + code);
    });
}

/* Load JSON of games acheivements
/  Add Address' into array, pass array to checkhex
-------------------------------------------------- */
function achievementCheck(nsp, gameAchievements, stdin, offset, bufferSize, callback) {

// TODO: Break these into simple functions.
// TODO: Serious error handling and type checking here.

    var address     = '',
        addresses   = [],
        debug       = true;

    // Create Array of Addresses
    for (var key in gameAchievements.Achievements) {
        address = gameAchievements.Achievements[key].address;
        addresses.push(address);
    }

    debug ? console.log(addresses) : null;

        // Get values
        hex.checkHex(stdin, offset, bufferSize, addresses, function(_hex) {

            debug ? console.log("[i] Current Values:" + _hex) : null;

                var i = -1,
                    multiplier,
                    flat,
                    subaddresses;

                // Loop Thru Each Master Address
                for (var key in gameAchievements.Achievements) {

                    i++;

                    multiplier = _.size(gameAchievements.Achievements[key].multiples); // 1

                    var op      = gameAchievements.Achievements[key].operator,
                        operand = gameAchievements.Achievements[key].operand,
                        result  = operators[op](_hex[i], operand);

                    // Master Achievement Unlocked.
                    if (result && multiplier >= 1) {

                        debug ? console.log("[!]: Master Unlocked : " + multiplier) : null;

                        flat = _.flatten(gameAchievements.Achievements[key].multiples),
                        subaddresses = _.pluck(flat, 'address');

                        hex.checkHex(stdin, offset, bufferSize, subaddresses, function(__hex) {

                            debug ? console.log("[i] Sub Values: "+__hex) : null;

                            var multiplier_inc = 0;

                            // for each return value from address
                            _(__hex).forEach(function(n, _i) {

                                var _op      = gameAchievements.Achievements[key].multiples[_i].operator,
                                    _operand = gameAchievements.Achievements[key].multiples[_i].operand,
                                    _result  = operators[_op](__hex[_i], _operand);

                                if (_result) {
                                    multiplier_inc++;
                                }

                            }).value();

                                debug ? console.log("[i] Multiplier: " + multiplier_inc) : null;

                            if (multiplier_inc >= multiplier) {
                                achievementUnlocked(nsp, gameAchievements.Achievements[key]);
                                debug ? console.log("[!!] Multiplier Achievement Unlocked!!!") : null;

                                addresses.splice(i, 1);
                                delete gameAchievements.Achievements[key];
                            }

                        });

                    }

                    else if (result && multiplier == 0) {
                        achievementUnlocked(nsp, gameAchievements.Achievements[key]);
                        debug ? console.log("[!!] Single Achievement Unlocked!!!") : null;

                        addresses.splice(i, 1);
                        delete gameAchievements.Achievements[key];
                    }

            } // EOL
    });
};


/*  Achievement Unlocked Notification
-------------------------------------------------- */
function achievementUnlocked(nsp, achievement, callback) {
    nsp.emit('clientEvent', {command: "achievementUnlocked", params: JSON.stringify(achievement) });
}

/*  Exports
-------------------------------------------------- */
exports.achievementCheck    = achievementCheck;
exports.dumpRetroRamInit    = dumpRetroRamInit;
exports.achievementTimer    = achievementTimer;
exports.achievementUnlocked = achievementUnlocked;
