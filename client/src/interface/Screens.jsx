/**
 * @jsx React.DOM
 */

'use strict';

var React 				= require('react/addons')
,   _ 					= require('lodash')
,   Dashboard 			= require('./Dashboard.jsx')
, 	UserAgreement 		= require('./forms/UserAgreement.jsx')
, 	Welcome 			= require('./onboarding/Welcome.jsx')
, 	NetworkSetup 		= require('./onboarding/NetworkSetup.jsx')
, 	NewProfile	 		= require('./onboarding/NewProfile.jsx')
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
		var _screens = ["Welcome", "NetworkSetup", "NewProfile"];	
		var screens = [<Welcome />, <NetworkSetup />, <NewProfile />];
	}


	_(screens).forEach(function(el, i) { 

		var li = document.createElement("li");

	    container.appendChild(li).classList.add(_screens[i]);

	    React.renderComponent(screens[i], li);

	});

	_.first(container.children).id = "screen-active";



/* Init Navigation Controls
-------------------------------------------------- */
navigationInit.navigationInit();
