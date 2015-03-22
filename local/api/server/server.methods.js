/* Ignition Server Messaging Methods
-------------------------------------------------- */
var server = require(__base + 'api/server/server.api');

var methods = {

    friend_online: function(object){
        __api.emit('clientEvent', {command: "friendNotification", params: JSON.stringify(object) });
    },

    friend_offline: function(object){
        console.log(object);
    },

    message_sent: function(object){
        __api.emit('clientEvent', {command: "confirmShow", params: object.result.message });
    },

    new_message: function(object, nsp){
        server.getMessages(nsp);
    },

    decline_invite: function(object, nsp) {
        console.log(object);
    }

};

/* Exports
-------------------------------------------------- */
exports.networkMethod = methods;
