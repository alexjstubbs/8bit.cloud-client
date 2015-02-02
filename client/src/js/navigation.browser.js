/* Misc. Helper Functions
-------------------------------------------------- */

var getFirstChild       = require('./helpers.js').getFirstChild,
    removeBrackets      = require('./helpers.js').removeBrackets,
    browserNavigation   = require('../js/navigation.browser.js').browserNavigation,
    database            = require('./database.helpers'),
    api                 = require('socket.io-client')('/api'),
    events              = require('./events'),
    _                   = require('lodash');

/*  Load Paging (Throttled);
-------------------------------------------------- */
var loadPaging = function(Obj) {

    api.emit('request', { request: 'gamesList', param: Obj });

    events.uiActionNotification('loading');
};

var loadPaging = _.debounce(loadPaging, 1000);


/*  Select first game in list if available
-------------------------------------------------- */
var browserNavigation = function(k) {

    var pLength = document.querySelectorAll(".platform.navable.selected").length;

    if (pLength === 0) {

        var pEl = document.querySelectorAll(".platform.navable")[0].classList.toggle("selected");

        if (pEl) {
            var td = document.getElementById('list');
            td = getFirstChild(td);
            td = getFirstChild(td);

            if (td) {
                browserNavigationEvents(td);
            }
        }
    }

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


    if (!g.nextSibling) {

        var Obj = {
            platform: document.querySelectorAll(".platform.selected")[0].getAttribute("data-title"),
            start: g.getAttribute("data-snav")
        };

        loadPaging(Obj);

    }

};

/* Exports
-------------------------------------------------- */

exports.browserNavigation       = browserNavigation;
exports.browserNavigationEvents = browserNavigationEvents;
