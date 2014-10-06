/* Network Methods
-------------------------------------------------- */
_ = require('lodash');

var subFriends = _.once(function(socket, data) {
    
    _(data.friends).forEach(function(friend) { 
        // console.log(friend); 
    });

});

/* Exports
-------------------------------------------------- */

exports.subFriends = subFriends;