 /*
 * @jsx React.DOM
 */

'use strict';

/* Section
-------------------------------------------------- */

var _               = require("lodash")
,   account         = require("./account.js")
,   helpers         = require("./helpers.js")
,   navigationInit  = require("./navigation.init.js")
,   events          = require("./events.js");

/* Main Export
-------------------------------------------------- */
module.exports = function(e) {

  var k                 = e.keyCode
  ,   s                 = document.getElementById("main").getAttribute("data-screen")
  ,   screens           = document.getElementById("screens").childNodes
  ,   currentScreen     = document.getElementById("screen-active")
  ,   currentScreenId   = _.indexOf(screens, currentScreen);

  /* Right Arrow ( ] )
  -------------------------------------------------- */

  if (k == 221) {

      if (currentScreenId != screens.length-1) {

        screens[currentScreenId].classList.remove("parent");
        screens[currentScreenId].classList.add("hidden");

        currentScreenId++;
        currentScreen.id = null;

        screens[currentScreenId].id = "screen-active";
        screens[currentScreenId].classList.add("parent");
        screens[currentScreenId].classList.remove("hidden");

        _(screens).forEach(function(_screen, i) {
          if (_.contains(_screen.classList, "hidden")) {
            
          }
          else {
            navigationInit.navigationInit(_screen);
            var event = new CustomEvent("view", {"detail":{"screen":_screen.classList[0]}});
            window.dispatchEvent(event);
          }
        })

      }

   } 


  /* Left Arrow ( [ )
  -------------------------------------------------- */

  if (k == 219) {


      if (currentScreenId != 0) {

        // screens[currentScreenId].classList.remove("parent");
        screens[currentScreenId].classList.add("hidden");

        currentScreenId--;
        currentScreen.id = null;

        screens[currentScreenId].id = "screen-active";
        // screens[currentScreenId].classList.add("parent");
        screens[currentScreenId].classList.remove("hidden");

        var event = new CustomEvent("view", {"detail":{"screen":screens[currentScreenId].classList[0]}});
        window.dispatchEvent(event);

        navigationInit.navigationInit();

      }
      

  } 

  else {
      return
  }

};