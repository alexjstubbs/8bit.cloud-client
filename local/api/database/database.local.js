/* Local System Database
-------------------------------------------------- */
var Datastore = require('nedb');

/* Init Databases (called on profile creation?)
-------------------------------------------------- */
function initDatabases(callback) {
    db = {};

    db.games = new Datastore({
        filename: './databases/games.db',
        autoload: true
    });

    db.achievements = new Datastore({
        filename: './databases/achievements.db',
        autoload: true
    });

    db.activities = new Datastore({
        filename: './databases/activities.db',
        autoload: true
    });    

    db.network = new Datastore({
        filename: './databases/network.db',
        autoload: true
    });

    // TODO: Store all in the directory
    var testStore = require('../../../databases/ignition-achievements/Official/smb.json');

    database.storeAchievement(testStore, function(gameAchievements) {
        gameAchievements = JSON.parse(JSON.stringify(gameAchievements))
        gameAchievements = gameAchievements[0];
    });
}

/* Get Databases 
-------------------------------------------------- */
function storeGet(nsp, database) {
     
    db[database].find({}, function (err, docs) {
        nsp.emit('api', {database: docs});
    });

}

/* Store General data
-------------------------------------------------- */
function storeData(database, doc, callback) {

    db[database].insert(doc, function(err, doc){

        if (err) {
            console.log("[!] Error storing data: "+err)
            callback(err, null);
        }

        else {
            callback(null, doc);
        }

    });
}



/* Store activity for /Network relay
-------------------------------------------------- */
function storeActivity(nsp, activity) {

    db.activities.insert(doc, function(err, doc){

        if (err) {
            console.log("[!] Error storing activity: "+err)
        }

        else {
            nsp.emit('network', {activity: doc});
        }

    });
}


/* Store Achievement Document
-------------------------------------------------- */
function storeAchievement(document, callback) {
    
    // Does it Exist?
    db.achievements.find({
        CRC32: {
            $in: document.CRC32
        }
    }, function(err, doc) {
        if (doc[0]) {
            // It Exists Already. Update Sub
            callback(doc);
        } else {
            console.log("[i] creating...");
            // Game Doesnt Have any DB Achievement Entries
            db.achievements.insert(document, function(err, doc) {
                if (err) {
                    console.log("[!] error storing achievement: " + err)
                    callback();
                } else {
                    callback(doc);
                }
            });
        }
    });
}

/* Find Achievement Documents
-------------------------------------------------- */
function findAchievements(criteria, callback) {

    console.log("[i] Searching For: " + JSON.stringify(criteria));

    db.achievements.find(criteria, function(err, docs) {
        console.log(err)
        if (docs[0]) {
            callback(docs)
        } else {
            callback(null);
        }
    });
}


/* Store Game Document
-------------------------------------------------- */
function storeGame(document, callback) {
    db.games.insert(document, function(err, doc) {
        if (err) {
            console.log("[!] error storing game: " + err)
            callback();
        } else {
            callback(doc);
        }
    });
}


/* Find game Document
-------------------------------------------------- */
function findGame(document, callback) {

    db.games.find(document, function(err, docs) {

        if (docs) {
            console.log("[!] found game")
            callback(docs)
        } else {
            console.log("[!] Couldn't Find Game.")
            callback("null");
        }
    });

}

exports.storeGame = storeGame;
exports.findGame = findGame;
exports.storeAchievement = storeAchievement;
exports.findAchievements = findAchievements;
exports.initDatabases = initDatabases;
exports.storeGet = storeGet;
exports.storeData = storeData;