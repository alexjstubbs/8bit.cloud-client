/**
 * @jsx React.DOM
 */

'use strict';

var React 				= require('react/addons')
,   _ 					= require('lodash')
,   Dashboard 			= require('./Dashboard.jsx')
, 	NewSignup 			= require('./forms/NewSignup.jsx')
, 	UserAgreement 		= require('./forms/UserAgreement.jsx')
, 	ControlLayout 		= require('./onboarding/ControlLayout.jsx')
,   Browser 			= require('./Browser.jsx')
,   LargeProfile 		= require('./LargeProfile.jsx')
,   init 				= require('../js/init.js')
,   navigationInit  	= require('../js/navigation.init.js');

init();


var pathname = window.location.pathname;



/* Set up Screens
-------------------------------------------------- */


	var container = document.getElementById("screens");

	if (pathname != "/welcome") {
		var _screens = ["Dashboard", "Browser", "Profile"];	
		var screens = [<Dashboard />, <Browser />, <LargeProfile />];
	}
	
	else {

		var _screens = ["ControlLayout"];	
		var screens = [<ControlLayout />];
	}


	_(screens).forEach(function(el, i) { 

		var li = document.createElement("li");

	    container.appendChild(li).classList.add(_screens[i]);

	    React.renderComponent(screens[i], li);

	});



/* Init Navigation Controls
-------------------------------------------------- */
navigationInit.navigationInit();
