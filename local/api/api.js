/* Socket Server Client API
-------------------------------------------------- */
var methods     = require(__base + 'api/api.methods.js'),
    settings    = require(__base + 'system/system.settings').settings;

/* Sockets.io
-------------------------------------------------- */
var api = function(nsp) {

    nsp.on('connection', function(nsp){

      console.log('[info] client connected to API');

      settings.init();

      nsp.on('request', function(request) {

        var method = request.request,
            param = request.param;

        methods.apiMethod[method](nsp, param);

        });

    });


    nsp.on('disconnection', function(nsp){
        console.log('[i] client disconnected from API');

    });

};

/* Exports
-------------------------------------------------- */
module.exports = api;
