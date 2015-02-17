/*  Exposed Navigation Event Listener(s)
-------------------------------------------------- */
var navigationEvent = require('./navigation.event'),
    systemEvents    = require('./system.events');


var navigationEventListeners = {

    /*  Key Bindings
    -------------------------------------------------- */
    bindEventNavigation: function() {

        window.addEventListener("keydown", navigationEventListeners.passKeyEvent);

    },

    passKeyEvent: function(e) {
        if (e) {
            navigationEvent(e);
        }
    },

    /*  Bind Play Session Navigation
    -------------------------------------------------- */
    bindPlaySessionNavigation: function() {

        window.addEventListener("keydown", navigationEventListeners.passSessionKeyEvent);

    },

    passSessionKeyEvent: function(e) {

        if (e.keyCode === 27) { //esc
            systemEvents.events.toggleUserSpaceSidebar();
        }

        e.stopPropagation();
            return;
        }

};


/*  Exports
-------------------------------------------------- */
exports.navigationEventListeners = navigationEventListeners;
