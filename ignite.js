/**
* Ignition Client.
* License: Apache License 2.0 (Apache-2.0)
* Copyright (c) Alexander Stubbs. All Rights Reserved.
*/

/* Working Enviorment
-------------------------------------------------- */
var iEnviorment = "Alpha";

if (iEnviorment === "production") {
    global.__base = __dirname + '/production/';
}

else {
    global.__base = __dirname + '/local/';
}

/*  Platform Enviorment
-------------------------------------------------- */
if (process.platform == 'darwin') {
    process.env.NODE_ENV    = 'osx';
}

else {
    process.env.NODE_ENV    = 'pi';

}

var path                    = require('path');


global.config               = require('konfig')();
global.__appdirectory       = path.dirname(require.main.filename);


// Global Error Handler
process.on('uncaughtException', function (err) {
  console.log(err.stack);
});

/* Module dependencies
-------------------------------------------------- */
var common                  = require(__base + 'common'),
    methodOverride          = require('method-override'),
    compress                = require('compression'),
    app                     = common.express(),
    fs                      = require('fs-extra'),
    http                    = require('http').createServer(app);

global.__io                 = require('socket.io').listen(http);
global.__api                = __io.of('/api');
global.__sessionFile        = __appdirectory+"/config/profiles/Session.json";


/* Server Configurtation
-------------------------------------------------- */

app.set('views', './local/render/');

app.engine('mustache', common.mu2express.engine);
app.set('view engine', 'mustache');

app.use(compress());
app.use(methodOverride());

app.use(app.router);
app.use(common.express.compress());
app.use(common.express.static(__dirname + '/client'));
app.use(common.express.errorHandler());


/* Client Routes
-------------------------------------------------- */
// Sign Up (initial)
app.get('/welcome', common.render.ignite);
app.get('/agreement', common.render.ignite);
app.get('/WifiConfig', common.render.WifiConfig);

// Profiles
app.get('/profiles', common.render.ignite);

// Dashboard
app.get('/home', common.render.ignite);
app.get('/home/:username', common.render.ignite);

// Audio
app.get('/audio/:file', common.render.audio);

app.get('/database/:database', common.databases.getGamesAjax);
app.get('/roms/:platform/:start', common.listroms.listRoms);
app.get('/games/:platform/:name', common.db.gameImage);

// Test endpoints for development
// app.get('/hex/:offset/:bufflength/:address', common.hex.readHex);
// app.get('/achievement', common.achievements.achievementCheck);
// app.post('/hash', common.hash.getCRC32);
//

/* Server Initialization
-------------------------------------------------- */
var firstrun = true,
    _location;

http.listen(1210, "127.0.0.1", function(err, result) {

    console.log("[info]: Ignition Client Launched.");

    var api = require(__base + 'api/api');

    common.databases.initDatabases();

    api(__api);

    // !OSX Env.
    if (process.platform != 'darwin') {

        var exec = require('child_process').exec;

        exec('killall qmlscene', function(stderr, stdout) {

            fs.readdir('config/profiles', function(err, files) {

                if (!err) {
                    if (files.length !== 1)  {
                        firstrun = false;
                    }
                }

                else {
                    firstrun = true;
                }


                    if (firstrun) {
                        _location = 'http://127.0.0.1:1210/welcome';
                    }

                    else {
                        _location = 'http://127.0.0.1:1210/home';
                    }

                    var child = exec('setsid qtbrowser --webkit=1 --missing-image=no --inspector=9945 --validate-ca=off --transparent --url='+_location + "| /usr/bin/qmlscene /boot/loading/loading-ui.qml");

                    child.stdout.on('data', function(data) {
                        console.log('(stdout) | ' + data);
                    });

                    child.stderr.on('data', function(data) {
                        console.log('(stderr) | ' + data);
                    });

                    child.on('close', function(code) {
                        // TODO: If crash, restart with dialog and dump.
                        console.log('(exitcode): ' + code);
                    });

            });

            // Terminal Fork
            var child = require('child_process').fork('ignition_modules/tty/terminal.js');
            child.on('message', function(response) {
              if (response.cmd) {
                  __api.emit('clientEvent', {command: "closeDialog", params: null });
              }
          });
        });


    }

    else {
        var child = require('child_process').fork('ignition_modules/tty/terminal.js');
        child.on('message', function(response) {
          if (response.cmd) {
              __api.emit('clientEvent', {command: "closeDialog", params: null });
          }
        });
    }

});
