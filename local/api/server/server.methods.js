/* Ignition Server Messaging Methods
-------------------------------------------------- */

var methods = {

    friend_online: function(object){
        console.log("A FRIEND ONLINE!");
        console.log(object);
    },

    friend_offline: function(object){
        console.log("A FRIEND offline!");
        console.log(object);
    },


}

/* Exports
-------------------------------------------------- */
exports.networkMethod = methods;
