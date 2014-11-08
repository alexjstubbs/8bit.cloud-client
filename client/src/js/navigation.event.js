 /*
 * @jsx React.DOM
 */

'use strict';

/* Section
-------------------------------------------------- */

var account         = require("./account.js")
,   helpers         = require("./helpers.js")
,   _               = require("lodash")
,   navigationInit  = require("./navigation.init.js")
,   events          = require("./events.js");


// TODO: Dynamically select screens

module.exports = function(e) {

  var k = e.keyCode
  ,   s = document.getElementById("main").getAttribute("data-screen")
  ,   screens = document.getElementById("screens").childNodes;

  console.log(screens);

  
  var currentScreen = document.getElementById("screen-active")
  ,   currentScreenId = _.indexOf(screens, currentScreen);
      
  // |-- Right Arrow (D-RIGHT)
  if (k == 221) {

      if (currentScreenId != screens.length-1) {

        screens[currentScreenId].classList.remove("parent");
        screens[currentScreenId].classList.add("hidden");

        currentScreenId++;
        currentScreen.id = null;

        screens[currentScreenId].id = "screen-active";
        screens[currentScreenId].classList.add("parent");
        screens[currentScreenId].classList.remove("hidden");


        navigationInit.navigationInit();
      
      }

   } 


  // |-- Left Arrow (D-LEFT)
  if (k == 219) {


      if (currentScreenId != 0) {

        screens[currentScreenId].classList.remove("parent");
        screens[currentScreenId].classList.add("hidden");

        currentScreenId--;
        currentScreen.id = null;

        screens[currentScreenId].id = "screen-active";
        screens[currentScreenId].classList.add("parent");
        screens[currentScreenId].classList.remove("hidden");


        navigationInit.navigationInit();

      }
      

  } else {
      return
  }
};