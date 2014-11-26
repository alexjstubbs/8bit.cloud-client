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
, 	WifiConfiguration 	= require('./onboarding/WifiConfiguration.jsx')
, 	WifiAdvanced	 	= require('./onboarding/WifiAdvanced.jsx')
, 	LoadingIgnition	 	= require('./onboarding/LoadingIgnition.jsx')
,   Browser 			= require('./Browser.jsx')
,   LargeProfile 		= require('./LargeProfile.jsx')
,   init 				= require('../js/init.js')
,   navigationInit  	= require('../js/navigation.init.js')
, 	pathname 			= window.location.pathname;


/* Init Clientside
-------------------------------------------------- */
init();


/* Set up Screens
-------------------------------------------------- */

	var container = document.getElementById("screens");

	if (pathname != "/welcome") {
		var _screens = ["Dashboard", "Browser", "Profile"];	
		var screens = [<Dashboard />, <Browser />, <LargeProfile />];
	}
	
	else {
		var _screens = ["Welcome", "NetworkSetup", "NewProfile", "WifiConfiguration", "WifiAdvanced", "LoadingIgnition"];	
		var screens = [<Welcome />, <NetworkSetup />, <NewProfile />, <WifiConfiguration />, <WifiAdvanced />, <LoadingIgnition />];
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
