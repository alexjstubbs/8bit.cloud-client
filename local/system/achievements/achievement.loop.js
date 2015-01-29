/* Checks Achievements during gameplay
-------------------------------------------------- */
var fs          = require('fs-extra')
,   _           = require('lodash')
,   hex         = require(appDir+'/local/system/achievements/achievement.hex.helper')
,   exec        = require(appDir+'/local/system/system.exec')
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

/*  Get all Achievements of selected game.
/   Store any newly found achievements if they now exist.
------------------------------------------------- */
function dumpRetroRamInit(callback) {

    var testStore = require(appDir+'/databases/ignition-achievements/Official/NES/Super Mario Bros.json');

    database.storeAchievement(testStore, function(gameAchievements) {
        gameAchievements = JSON.parse(JSON.stringify(gameAchievements))
        gameAchievements = gameAchievements[0];

        // setTimeout(function() {
        //     achievementCheck(gameAchievements);
        // }, 1000);

        callback(gameAchievements);
    });

}

/*  Achievement Timer
-------------------------------------------------- */
function achievementTimer(nsp, type, interval) {

    var command;

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
    exec(command, function(stderr, stdout) {
        if (stderr) {
            nsp.emit('messaging', {type: 0, body: stderr });
            execute("killall watch", function(stderr, stdout) {});
        }
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
                                nsp.emit('clientEvent', {command: "achievementUnlocked", params: null });
                                debug ? console.log("[!!] Multiplier Achievement Unlocked!!!") : null;

                                addresses.splice(i, 1);
                                delete gameAchievements.Achievements[key];
                            }

                        });

                    }

                    else if (result && multiplier == 0) {
                        nsp.emit('clientEvent', {command: "achievementUnlocked", params: null });
                        debug ? console.log("[!!] Single Achievement Unlocked!!!") : null;

                        addresses.splice(i, 1);
                        delete gameAchievements.Achievements[key];
                    }

            } // EOL
    });
};

/*  Exports
-------------------------------------------------- */
exports.achievementCheck = achievementCheck;
exports.dumpRetroRamInit = dumpRetroRamInit;
exports.achievementTimer = achievementTimer;
