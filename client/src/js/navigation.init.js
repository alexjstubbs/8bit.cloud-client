/* Navigation indexing and set up
-------------------------------------------------- */
var _   = require('lodash'),
    blink;

/* General Navigation Assigns/Init
-------------------------------------------------- */
var navigationInit = function(element, callback) {

    // Get all global navable elements.
    var navables = document.querySelectorAll('.navable, .subNavable'),
        parent;

    // Remove all indexing and selections
     _(navables).forEach(function(el, i) {
        el.removeAttribute("data-nav");
        el.classList.remove("selectedNav");
        el.classList.remove("selectedActive");
    }).value();

    // (Default) if no element is specified, find the parent
    if (!element) {
        parent = _.first(document.querySelectorAll(".parent"));
    }

    else {
        parent = element;
    }

    // Get all Local (screen, dialog) navable elements
    navables = parent.querySelectorAll('.navable');

    // Add navigation index based on position
    _(navables).forEach(function(el, i) {
        el.setAttribute("data-nav", i);
    }).value();

    var defaultSelected = document.querySelectorAll(".default-navable")[0];

    // Should i re-select an input on a form?
    var activeInput      = parent.querySelectorAll(".activeInput")[0];
    var defaultSelection = parent.querySelectorAll(".defaultSelection")[0];

    if (defaultSelection) {
        defaultSelection.classList.add("selectedNav", "selected");
    }


    else if (activeInput) {
        activeInput.classList.add("selectedNav", "selected");
        activeInput.classList.remove("activeInput");
    }

    // Choose first child or Default if specified
    else {
         _.first(navables).classList.add("selectedNav", "selected");

    }

};

/* General Navigation Assigns/Init
-------------------------------------------------- */
var navigationDeinit = function(element, callback) {

    // Get all global navable elements.
    var navables = document.querySelectorAll('.navable, .subNavable'),
    parent;

    var parents = document.querySelectorAll(".parent");

        _(parents).forEach(function(el, i) {
            el.classList.remove("parent");
            console.log(el);
        }).value();


    // Remove all indexing and selections
    _(navables).forEach(function(el, i) {
        el.removeAttribute("data-nav");
        el.classList.remove("selectedNav");
        el.classList.remove("selectedActive");
    }).value();

    _(parents).forEach(function(el, i) {
        el.classList.remove("parent");
        console.log(el);
    }).value();

    if (callback) {
        callback();
    }

};


/* Highlight Selection
-------------------------------------------------- */

var highlight = function() {
    //   clearInterval(blink);
    //   blink = setInterval(function() {
    //         document.querySelector('.selectedNav').classList.toggle('selectedActive');
    // }, 200);
};

/* Exports
-------------------------------------------------- */
exports.highlight           = highlight;
exports.navigationInit      = navigationInit;
exports.navigationDeinit    = navigationDeinit;
