/* Navigation Key Bindings
-------------------------------------------------- */

var mousetrap   = require('./mousetrap.min')
,   navigate    = require('./navigation.navigate')
,   events      = require('./system.events').events;

module.exports = function(init) {


    if (init != "init") {
        Mousetrap.unbind("tab");
        Mousetrap.unbind("enter");
        Mousetrap.unbind("up");
        Mousetrap.unbind("down");
        Mousetrap.unbind("left");
        Mousetrap.unbind("right");
        Mousetrap.unbind("tab");
        Mousetrap.unbind("delete");
        Mousetrap.unbind(",");
        Mousetrap.unbind("a");
        Mousetrap.unbind("s");
    }

    else {
        // pause              = Pause Next/Prev navigation
        // pauseAll           = Pause All navigation
        // pauseRight         = Pause only Next but allow Prev
        // pauseLeft          = Pause only Left but allow Next
        // pauseDown          = Pause only Down
        // pauseUp            = Pause only Up
        // pauseEnter         = Pause only Enter/Action
        // pauseComma         = Pause only Back/Cancel

        var pauseNavigation = sessionStorage.getItem("navigationState");


        Mousetrap.bind('tab', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                navigate("right");
            }
        });

        Mousetrap.bind('right', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                navigate("right");
            }
        });

        Mousetrap.bind('left', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                navigate("left");
            }
        });

        Mousetrap.bind('down', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                navigate("down");
            }
        });

        Mousetrap.bind('up', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                navigate("up");
            }
        });

        Mousetrap.bind('enter', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            console.log("hit: "+pauseNavigation)
            if (pauseNavigation != "pauseEnter" && pauseNavigation != "pauseAll") {

                console.log(pauseNavigation);

                navigate("enter");
            }
        });

        Mousetrap.bind(',', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseComma" && pauseNavigation != "pauseAll") {
                navigate("cancel");
            }
        });

        Mousetrap.bind('delete', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

          if (e.preventDefault) {
                e.preventDefault();
            }
        });

        Mousetrap.bind('ctrl+k', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                e.preventDefault();
                events.showTerminal();
            }
        });

        Mousetrap.bind('s', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                e.preventDefault();
                events.nextScreen();
            }
        });

        Mousetrap.bind('a', function(e) {
            pauseNavigation = sessionStorage.getItem("navigationState");

            if (pauseNavigation != "pauseAll") {
                e.preventDefault();
                events.previousScreen();
            }
        });


        // if (e.preventDefault) {
        //     e.preventDefault();
        // }
    }


};
