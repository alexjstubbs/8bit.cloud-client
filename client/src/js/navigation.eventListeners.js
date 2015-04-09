/*  Exposed Navigation Event Listener(s)
-------------------------------------------------- */
var navigationEvent = require('./navigation.event'),
    eventDispatcher = require('./events'),
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
    },

    /*  Listen for keyboard keys strictly for mapping configs
    -------------------------------------------------- */
    bindMappingNavigation: function() {
        window.addEventListener("keydown", navigationEventListeners.passMappingKeyEvent);
        window.addEventListener("gamepadEvent", navigationEventListeners.passMappingKeyEvent);
    },

    passMappingKeyEvent: function (e) {

        if (e.detail) {
            eventDispatcher.bindKeyMapping(e);
        }

        // else {
        //     console.log("keyboard pressed", e.which);
        // }

    },


};


/*  Exports
-------------------------------------------------- */
exports.navigationEventListeners = navigationEventListeners;
