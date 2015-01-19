/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */

var gamepad 			     = require("./gamepad")
,   navigationBindings       = require("./navigation.bindings")
,   navigationEvent 	     = require("./navigation.event")
,   api 				     = require("./api/connection")
,   browserNavigation	     = require('../js/navigation.browser').browserNavigation
,   database 			     = require('./database.helpers')
,   sysEvents                = require('./system.events').events;

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

    document.addEventListener('keydown', function (e) {

        navigationEvent(e);

    });

    // document.onkeydown = navigationEvent;

    /* Get Games Database for ROM Browser
    -------------------------------------------------- */
    database.initLocalDatabase("games");

    // setTimeout(function() {
    //     document.body.classList.add("load-ui");
    // }, 10000);

}
