/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */

var gamepad 			     = require("./gamepad"),
    navigationBindings       = require("./navigation.bindings"),
    navigationEvent 	     = require("./navigation.event"),
    api 				     = require("./api/connection"),
    browserNavigation	     = require('../js/navigation.browser').browserNavigation,
    database 			     = require('./database.helpers'),
    navigationEventBinds     = require('./navigation.eventListeners'),

    sysEvents                = require('./system.events').events;

module.exports = function() {


    /*  Clear local Storage
    -------------------------------------------------- */
    sessionStorage.removeItem("navigationState");

	/* Client and Backend Connection init
	-------------------------------------------------- */
    api.connect();

    /* Bind local Navigation
    -------------------------------------------------- */
    navigationBindings("init");

    /* Bind Gamepad controls to Navigation
    -------------------------------------------------- */
    gamepad.gamepadSupport.init();
    sysEvents.removeNavigationState();

    navigationEventBinds.navigationEventListeners.bindEventNavigation();

    // document.getElementsByTagName("html")[0].style.opacity = 1;
    // document.body.style.opacity = 1;

    setTimeout(function() {
        document.getElementsByTagName("html")[0].style.opacity = 1;
        document.body.style.opacity = 1;

        api.api.emit('request', { request: 'killall', param: "qmlscene" });
    }, 3500);

};
