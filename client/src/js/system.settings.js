/*  System Settings Sync (clientside)
-------------------------------------------------- */
var api  = require('socket.io-client')('/api');

/*  Bind settings on /API socket
-------------------------------------------------- */
api.on('api', function(data) {

    if (data.settingsObject) {
        settings.get = data.settingsObject;
    }

});

/*  Get set defined settings
-------------------------------------------------- */
var settings = {    
    get: {}
};


/*  Exports
-------------------------------------------------- */
exports.settings = settings;
