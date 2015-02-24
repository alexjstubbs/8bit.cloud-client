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

    get: {},

    refresh: function() {
        api.emit('request', { request: 'getSettings', param: null });
    },

    restore: function() {
        api.emit('request', {request: 'restoreSettings', param: null});
    }

};

/*  Exports
-------------------------------------------------- */
exports.settings = settings;
