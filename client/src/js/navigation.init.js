/* Navigation set up
-------------------------------------------------- */

var _ = require('lodash');
var blink;

var navigationInit = function() {

    var navables = document.querySelectorAll('.navable');
 
     _(navables).forEach(function(el, i) { 
        el.removeAttribute("data-nav");
        el.classList.remove("selectedNav");
    });

    var parent = _.first(document.querySelectorAll(".parent"));
    var navables = parent.querySelectorAll('.navable');

    _(navables).forEach(function(el, i) { 
        el.setAttribute("data-nav", i)
    });

    _.first(navables).classList.add("selectedNav", "selected");

    highlight();
}

var highlight = function() {
      clearInterval(blink);
      blink = window.setInterval(function() {
            document.querySelector('.selectedNav').classList.toggle('selectedActive');
    }, 200);
}
exports.highlight = highlight;
exports.navigationInit = navigationInit;
