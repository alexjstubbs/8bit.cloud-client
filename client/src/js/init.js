/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */ 

 var  community = require("./community.js"),
      gamepad = require("./gamepad.js"),
      navigationBindings = require("./navigation.bindings.js"),
      navigationEvent = require("./navigation.event.js"),
      api = require("./api/connection.js"),
      browserNavigation = require('../js/navigation.browser.js').browserNavigation;

module.exports = function() {
    api.connect();
    community();
    navigationBindings();
    gamepad.gamepadSupport.init();
    document.onkeydown = navigationEvent;

         
}