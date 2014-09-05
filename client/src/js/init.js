/* Init Modules - Entry point to clientside controllers
 -------------------------------------------------- */ 

 var  community = require("./community.js"),
      gamepad = require("./gamepad.js"),
      navigationBindings = require("./navigation.bindings.js"),
      navigationEvent = require("./navigation.event.js"),
      api = require("./api/connection.js"),
      browserNavigation = require('../js/navigation.browser.js').browserNavigation,
      nsp = require('socket.io-client')('/api'),
      _PourOver = require('../components/pourover');

module.exports = function() {
    api.connect();
    community();
    navigationBindings();
    gamepad.gamepadSupport.init();
    document.onkeydown = navigationEvent;
    

    // Break this into module for specific filters that can be called in other modules
    
    nsp.emit('request', { request: 'storeGet', param: "games" });   
    nsp.on('api', function(data){   
        if (data.database) {
          var collection = new PourOver.Collection(data.database);
        }
    });

         
}