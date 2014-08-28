/**
 * Ignition Client (delilah).
 * License: Q Public License 1.0 (QPL-1.0)
 * Copyright (c) Alexander Stubbs. All Rights Reserved.
 * BETA v0.91
 */

/* Enviorment
-------------------------------------------------- */

if (process.platform == 'darwin') {
    process.env.NODE_ENV = 'osx';
}

else {
    process.env.NODE_ENV = 'pi';
}

global.config = require('konfig')();

var path = require('path');
global.appDir = path.dirname(require.main.filename);

/* Module dependencies
-------------------------------------------------- */
var common = require('./local/common');

var express = require('express')
,   app = express()
,   http = require('http').createServer(app)
,   io = require('socket.io').listen(http)
,   nsp = io.of('/api')
,   fs = require('fs')
,   api = require('./local/api/api');

api(nsp);

common.render.ignite

//  Server Configuration
app.configure(function() {

    // app.set('port', process.env.PORT || 1210);
    // app.set( "ipaddr", "127.0.0.1" );
    // app.set( "port", 1210 );

    app.set('views', './local/render/');

    app.engine('mustache', common.mu2express.engine);
    app.set('view engine', 'mustache');

    app.use(common.express.logger('dev'));
    app.use(common.express.bodyParser());
    app.use(common.express.methodOverride());

    app.use(app.router);
    app.use(common.express.static(__dirname + '/client'));
 
});

app.configure('development', function() {
    app.use(common.express.errorHandler());
});

/* Client Routes
-------------------------------------------------- */
// Dashboard
app.get('/home', common.render.ignite);
app.get('/home/:username', common.render.ignite);

app.get('/games/:platform/:name', common.db.gameImage);

// Actions
// app.get('/systemNotification/:title/:message', common.systemNotification.systemNotification);
app.post('/clientNotification/:width/:icon/:text', common.clientNotification.clientNotification);
app.post('/game/launch', common.game.gameLaunch);
app.post('/game/profile/small/:game', common.game.gameProfileSmall);
app.get('/game/profile/large/:game', common.game.gameProfileLarge);
app.post('/sounds/:event', common.sounds.play);

app.get('/hex/:offset/:bufflength/:address', common.hex.readHex);
app.get('/achievement', common.achievements.achievementCheck);
app.post('/hash', common.hash.getCRC32);

app.post('/list', common.listroms.listRoms);


/* Server Initialization
-------------------------------------------------- */
// app.listen(app.get('port'), "localhost");
http.listen(1210, "127.0.0.1");

console.log("Ignition Client listening on port 1210");

common.databases.initDatabases();
// fs.openSync('/mnt/ramdisk/working.ram', 'w');