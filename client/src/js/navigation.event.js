/**
 * @jsx React.DOM
 */

'use strict';

/* Section
-------------------------------------------------- */

var account = require("./account.js")
,   community = require("./community.js")
,   helpers = require("./helpers.js")
,   _ = require("lodash")
,   navigationInit = require("./navigation.init.js")
,   events = require("./events.js");


// TODO: Dynamically select screens

module.exports = function(e) {

    var k = e.keyCode
    var s = document.getElementById("main").getAttribute("data-screen");
    var screens = document.getElementById("screens").childNodes;

    // |-- Right Arrow (D-RIGHT)
    if (k == 221) {

        _(screens).forEach(function(el, i) { 

            var _el = helpers.getFirstChild(el);
            
            if (_el) { 
                 if (_.contains(_el.classList, 'parent')) {

                document.getElementsByClassName("Dashboard")[0].classList.add("hidden");
                document.getElementsByClassName("Dashboard")[0].children[0].classList.remove("parent");
                document.getElementsByClassName("Browser")[0].classList.remove("hidden");
                document.getElementsByClassName("Browser")[0].children[0].classList.add("parent");
                document.getElementsByClassName("browser_header")[0].classList.remove("hidden");
                      // events.screenTransition('Dashboard', true, false);
                      // events.screenTransition('Browser', false, true);

                      console.log(document.querySelectorAll(".parent"));



                      navigationInit.navigationInit();
                      
                      return;

                 }
            }

        });

     } 
    // |-- Left Arrow (D-LEFT)

    if (k == 219) {

    console.log("E");

    _(screens).forEach(function(el, i) { 

            var _el = helpers.getFirstChild(el);
            
            if (_el) { 
                 if (_.contains(_el.classList, 'parent')) {

                document.getElementsByClassName("Dashboard")[0].classList.remove("hidden");
                document.getElementsByClassName("Dashboard")[0].children[0].classList.add("parent");
                document.getElementsByClassName("Browser")[0].classList.add("hidden");
                document.getElementsByClassName("Browser")[0].children[0].classList.remove("parent");
                document.getElementsByClassName("browser_header")[0].classList.add("hidden");
                      // events.screenTransition('Dashboard', true, false);
                      // events.screenTransition('Browser', false, true);

                      console.log(document.querySelectorAll(".parent"));



                      navigationInit.navigationInit();
                      
                      return;

                 }
            }

        });

        
    } else {
        return
    }
};

/* Notes:
 * Make screen switching dynamic by src release 
 *
-------------------------------------------------- */