/* Requested system events via client (usually button presses)
-------------------------------------------------- */

var systemNotify    	= require('./notification.init.js')
,   KeyEvent       	 	= require('./navigation.keyEvent')
,   api             	= require('socket.io-client')('/api')
,   aApi				= require("./api/connection")
,   React           	= require('react/addons')
,   Modal           	= require('../interface/Modal.jsx')
,   Messages        	= require('../interface/Messages.jsx')
,   _               	= require('lodash')
,   navigationInit  	= require("./navigation.init.js")
,   dialog          	= require('./dialogs')
, 	eventDispatcher 	= require('./events')
, 	keyboardKeyEvents 	= require('./navigation.keyboardKeyEvents')
, 	Screens 			= require('../interface/Screens.jsx')
,   mousetrap           = require("./mousetrap.min.js")
,   navigationEvent 	= require("./navigation.event");

// browser = require("./browser.js");

var events = {

	/* Set Navigation State
	-------------------------------------------------- */
	navigationState: function(parameters) {
		sessionStorage.setItem("navigationState", parameters);
	},

	/* Remove Navigation State
	-------------------------------------------------- */
	removeNavigationState: function() {
		sessionStorage.removeItem("navigationState");
	},

	/* Trigger New Screen Set
	-------------------------------------------------- */
	screenSet: function(parameters) {
		Screens.setupScreens(parameters);
	},

	/* Trigger Next Screen
	-------------------------------------------------- */
	nextScreen: function(parameters) {
		KeyEvent(221);
	},

	/* Trigger Previous Screen
	-------------------------------------------------- */
	previousScreen: function(parameters) {
		KeyEvent(219);
	},

	/* Render Certain Child of Screen
	-------------------------------------------------- */
	changeView: function(parameters) {
		eventDispatcher.changeView(parameters);
	},

    /* Focus form inputs on Action button/keypress
    -------------------------------------------------- */
    inputFocus: function(parameters) {
        var input = document.getElementsByClassName("selectedNav")[0];
        dialog.keyboard(input);
    },

    /* Close current Dialog
    -------------------------------------------------- */
    closeDialog: function(el) {

	    dialog.close();

	},

	/* General Dialog
	-------------------------------------------------- */
	openDialog: function(_type) {

		dialog.general(null, _type);

	},

    /* Press Key on OnScreen Keyboard
    -------------------------------------------------- */
    depressKey: function(parameters) {

		keyboardKeyEvents.keypress(parameters);

    },

    /* Log User In
    -------------------------------------------------- */
    logIn: function(parameters) {

    	if (parameters) {

	    	var src  = "config/profiles/" + parameters + ".json";
	    	var dest = "config/profiles/Session.json";

	    	var copyObject = {};

	    	copyObject.src = src;
	    	copyObject.dest = dest;

			api.emit('request', { request: 'createSession', param: copyObject});

		}

		else {



		}

    },

	/*  Log Out
	-------------------------------------------------- */
	logOut: function(parameters) {

		window.location = 'http://127.0.0.1:1210/profiles';

	},

    /* Save Wifi Config
    -------------------------------------------------- */

  	saveWifiConfig: function(parameters) {

        var form = document.forms[parameters].elements;

        var obj = new Object;

        _.each(form, function(input) {
            if (input.name && input.value) {
               obj[input.name] = input.value;
            }
        });

        obj.formTitle = parameters;

  		api.emit('request', { request: 'writeTextSync', param: obj });

    },

    /* Submit form on Action button/keypress
    -------------------------------------------------- */
    submitForm: function(parameters) {

        var form = document.forms[parameters].elements;

        var obj = new Object;

        _.each(form, function(input) {
            if (input.name && input.value) {
               obj[input.name] = input.value;
            }
        });

        obj.formTitle = parameters;

        switch(obj.server) {

			case "true": {
			    api.emit('request', { request: 'submitForm', param: obj });
				break;
			}

			case "false": {
			    api.emit('request', { request: 'writeJSONSync', param: obj });
				break;
			}

			case "cache": {
			 	api.emit('request', { request: "cacheForm", param: obj });
				break;
			}

			default: {
				console.log("error submitting form");
			}

	    }
    },

    /* Load Dashboard
    -------------------------------------------------- */
    preloadDashboard: function(parameters) {

    	// Load new QTBrowser window and use on complete to close this instance?
    	// if (document.readyState === "complete") { init(); }

    	window.location = "http://127.0.0.1:1210/home/";


    },

    /* Get Community Info
    -------------------------------------------------- */
	moreCommunity: function(parameters) {

		dialog.show("Community");

    },

    /* Web Browser
    -------------------------------------------------- */
	launchBrowser: function(parameters) {

		dialog.show("WebBrowser", parameters);

    },

	/* Web Browser
	-------------------------------------------------- */
	browserFocus: function(parameters) {

		var arg = {
			message: "Enabling Control of the Browser will enable your mouse. This requires a mouse to navigate and exit control of the browser. Do not proceed without a mouse. Are you sure you want to continue?",
			agree: "browserFocusAgree",
			disagree: "closeDialog",
			parameters: parameters
		}

		dialog.show("Prompt", null, arg);

	},

	/* Focus Agreement
	-------------------------------------------------- */
	browserFocusAgree: function(parameters) {
		events.mouseControlEnable();
		dialog.close();
		setTimeout(function() {
			document.getElementsByTagName("iframe")[0].focus();
		}, 500);
	},

	/* 	Terminal
	-------------------------------------------------- */
	showTerminal: function(parameters) {

		dialog.show("Terminal");

	},

	/* 	Go to URL (web browser)
	-------------------------------------------------- */
	gotoUrl: function(parameters) {

		var url = document.getElementById("url-bar").value;
		document.getElementsByTagName("iframe")[0].src = url;

	},

	/* 	Disable Mouse, Close Agreement
	-------------------------------------------------- */
	closeDialogDisableMouse: function(parameters) {

		document.body.classList.remove("mouse");
		dialog.close();

	},

	/* 	Enable Mouse
	-------------------------------------------------- */
	mouseControlEnable: function(parameters) {

		document.body.classList.add("mouse");

	},

	/* 	Disable Mouse
	-------------------------------------------------- */
	mouseControlDisable: function(parameters) {

		document.body.classList.remove("mouse");
		dialog.close();

	},

    /* Switch Emulator on Action button/keypress
    -------------------------------------------------- */
    switchEmulator: function(parameters) {

        var longname,
            list = document.querySelectorAll(".platform");

        _(list).forEach(function(item) {
            item.classList.remove("selected");
            if (item.getAttribute("data-parameters") == parameters) {
                item.classList.add("selected");
                longname = item.textContent;
            };
        });

        api.emit('request', { request: 'gamesList', param: longname });
    },

    /* Drop navigation on sub-panels on Action button/keypress
    -------------------------------------------------- */
    highlightPanel: function(parameters) {
		KeyEvent(40);
    },

	/*  Delete Message Prompt
	-------------------------------------------------- */
	deleteMessage: function(parameters) {

		var arg = {
			message: "Are you sure you want to delete this message?",
			agree: "deleteMessageConfirmed",
			disagree: "closeDialog",
			parameters: parameters
		}

		dialog.show("Prompt", null, arg);

	},

    /* Delete Message
    -------------------------------------------------- */
    deleteMessageConfirmed: function(parameters) {

		api.emit('request', { request: 'deleteMessage', param: parameters });
		api.emit('request', { request: 'messages', param: null });

		dialog.close();
		dialog.close();

	},

    /* View Messages event
    -------------------------------------------------- */
    viewMessages: function(parameters) {
        dialog.show("Messages");
	},

	/*  View Single Message
	-------------------------------------------------- */
	viewMessage: function(parameters) {
		dialog.show("Message", parameters);
		api.emit('request', { request: 'messages', param: null });
	},

	/* Send Message
	-------------------------------------------------- */
	passMessage: function(parameters) {
		dialog.show("PassMessage", parameters);
	},

	/* View Friends
    -------------------------------------------------- */
    viewFriends: function(parameters) {
        dialog.show("Friends");
	},

	/* View Friends
    -------------------------------------------------- */
    viewFriend: function(parameters) {
        dialog.show("FriendLarge", parameters);
	},

	/* Add a Friend(Request)
    -------------------------------------------------- */
    addFriend: function(parameters) {
        dialog.show("AddFriend");
	},

    /* Launch selected game
    -------------------------------------------------- */
    launchGame: function(parameters) {
        // TODO:  via sockets and update server activity (so-and-so played game, 10 hours ago)


		events.navigationState("pauseAll");
		document.body.style.display = "none";

		// Disconnect Socket for Reconnection

		// Timeout to be caught on process resume
		setTimeout(function() {
			document.body.style.display = "block";
			events.removeNavigationState();

			// Disconnect old socket and re-connect to Sockets again after unfreeze.
			api.io.disconnect();

			setTimeout(function() {
				api.io.reconnect();
				api.io.connect();
			}, 500);

			console.log(api);
			console.log(aApi.api.io);

		}, 2500);

		var Obj = {
			rootcmd: "/opt/emulators/retroarch",
			options: "-L",
			args: "/opt/emulatorcores/fceu-next/fb_alpha_libretro.so",
			file: "/root/roms/nes/Tetris.NES"
		}

		console.log(api);
		console.log(aApi.api.io);

		api.emit('request', { request: 'launchGame', param: Obj });
		// api.io.disconnect();

    },

	/* See game Profile
	-------------------------------------------------- */
	largeProfile: function(parameters) {

		// TODO:
		KeyEvent(221);


	}

}


/* Exports
-------------------------------------------------- */
exports.events = events;
