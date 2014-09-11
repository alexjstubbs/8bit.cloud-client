/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons')
,   Dashboard = require('./Dashboard.jsx')
,   Browser = require('./Browser.jsx')
,   LargeProfile = require('./LargeProfile.jsx')
,   init = require('../js/init.js')
,   _ = require('lodash')
,   navigationInit = require('../js/navigation.init.js');

init();


/* Set up Screens
-------------------------------------------------- */

var _screens = ["Dashboard", "Browser"];
var screens = [<Dashboard />, <Browser />, <LargeProfile />];

var container = document.getElementById("screens");

_(screens).forEach(function(el, i) { 

    var li = document.createElement("li");
    container.appendChild(li).classList.add(_screens[i]);

    React.renderComponent(screens[i], li);

});

navigationInit.navigationInit();
