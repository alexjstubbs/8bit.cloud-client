/* API Event Listeners
-------------------------------------------------- */
var api                 = require('socket.io-client')('/api'),
    events              = require('./events'),
    _                   = require('lodash'),
    dialog              = require('./dialogs'),
    Dialog              = require('./dialogs').Dialog,
    screenEvents        = require('./navigation.event'),
    uiNotification      = require('./ui.notification');

/* TODO: Fix up to contain all detail
-------------------------------------------------- */
api.on('api', function(_event){
    if (_event.updateGame) {
        events.updateGame(_event.updateGame.games.game);
    }

    // Store
    localStorage.setItem(Object.keys(_event)[0], JSON.stringify(_event));

});

/* Dialog (react bug workaround)
-------------------------------------------------- */
window.addEventListener("dialog", function(e) {

  switch (e.detail.action) {

  	case "close":
        var dialog = new Dialog();
        dialog.close();
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

    case "loading":
        uiNotification.loading();
        return;
  }

}, false);

/* Update components on Dashboard
-------------------------------------------------- */

window.addEventListener("renderScreenComponents", function(e) {

  switch (e.detail.screen) {

    case "Dashboard":
        api.emit('request', { request: 'messages'});
        localStorage.setItem("navigationState", "");
        return;
  }

}, false);


/*  Switch Screen
-------------------------------------------------- */
window.addEventListener("switchScreen", function(e) {

    switch (e.detail.screen) {

     case "Settings":
          screenEvents({keyCode: 219});
          break;

     case "Dashboard":
          screenEvents({keyCode: 221});
          break;

     case "Browser":
            screenEvents({keyCode: 221});
            screenEvents({keyCode: 221});
    }

}, false);
