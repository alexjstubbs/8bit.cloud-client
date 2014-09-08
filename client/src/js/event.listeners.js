/* API Event Listeners
-------------------------------------------------- */
var api = require('socket.io-client')('/api'),
    events = require('./events'),
    _ = require('lodash');


api.on('api', function(_event){
    if (_event.updateGame) {
        events.updateGame(_event.updateGame.games.game);
    }
});