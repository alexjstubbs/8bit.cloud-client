/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */

var gamepad 			= require("./gamepad.js")
,   navigationBindings  = require("./navigation.bindings.js")
,   navigationEvent 	= require("./navigation.event.js")
,   api 				= require("./api/connection.js")
,   browserNavigation	= require('../js/navigation.browser.js').browserNavigation
,   database 			= require('./database.helpers');

module.exports = function() {


    /*  Clear local Storage
    -------------------------------------------------- */
    sessionStorage.removeItem("navigationState");

	/* Client and Backend Connection init
	-------------------------------------------------- */
    api.connect();

    /* Bind local Navigation
    -------------------------------------------------- */
    navigationBindings();

    /* Bind Gamepad controls to Navigation
    -------------------------------------------------- */
    gamepad.gamepadSupport.init();
    document.onkeydown = navigationEvent;

    /* Get Games Database for ROM Browser
    -------------------------------------------------- */
    database.initLocalDatabase("games");

}
