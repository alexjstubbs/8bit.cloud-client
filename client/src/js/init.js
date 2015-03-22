/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */

var gamepad 			     = require("./gamepad"),
    eventListeners 			 = require("./event.listeners"),
    navigationBindings       = require("./navigation.bindings"),
    navigationEvent 	     = require("./navigation.event"),
    api 				     = require("./api/connection"),
    browserNavigation	     = require('../js/navigation.browser').browserNavigation,
    database 			     = require('./database.helpers'),
    systemSettings           = require('./system.settings').settings,
    navigationEventBinds     = require('./navigation.eventListeners'),
    sysEvents                = require('./system.events').events,
    eventDispatcher          = require('./events'),
    _                        = require('lodash');

module.exports = function() {

    /* Client and Backend Connection init
    -------------------------------------------------- */
    api.connect();

    /*  Clear local Storage
    -------------------------------------------------- */
    sessionStorage.removeItem("navigationState");

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

    // Settings
    var ignitionSettings = localStorage.getItem("ignition_settings");

    if (ignitionSettings && ignitionSettings.length > 5) {

        ignitionSettings = JSON.parse(ignitionSettings);


        setTimeout(function() {
            eventDispatcher.switchScreen(ignitionSettings.interface.screen);
        }, 500);


        if (ignitionSettings.interface.zoom != "auto" &&  _.isNumber(parseInt(ignitionSettings.interface.zoom))) {

            document.body.style.WebkitTransform = 'scale('+ignitionSettings.interface.zoom+')';

        }

    }

    else {
        setTimeout(function() {
            eventDispatcher.switchScreen("Dashboard");
        }, 500);
    }

};
