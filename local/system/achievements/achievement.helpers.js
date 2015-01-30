/*  General Achievement Helper Functions
-------------------------------------------------- */
var fs       = require('fs-extra')
,   path     = require('path')
,   walk     = require('walk')
,   _        = require('lodash')
,   database = require(appDir+'/local/api/database/database.local')

/*  Load all/new Achievement Files into DB
-------------------------------------------------- */
var storeAchievementFiles = function(previousAchievements) {

    var mergeArray = [];

    var options = {
        followLinks: false,
        filters: [".git"]
    };

    var walker = walk.walk(appDir+'/databases/ignition-achievements', options);

    walker.on("file", fileHandler);
    walker.on("errors", errorsHandler);
    walker.on("end", endHandler);

    function fileHandler(root, fileStat, next) {
        fs.readFile(path.resolve(root, fileStat.name), function (err, buffer) {

            if (buffer) {
                if (path.extname(fileStat.name) == ".json") {
                    var Obj = JSON.parse(buffer.toString());
                    mergeArray.push(Obj);
                }
            }

            next();

        });
    }

    function errorsHandler(root, nodeStatsArray, next) {
        nodeStatsArray.forEach(function (n) {
            console.error("[ERROR] " + n.name)
            console.error(n.error.message || (n.error.code + ": " + n.error.path));
        });
        next();
    }

    function endHandler() {
        database.dropDatabase(null, "achievements", function(err, numRemoved) {
            if (!err) {
                database.storeAchievement(mergeArray, function(){});
                console.log("[info] Loaded All Achievements. Number removed: "+numRemoved);
            }
        });
    }

}

// TODO: Store all in the directory
// var testStore = require(appDir+'/databases/ignition-achievements/Official/NES/Super Mario Bros.json');
//
// database.storeAchievement(testStore, function(gameAchievements) {
//     gameAchievements = JSON.parse(JSON.stringify(gameAchievements))
//     gameAchievements = gameAchievements[0];
// });

/*  Expots
-------------------------------------------------- */
exports.storeAchievementFiles = storeAchievementFiles;
