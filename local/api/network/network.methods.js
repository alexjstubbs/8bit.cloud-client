/* Network Methods
-------------------------------------------------- */
_ = require('lodash');

var subFriends = _.once(function(socket, data) {

    var online = 0,
        present = false;

    _(data.friends).forEach(function(friend, i) {
        if (friend.Online) { online++ }
    });

    if (online > 0) { present = true }

        console.log(present)

     __api.emit('network-api', { onlineFriends: 12 } );

    // return online;

});

var userNotify = function(socket, data) {
    console.log("ONLINE:/OFFLINE: "+JSON.stringify(data));
}

/* Exports
-------------------------------------------------- */

exports.subFriends = subFriends;
exports.userNotify = userNotify;
