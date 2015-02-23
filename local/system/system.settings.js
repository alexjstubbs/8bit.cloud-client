/*  System Settings
-------------------------------------------------- */
var systemRead  = require(__base + 'system/system.read');

var settings = {

    // Init Settings
    init: function() {

            systemRead.readJSONFile(null, __appdirectory + '/config/config.json', function(err, results) {

                    if (!err) {

                        for (var variable in results) {
                            if (results.hasOwnProperty(variable)) {
                                settings.get[variable] = results[variable];
                            }
                        }

                        settings.send();

                    }

                    else {
                        console.log(err);
                    }

            });

    },

    get: {},

    send: function() {
        __api.emit('api', {settingsObject: settings.get});
    }

};


/*  Exports
-------------------------------------------------- */
exports.settings = settings;
