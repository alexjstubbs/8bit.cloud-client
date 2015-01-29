/* Checks Achievements during gameplay
-------------------------------------------------- */
var fs          = require('fs-extra')
,   _           = require('lodash')
,   hex         = require(appDir+'/local/system/achievements/achievement.hex.helper')
,   execute     = require(appDir+'/local/common').exec
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


/* Load JSON of games acheivements
/  Add Address' into array, pass array to checkhex
-------------------------------------------------- */
function achievementCheck(gameAchievements, stdin, callback) {

// TODO: Break these into simple functions.
// TODO: Serious error handling and type checking here.

    var address     = '',
        addresses   = [];

    var offset      = 0x54;
    var bufferSize  = 4390;

    // Create Array of Addresses
    for (var key in gameAchievements.Achievements) {
        address = gameAchievements.Achievements[key].address;
        addresses.push(address);
    }

        hex.checkHex(stdin, offset, bufferSize, addresses, function(_hex) {

            console.log("CURRENT VALUES:" + _hex);

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

                        // console.log("Multi for: " + operand + " : " +multiplier);

                    // (initial) Achievement Unlocked.
                    if (result && multiplier >= 1) {

                        console.log("Master Unlocked : " + multiplier);

                        flat = _.flatten(gameAchievements.Achievements[key].multiples);

                        subaddresses = _.pluck(flat, 'address');

                        // loop thru these: gameAchievements.Achievements[key].multiples

                        hex.checkHex(stdin, offset, bufferSize, subaddresses, function(__hex) {

                            console.log("SUB VALUES: "+__hex);
                            var multiplier_inc = 0;

                            // for each return value from address
                            _(__hex).forEach(function(n, _i) {

                                var _op      = gameAchievements.Achievements[key].multiples[_i].operator,
                                    _operand = gameAchievements.Achievements[key].multiples[_i].operand,
                                    _result  = operators[_op](__hex[_i], _operand);

                                if (_result) {
                                    multiplier_inc++;
                                }

                                console.log("i for sub: " + _i);

                            }).value();

                                console.log("multipliyer INC: " + multiplier_inc);

                            if (multiplier_inc >= multiplier) {
                                console.log("!!!Achievement Unlocked!!!")
                                addresses.splice(i, 1);
                                delete gameAchievements.Achievements[key];
                            }

                        });

                    }

                    else if (result && multiplier == 0) {
                        console.log("!!!Achievement Unlocked!!!")
                        addresses.splice(i, 1);
                        delete gameAchievements.Achievements[key];
                    }

            } // EOL
    });
};


/* RAMDISK Version
-------------------------------------------------- */
function achievementCheckBYRAMDISK(gameAchievements, callback) {


    var address = '',
    addresses = [];

    var offset = 0x54;
    var bufferSize = 4390;

    // Create Array of Addresses
    for (var key in gameAchievements.Achievements) {
        address = gameAchievements.Achievements[key].address;
        addresses.push(address);
    }

    // hex.checkHex(file, offset, bufferSize, addresses, function(hex) {
    //   console.log(hex);
    // });

    fs.unwatchFile(file);
    fs.watchFile(file, function(curr, prev) {

        fs.stat(file, function(err, stats) {
            stateSize = stats.size
        });


        hex.checkHex(file, offset, bufferSize, addresses, function(hex) {


            // NES Save: 13312 (13kb) console.log(stateSize);

            // Make sure the file is both unempty, and consistant in size from last read
            if (stateSize != 0 && stateSize == recentStateSize) {

                // Achievement Specific Checks
                var i = -1;

                for (var key in gameAchievements.Achievements) {

                    i++;

                    var op = gameAchievements.Achievements[key].operator,
                    operand = gameAchievements.Achievements[key].operand,
                    result = operators[op](hex[i], operand);

                    // Achievement Unlocked!
                    if (result) {
                        // command = 'echo "ACHIEVEMENT_UNLOCKED" | nc -u 127.0.0.1 55355 | pkill nc';
                        // command = '/home/pi/fbtest_/openvg/client/test2/openvg/client/hellovg';
                        console.log("achievements unlocked");
                        // Remove Achievement
                        addresses.splice(i, 1);
                        delete gameAchievements.Achievements[key];

                        // execute(command, function(stdout) {
                        //     // console.log("Achievement Unlocked!!");
                        // });

                        var refreshIntervalId = setInterval(function() {
                            // execute("pkill hellovg", function(stdout) {
                            //     // console.log("Achievement Unlocked!!");
                            // });
                            clearInterval(refreshIntervalId);
                        }, 4000);

                    }

                    // Make Sure Value is Consistant between reads
                    // if (result && doubleCheck == false) {
                    //   doubleCheck = true;
                    // }

                }

            }

            // Set State Size for next Read
            recentStateSize = stateSize;

        });

    })
};

/*  Exports
-------------------------------------------------- */
exports.achievementCheck = achievementCheck;
exports.dumpRetroRamInit = dumpRetroRamInit;
