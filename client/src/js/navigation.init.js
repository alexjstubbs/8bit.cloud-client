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

/* Section
-------------------------------------------------- */

function isElementInViewport(el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
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
        parent = _.first(document.querySelectorAll(".parent"));
    }

    else {
        parent = element;
    }

    // _(document.querySelectorAll(".parent")).forEach(function(el, i) {
    //     console.log(el);
    //     console.log(isElementInViewport(el));
    // })

    navables = parent.querySelectorAll('.navable');

    _(navables).forEach(function(el, i) { 
        el.setAttribute("data-nav", i);
    });
    
    // Should i re-select an input on a form?
    if (parent.querySelectorAll(".activeInput")[0]) {
        parent.querySelectorAll(".activeInput")[0].classList.add("selectedNav", "selected");
    }
    
    // Choose first child
    else {
         _.first(navables).classList.add("selectedNav", "selected");
    }

   
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
