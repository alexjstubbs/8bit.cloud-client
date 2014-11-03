/* Navigation set up
-------------------------------------------------- */

var _   = require('lodash'),
    blink;

/* Init Modal Navigation Panels
-------------------------------------------------- */
var modalNavigation = function(callback) {
    var parent = document.querySelectorAll('.parent')[0];
    
    // if (document.querySelectorAll('.parent').length >= 2) {
    //     parent.classList.add("_parent");
    //     parent.classList.remove("parent");
    // }
    
    callback();
}

/* General Navigation Assigns/Init
-------------------------------------------------- */
var navigationInit = function(element, callback) {

    var navables = document.querySelectorAll('.navable, .subNavable'),
        parent;

     _(navables).forEach(function(el, i) { 
        el.removeAttribute("data-nav");
        el.classList.remove("selectedNav");
    });

    if (!element) {
        parent = _.last(document.querySelectorAll(".parent"));
    }

    else {
        parent = element;
    }

    navables = parent.querySelectorAll('.navable');

    _(navables).forEach(function(el, i) { 
        el.setAttribute("data-nav", i);
    });

    _.first(navables).classList.add("selectedNav", "selected");

    highlight();
  
}

var highlight = function() {
      clearInterval(blink);
      blink = setInterval(function() {
            document.querySelector('.selectedNav').classList.toggle('selectedActive');
    }, 200);
}

/* Exports
-------------------------------------------------- */
exports.highlight = highlight;
exports.navigationInit = navigationInit;
exports.modalNavigation = modalNavigation;
