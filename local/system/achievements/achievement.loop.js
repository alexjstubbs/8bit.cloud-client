/* Checks Achievements during gameplay
-------------------------------------------------- */
var fs = require('fs')
,   hex = require(appDir+'/local/common').hex
,   execute = require(appDir+'/local/common').exec
,   database = require(appDir+'/local/common').databases;

var doubleCheck = false,
    stateSize = '',
    recentStateSize = '';

// Set these as modules somewhere else for cleanliness
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
    }
};

// SMB as test

file = '/mnt/ramdisk/working.ram'; // rPi

// file = '/Users/alexstubbs/Desktop/working.ram'; // Mac Dev Env

function dumpRetroRamInit() {

    // fs.writeFile(file, '', function() {});

    // command = 'sh /Users/alexstubbs/Projects/Samson/dev/delilah/helpers/command.sh'; // Mac Dev Env
    command = 'bash /home/pi/ignition/helpers/command.sh'; // rPi
    execute(command, function(stdout) {
        console.log(stdout);
    });


    var testStore = require('../achievements/smb.json');

    database.storeAchievement(testStore, function(gameAchievements) {
        gameAchievements = JSON.parse(JSON.stringify(gameAchievements))
        gameAchievements = gameAchievements[0];

        setTimeout(function() {
            achievementCheck(gameAchievements);
        }, 1000);
    });


}


/* Load JSON of games acheivements
/  Add Address' into array, pass array to checkhex
-------------------------------------------------- */
function achievementCheck(gameAchievements, callback) {

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
                        // command = 'echo "ACHIEVEMENT_UNLOCKED" | nc -u localhost 55355 | pkill nc';
                        command = '/home/pi/fbtest_/openvg/client/test2/openvg/client/hellovg';
                        console.log("achievements unlocked");
                        // Remove Achievement
                        addresses.splice(i, 1);
                        delete gameAchievements.Achievements[key];

                        execute(command, function(stdout) {
                            // console.log("Achievement Unlocked!!");
                        });

                        var refreshIntervalId = setInterval(function() {
                            execute("pkill hellovg", function(stdout) {
                                // console.log("Achievement Unlocked!!");
                            });
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

exports.achievementCheck = achievementCheck;
exports.dumpRetroRamInit = dumpRetroRamInit;