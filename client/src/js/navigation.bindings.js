/* Navigation Key Bindings
-------------------------------------------------- */

var mousetrap = require("./mousetrap.min.js"),
    navigate = require("./navigation.navigate.js");

module.exports = function() {

        Mousetrap.bind('right', function() {
            navigate("right");
        }); // Navigate Next
        Mousetrap.bind('left', function() {
            navigate("left");
        }); // Navigate Prev

        Mousetrap.bind('down', function(e) {
            navigate("down");
        }); // Navigate up

        Mousetrap.bind('up', function(e) {
            // if (e.preventDefault) {
            //     e.preventDefault();
            // }
            navigate("up");
        }); // Navigate down

        Mousetrap.bind('enter', function() {
            navigate("enter");
        }); // Run Action

};