/* Navigation Key Bindings
-------------------------------------------------- */

var mousetrap   = require('./mousetrap.min')
,   navigate    = require('./navigation.navigate')
,   events      = require('./system.events').events;

module.exports = function() {

    // pause              = Pause Next/Prev navigation
    // pauseRight         = Pause only Next but allow Prev
    // pauseLeft          = Pause only Left but allow Next
    // pauseDown          = Pause only Down
    // pauseUp            = Pause only Up
    // pauseEnter         = Pause only Enter/Action
    // pauseComma         = Pause only Back/Cancel

    var pauseNavigation = sessionStorage.getItem("navigationState");

    Mousetrap.bind('tab', function(e) {
        navigate("right");
    });

    Mousetrap.bind('right', function(e) {
        navigate("right");
    });

    Mousetrap.bind('left', function(e) {
        navigate("left");
    });

    Mousetrap.bind('down', function(e) {
        navigate("down");
    });

    Mousetrap.bind('up', function(e) {
        navigate("up");
    });

    Mousetrap.bind('enter', function(e) {
        if (pauseNavigation != "pauseEnter") {
            navigate("enter");
        }
    });

    Mousetrap.bind(',', function(e) {
        if (pauseNavigation != "pauseComma") {
            navigate("cancel");
        }
    });

    Mousetrap.bind('delete', function(e) {
      if (e.preventDefault) {
            e.preventDefault();
        }
    });

    Mousetrap.bind('ctrl+k', function(e) {
        e.preventDefault();
        events.showTerminal();
    });

    Mousetrap.bind('s', function(e) {
        e.preventDefault();
        events.nextScreen();
    });

    Mousetrap.bind('a', function(e) {
        e.preventDefault();
        events.previousScreen();
    });


    // if (e.preventDefault) {
    //     e.preventDefault();
    // }


};
