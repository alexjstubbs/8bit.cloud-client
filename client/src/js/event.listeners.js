/* API Event Listeners
-------------------------------------------------- */
var api             = require('socket.io-client')('/api')
,   events          = require('./events')
,   _               = require('lodash')
, 	dialog          = require('./dialogs')
,   uiNotification  = require('./ui.notification');

/* Possibly Unused. Run unit tests
-------------------------------------------------- */
api.on('api', function(_event){
    if (_event.updateGame) {
        events.updateGame(_event.updateGame.games.game);
    }
});

/* Dialog (react bug workaround)
-------------------------------------------------- */
window.addEventListener("dialog", function(e) {
	
  switch (e.detail.action) {
  	
  	case "close":
  	  	dialog.close(e.detail.input);
  	  	return;
  
  }

}, false);

/* Blocked UI Action
-------------------------------------------------- */

window.addEventListener("uiActionNotification", function(e) {

  switch (e.detail.action) {
    
    case "blocked":
        uiNotification.blocked();
        return;
  }

}, false);