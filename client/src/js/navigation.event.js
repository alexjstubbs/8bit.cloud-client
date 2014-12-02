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
  ,   currentScreenId   = _.indexOf(screens, currentScreen)
  ,   pauseNavigation   = sessionStorage.getItem("navigationState");

  /* Set Up Screen
  -------------------------------------------------- */
  function setScreen() {

        var parents = document.querySelectorAll(".parent");
        var otherParents = _.without(parents, screens[currentScreenId].querySelectorAll(".parent")[0]);
        var otherScreens = _.without(screens, screens[currentScreenId]);

        // Remove other Parent Classes Globally
        _(otherParents).forEach(function(parent, i) {
          parent.classList.remove("parent");
          parent.classList.add("_parent");
        });

        // Toggle Renamed Parent Class
        var oldScreen = screens[currentScreenId].querySelectorAll("._parent")[0];
        
        if (oldScreen) {
          oldScreen.classList.add("parent");
          oldScreen.classList.remove("_parent");
        }

        // Hide Other Screens
        _(otherScreens).forEach(function(screen, i) {
          screen.classList.add("hidden");
        });

        // Set up New Screen and Show
        screens[currentScreenId].id = "screen-active";
        screens[currentScreenId].classList.remove("hidden");

        // Set up Navigation 
        _(screens).forEach(function(_screen, i) {
          if (_.contains(_screen.classList, "hidden")) {
          
          }
          else {
            navigationInit.navigationInit(_screen);
            var event = new CustomEvent("mountView", {"detail":{"screen":_screen.classList[0]}});
            window.dispatchEvent(event);
          }
        })

      }



  /* Right Arrow ( ] )
  -------------------------------------------------- */

  if (k == 221) {

    if (pauseNavigation != "pauseRight" && pauseNavigation != "pause") {

          if (currentScreenId != screens.length-1) {

            currentScreenId++;
            currentScreen.id = null;

            setScreen();
         } 
      }

      else {
        events.uiActionNotification('blocked');
      }

   }


  /* Left Arrow ( [ )
  -------------------------------------------------- */

  if (k == 219) {

      if (pauseNavigation != "pauseLeft" && pauseNavigation != "pause") {

          if (currentScreenId != 0) {

            currentScreenId--;
            currentScreen.id = null;

            setScreen();

          }
      }

      else {
        events.uiActionNotification('blocked');
      }
  } 

  else {
      return
  }



};