/* Network Methods
-------------------------------------------------- */
_ = require('lodash');

var subFriends = _.once(function(socket, data) {
    // console.log(data.friends);

     __api.emit('network-api', data);

});

/* Exports
-------------------------------------------------- */

exports.subFriends = subFriends;