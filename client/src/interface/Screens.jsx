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
, 	LoadingIgnition	 	= require('./onboarding/LoadingIgnition.jsx')
,   Browser 			= require('./Browser.jsx')
,   LargeProfile 		= require('./LargeProfile.jsx')
,   Profiles 			= require('./Profiles.jsx')
,   init 				= require('../js/init.js')
,   navigationInit  	= require('../js/navigation.init.js');

/* Init Clientside
-------------------------------------------------- */
init();

/* Set up Screens
-------------------------------------------------- */
var setupScreens = function(route) {
	
	var container = document.getElementById("screens");

	if (route == "/home" || route == "/home/" || route == "Dashboard") {
		var _screens = ["Dashboard", "Browser", "Profile"];
		var screens = [<Dashboard />, <Browser />, <LargeProfile />];
	}

	if (route == "/welcome" || route == "Welcome") {
		var _screens = ["Welcome", "NetworkSetup", "NewProfile"];
		var screens = [<Welcome />, <NetworkSetup />, <NewProfile />];
	}

	if (route == "/profiles" || route == "Profiles") {
		var _screens = ["Profiles"];
		var screens = [<Profiles />];
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

}

setupScreens(window.location.pathname);


/* Exports
-------------------------------------------------- */
exports.setupScreens = setupScreens;
