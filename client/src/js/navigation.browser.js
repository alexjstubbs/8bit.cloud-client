/* Misc. Helper Functions
-------------------------------------------------- */

var getFirstChild       = require('./helpers.js').getFirstChild
,   removeBrackets      = require('./helpers.js').removeBrackets
,   browserNavigation   = require('../js/navigation.browser.js').browserNavigation
,   database            = require('./database.helpers')
,   api                 = require('socket.io-client')('/api')
,   events              = require('./events');

/* Module Definitions
-------------------------------------------------- */

var browserNavigation = function(k) {

 // Podium = {};
 //
 //    Podium.keydown = function(k) {
 //        var oEvent = document.createEvent('KeyboardEvent');
 //
 //        // Chromium Hack
 //        Object.defineProperty(oEvent, 'keyCode', {
 //            get: function() {
 //                return this.keyCodeVal;
 //            }
 //        });
 //        Object.defineProperty(oEvent, 'which', {
 //            get: function() {
 //                return this.keyCodeVal;
 //            }
 //        });
 //
 //        if (oEvent.initKeyboardEvent) {
 //            oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, k, k, "", "", false, "");
 //        } else {
 //            oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
 //        }
 //
 //        oEvent.keyCodeVal = k;
 //
 //        if (oEvent.keyCode !== k) {
 //            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
 //        }
 //
 //        document.dispatchEvent(oEvent);
 //
 //    }
 //
 //    Podium.keydown(40);
 //    Podium.keydown(40);

    var td = document.getElementById('list');
    td = getFirstChild(td);
    td = getFirstChild(td);
    td = getFirstChild(td);
    td.classList.add('browser_hovered');

    var b;
    [].forEach.call(
        document.querySelectorAll('[data-tdalpha]'),
        function(el) {
            var a = el.textContent;
            a = a.charAt(1);

            el = el.childNodes[0];

            if (!isNaN(a)) {
                a = "#";
            }

            if (b != a) {
                el.innerHTML = a;
            }

            b = a;

        });

};


/* Browser Navigation Events
-------------------------------------------------- */

var browserNavigationEvents = function(g) {
    //<tr data-reactid=".1.0.1.0.1.0.0.0.1" data-path="/Users/alexstubbs/roms/nes/Battle City.7z" data-title="Battle City" data-parameters="/Users/alexstubbs/roms/nes/Battle City.7z" data-function="largeProfile" data-snav="1" class="subNavable selectedNav">

    var shortname   = document.querySelectorAll(".platform.navable.selected")[0].getAttribute("data-parameters"),
        game        = removeBrackets(g.getAttribute("data-title")),
        game        = game.replace(/\.[^/.]+$/, ""),
        filepath    = g.getAttribute("data-path");

    database.filterByAttribute("games", {
        "query": {
            type: "makeExactFilter",
            filter: "title",
            query: game.trim()
        },
        "subquery": {
            type:"makeExactFilter",
            filter: "system",
            query: shortname.trim()
        },
    }, function(result) {

            events.updateGame(result, filepath);

        }
    );

    var alpha = game.charAt(0);
    var pagination = document.getElementById("browser_pagination");

    var actives = document.querySelectorAll(".active")[0];
    if (actives) { actives.classList.remove("active"); }

    if(/[^a-zA-Z0-9]/.test(alpha)) {
        document.querySelectorAll("[data-alpha="+alpha+"]")[0].classList.add("active");
    }


    // Pagiante
    var i = g.getAttribute("data-snav");

    if ((i % 19) == 0 || (i % 18) == 0) {

        var path = 'http://127.0.0.1:1210/roms/Nintendo/'+i;

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange=function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = xmlhttp.responseText;

                var JSONified = JSON.parse(data);


                var a = JSONified.gamesList,
                b = component.state.gamesList,
                c = b.concat(a);

                component.setState({gamesList: _.rest(c)});

            }
        }

        xmlhttp.open("GET",path,true);
        xmlhttp.send();

    }
};

/* Exports
-------------------------------------------------- */

exports.browserNavigation       = browserNavigation;
exports.browserNavigationEvents = browserNavigationEvents;
