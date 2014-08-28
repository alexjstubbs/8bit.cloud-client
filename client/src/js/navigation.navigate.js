/* Navigation Functions
-------------------------------------------------- */

var systemEvents = require('./system.events.js'),
    navigationHelpers = require('./navigation.helpers.js'),
    navigationBrowse = require('./navigation.browser.js').browserNavigationEvents;

module.exports = function(k) {

        var s = document.getElementsByClassName("selectedNav")[0];
        var i = document.getElementsByClassName("selectedNav")[0].getAttribute("data-nav");

        console.log(s);
        console.log(i);

        s.classList.remove('selectedActive');

        var q = document.querySelectorAll(".parent .navable");
        var us = document.querySelectorAll(".unselected");

        console.log(q);

        var screen = document.getElementById("main").getAttribute("data-screen");

        console.log(screen);

        function currentSelection() {
            var currentSelection = document.querySelectorAll(".selectedNav");

            if (screen == 'browser') {
                
                // Module pointer to navigation.browser refactor:
                navigationBrowse(currentSelection[0]);
              
            }
        }

        // Left & Right
        if (k == 'right' || k == 'left') {

            if (us[0]) {
                us[0].classList.toggle("unselected");
            }

            navigationHelpers();

            q = q.length - 1;

            // right
            if (k == 'right') {

                if (!i) {
                    i = s.parentNode.parentNode.getAttribute("data-nav");
                }
                if (i < q) {
                    console.log(i+":"+q)
                    i++;
                }
            }

            // left
            if (k == 'left') {
                if (!i) {
                    i = s.parentNode.parentNode.getAttribute("data-nav");
                    i - 1;
                }
                if (i - 1 != -1) {
                    i--;
                }
            }


            s.classList.remove("selectedNav");

            var lastNodeNav = document.querySelectorAll(".parent .navable")[i];


            // Outside Panel
            if (lastNodeNav) {
               document.querySelectorAll(".parent .navable")[i].classList.add("selectedNav");
            }

            // Inside Panel
            else {
                if (screen != 'browser') {
                    s.parentNode.parentNode.classList.add("selectedNav");
                } else {
                    document.querySelectorAll(".parent .navable")[1].classList.add("selectedNav");
                }
            }

        }

        // Up & Down
        if (k == 'up' || k == 'down') {

            var sel = document.querySelectorAll(".selectedNav");
            var sub = sel[0].querySelectorAll(".subNavable");

            // Down
            if (k == 'down') {

                // Inside Sub Navigation
                if (sel[0].classList.contains("subNavable")) {

                    var i = sel[0].getAttribute("data-snav");

                    i--;

                    var q = col.length;
                    q = q - 1;

                    if (i < q) {
                        i++;
                    }


                    sel[0].classList.remove("selectedNav");
                    sel[0].parentNode.parentNode.querySelectorAll(".subNavable")[i].classList.add("selectedNav");

                    currentSelection();

                } else {
                    if (screen == 'browser') {
                        if (!sub[0]) {
                            // If on System Selection, but not on game selection, down goes to game selection.
                            sel[0].classList.remove("selectedNav");

                            q[2].classList.add("selectedNav");

                        }
                    }
                }

            }

            // Up
            if (k == 'up') {

                // Inside Sub Navigation
                if (sel[0].classList.contains("subNavable")) {

                    var i = sel[0].getAttribute("data-snav");

                     i--;
                   

                    var q = col.length;
                    q = q - 1;

                    if (i - 1 != -1) {
                        i--;
                    } else {
                        if (screen == 'browser') {
                            sel[0].classList.remove("selectedNav");
                            document.getElementsByClassName("navable")[1].classList.add("selectedNav");
                            return;
                        }
                    }

                    sel[0].classList.remove("selectedNav");
                    sel[0].parentNode.parentNode.querySelectorAll(".subNavable")[i].classList.add("selectedNav");

                    currentSelection();
                }

            }


            // Has Sub Navigation
            if (sub[0]) {
                col = sel[0].querySelectorAll(".subNavable");
                sel[0].classList.remove("selectedNav"); // Remove Parent Select
                sub[0].classList.add("selectedNav"); // Add sub nav Select Class

                navigationHelpers(sel[0].getAttribute('id'));

                currentSelection();

            }
        }

        var run = document.getElementsByClassName("selectedNav")[0].getAttribute("data-function");
        var p = document.getElementsByClassName("selectedNav")[0].getAttribute("data-parameters");

        if (k == 'enter') {
            systemEvents(run, p);
        }

};