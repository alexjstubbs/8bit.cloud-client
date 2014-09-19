/* List Roms by System
-------------------------------------------------- */

var eventSet = require('../../config/event.set.json');

function getSet(nsp, set) {

        nsp.emit('api', {eventSet: eventSet});

}

exports.getSet = getSet;
