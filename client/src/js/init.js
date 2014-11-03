/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */ 

var gamepad 			= require("./gamepad.js")
,   navigationBindings  = require("./navigation.bindings.js")
,   navigationEvent 	= require("./navigation.event.js")
,   api 				= require("./api/connection.js")
,   browserNavigation	= require('../js/navigation.browser.js').browserNavigation
,   database 			= require('./database.helpers');

module.exports = function() {

	/* Client and Backend Connection init
	-------------------------------------------------- */
    api.connect();

    /* Bind Navigation
    -------------------------------------------------- */
    navigationBindings();

    /* Bind Gamepad to Navigation
    -------------------------------------------------- */
    gamepad.gamepadSupport.init();
    document.onkeydown = navigationEvent;
    

    /* Get Games Database for ROM Browser
    -------------------------------------------------- */
    database.initLocalDatabase("games");

}