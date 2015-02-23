/* Requested system events via client (usually button presses)
-------------------------------------------------- */

var KeyEvent                = require('./navigation.keyEvent'),
    api                 	= require('socket.io-client')('/api'),
    navigationBindings  	= require("./navigation.bindings"),
    helpers                 = require("./helpers"),
    _                   	= require('lodash'),
    navigationInit      	= require("./navigation.init.js"),
    dialog              	= require('./dialogs'),
    eventDispatcher     	= require('./events'),
    keyboardKeyEvents     	= require('./navigation.keyboardKeyEvents'),
    navigationEventBinds    = require('./navigation.eventListeners'),
    systemSettings          = require('./system.settings'),
    Screens             	= require('../interface/Screens.jsx');


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

    /*  Restrict Navigation on Play Session
    -------------------------------------------------- */
    pauseSessionNavigation: function() {

        // UnBind Mousetrap Bindings
        navigationBindings("deinit");

        // Remove Global Event Listener
        window.removeEventListener('keydown', navigationEventBinds.navigationEventListeners.passKeyEvent);

    },

    /*  Resume Navigation post Play Session
    -------------------------------------------------- */
    resumeSessionNavigation: function() {

        // Resume/Add Global Event Listener
        navigationEventBinds.navigationEventListeners.bindEventNavigation();

        // (re)Bind Mousetrap Bindings
        navigationBindings("init");

        // ReStart Ignition UI Navigation
        navigationInit.navigationInit();

        // Remove all possible navigational breaks
        events.removeNavigationState();

    },


    /* Trigger New Screen Set
    -------------------------------------------------- */
    screenSet: function(parameters) {
        Screens.setupScreens(parameters);
    },

    /* Trigger Next Screen
    -------------------------------------------------- */
    nextScreen: function() {
        KeyEvent(221);
    },

    /* Trigger Previous Screen
    -------------------------------------------------- */
    previousScreen: function() {
        KeyEvent(219);
    },

    /* Render Certain Child of Screen
    -------------------------------------------------- */
    changeView: function(parameters) {
        eventDispatcher.changeView(parameters);
    },

    /*  Trigger Dialog (via api)
    -------------------------------------------------- */
    dialogShow: function(parameters) {
        dialog.show(parameters);
    },

    /*  Prompt Show (via api)
    -------------------------------------------------- */
    promptShow: function(parameters) {

        var json = JSON.parse(parameters);

        var arg = {
            message: json.message,
            agree: json.agree,
            disagree: json.disagree,
            parameters: json.parameters
        };

        // Show Dialog
        dialog.show("Prompt", null, arg);

    },

    /*  Confirm Show (via api)
    -------------------------------------------------- */
    confirmShow: function(parameters) {

        console.log(parameters);

        // Show Dialog
        dialog.show("Confirm", null, parameters);

    },

    /* Focus form inputs on Action button/keypress
    -------------------------------------------------- */
    inputFocus: function() {
        var input = document.getElementsByClassName("selectedNav")[0];
        dialog.keyboard(input);
    },

    /* Close current Dialog
    -------------------------------------------------- */
    closeDialog: function() {
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

    /* Prevent any action
    -------------------------------------------------- */
    preventDefault: function() {
        return 0;
    },

    /* Log User In
    -------------------------------------------------- */
    logIn: function(parameters) {

        if (parameters) {

            // Setup Object for Create Session
            var src  = "config/profiles/" + parameters + ".json";
            var dest = "config/profiles/Session.json";

            var copyObject = {};

            copyObject.src = src;
            copyObject.dest = dest;

            // Pass "Session" Object
            api.emit('request', { request: 'createSession', param: copyObject});

        }

    },

    /*  Log Out
    -------------------------------------------------- */
    logOut: function() {
        window.location = 'http://127.0.0.1:1210/profiles';
    },

    /*  Add an animation to element
    -------------------------------------------------- */
    toggleAnimateElement: function(parameters) {

        var possibleSpin = document.getElementById(parameters);

        if (possibleSpin) {
            possibleSpin.classList.toggle("animate-spin");
        }

    },


    /* Save Wifi Config
    -------------------------------------------------- */
	writeWifiConfig: function(parameters) {

        events.toggleAnimateElement("tester-spin");

        var form = document.forms[parameters].elements;

        var obj = {};

        _.each(form, function(input) {
            if (input.name && input.value) {
               obj[input.name] = input.value;
            }
        });

        obj.formTitle = parameters;

        api.emit('request', { request: 'writeWifiConfig', param: obj });

    },

    /*  Sign Up Status Window
    -------------------------------------------------- */
    signUpStatus: function(parameters) {

        var el       = document.getElementById("signup-status");
        var elIcon   = document.getElementById("signup-status-icon");
        var elButton = document.getElementById("signup-status-button");

        el.innerHTML       = parameters.message;
        elIcon.innerHTML   = parameters.icon;
        elButton.innerHTML = parameters.buttonText;

        elButton.setAttribute("data-function", parameters.buttonAction);

    },

    /*  Sign Up Dialog
    -------------------------------------------------- */
    signUpSubmit: function(parameters) {

        // Show Dialog
        dialog.show("SignUpSync");

    },

    /*  Log In Dialog
    -------------------------------------------------- */
    logInDialog: function(parameters) {

        // Show Dialog
        dialog.show("LogIn");

    },

    /* Submit form on Action button/keypress
    -------------------------------------------------- */
    submitForm: function(parameters, callback) {

        // Find Form
        var form = document.forms[parameters].elements,
            obj = {};

        // Iterate over Form Inputs for JSON
        _.each(form, function(input) {
            if (input.name && input.value) {
               obj[input.name] = input.value;
            }
        });

        // Construct Object
        obj.formTitle = parameters;

        // Parse server Input field (hidden field)
        switch(obj.server) {

            case "true": {
                api.emit('request', { request: 'submitForm', param: obj });
                if (callback) { callback(); }
                break;
            }

            case "false": {
                api.emit('request', { request: 'writeJSONSync', param: obj });
                if (callback) { callback(); }
                break;
            }

            case "cache": {
                 api.emit('request', { request: "cacheForm", param: obj });
                 if (callback) { callback(); }
                break;
            }

            default: {
                console.log("error submitting form");
            }

        }
    },

    /* Submit form on Action button/keypress
    -------------------------------------------------- */
    writeAdvancedConfig: function(parameters) {

        // Find Form
        var form = document.forms[parameters].elements,
            formObj = {};

        // Iterate over Form Inputs for JSON
        _.each(form, function(input) {
            if (input.name && input.value) {
                formObj[input.name] = input.value;
            }
        });

        // Build SelectList
        var selects = document.querySelectorAll("span[data-identifier='selectBoxConfig']"),
            selectList = [];

        // Iterare over List
        _.each(selects, function(select) {
            selectList.push(select.classList.contains("label-selected"));
        });

        // Build Object
        formObj.selectList = selectList;

        // Send Request to Node to write Config File
        api.emit('request', { request: 'writeAdvancedConfig', param: formObj});

        // Close the Dialog
        dialog.close();

    },

    /*  Restore Default Config file
    -------------------------------------------------- */
    restoreAdvancedConfig: function(parameters) {

        // Build Path
        var path = "/config/platforms/commandline/user/"+parameters+".json";

        // Send Request to Node to Remove Users File
        api.emit('request', { request: 'removeFile', param: path});

        // Close the Dialog
        dialog.close();
    },

    /* Load Dashboard
    -------------------------------------------------- */
    preloadDashboard: function(parameters) {

        if (parameters === "offline") {
            window.location = "http://127.0.0.1:1210/home/";
        }

        else {
            window.location = "http://127.0.0.1:1210/home/";
        }
    },

    /* Get Community Info
    -------------------------------------------------- */
    moreCommunity: function() {
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

        // Build Prompt Message Object
        var arg = {
            message: "Enabling Control of the Browser will enable your mouse. This requires a mouse to navigate and exit control of the browser. Do not proceed without a mouse. Are you sure you want to continue?",
            agree: "browserFocusAgree",
            disagree: "closeDialog",
            parameters: parameters
        };

        // Show Dialog
        dialog.show("Prompt", null, arg);

    },

    /* Focus Agreement
    -------------------------------------------------- */
    browserFocusAgree: function() {

        // Enable Mouse Control
        events.mouseControlEnable();

        // Close the Dialog
        dialog.close();

        // Focus (hack delay) the iFrame
        setTimeout(function() {
            document.getElementsByTagName("iframe")[0].focus();
        }, 500);
    },

    /* Terminal
    -------------------------------------------------- */
    showTerminal: function() {
        dialog.show("Terminal");
    },

    /* Go to URL (web browser)
    -------------------------------------------------- */
    gotoUrl: function() {

        // Construct URL from Input
        var url = document.getElementById("url-bar").value;

        // Pass the SRC to the iFrame
        document.getElementsByTagName("iframe")[0].src = url;

    },

    /* Disable Mouse, Close Agreement
    -------------------------------------------------- */
    closeDialogDisableMouse: function() {

        document.body.classList.remove("mouse");
        dialog.close();

    },

    /* Enable Mouse
    -------------------------------------------------- */
    mouseControlEnable: function() {
        document.body.classList.add("mouse");
    },

    /* Disable Mouse
    -------------------------------------------------- */
    mouseControlDisable: function() {
        document.body.classList.remove("mouse");
        dialog.close();
    },

    /* Switch Emulator on Action button/keypress
    -------------------------------------------------- */
    switchEmulator: function(parameters) {

        // document.getElementById("alpha_list_tbody").innerHTML = "";

        // Find all listed Platforms
        var longname,
            list = document.querySelectorAll(".platform");

        // Iterate over List, remove all selected attributes from classlist unless actually selected
        _(list).forEach(function(item) {
            item.classList.remove("selected");
            if (item.getAttribute("data-parameters") == parameters) {
                item.classList.add("selected");
                longname = item.textContent;
            }
        }).value();

        // Consturct Object to pass Paging
        var Obj = {
                platform: longname,
                start: 0
        };

        // Send Request to Node to get Start of Paging List
        api.emit('request', { request: 'gamesList', param: Obj });

    },

    /*  Save Favorite
    -------------------------------------------------- */
    addFavorite: function(parameters) {

        var long = document.getElementById("toggle-favorite").getAttribute("data-selection"),
            pObj = JSON.parse(parameters);

        pObj.long = long;

        var Obj = {
            database: "favorites",
            values: pObj
        };

        api.emit('request', { request: 'storeData', param: Obj });

        eventDispatcher.toggleFavorite(parameters);

    },

    /*  Remove Favorite
    -------------------------------------------------- */
    removeFavorite: function(parameters) {

        var long = document.getElementById("toggle-favorite").getAttribute("data-selection"),
            pObj = JSON.parse(parameters);

        pObj.long = long;

        var Obj = {
            database: "favorites",
            values: pObj
        };

        api.emit('request', { request: 'removeFavorite', param: Obj });

        eventDispatcher.toggleFavorite(parameters);

    },

    /* Drop navigation on sub-panels on Action button/keypress
    -------------------------------------------------- */
    highlightPanel: function() {
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
        };

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
    viewMessages: function() {
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
    viewFriends: function() {
        dialog.show("Friends");
    },

    /* View Friends
    -------------------------------------------------- */
    viewFriend: function(parameters) {
        dialog.show("FriendLarge", parameters);
    },

    /* Add a Friend(Request)
    -------------------------------------------------- */
    addFriend: function() {
        dialog.show("AddFriend");
    },

    /* Friend Online
    -------------------------------------------------- */
    friendNotification: function(parameters) {

        dialog.friendNotification(parameters);

        setTimeout(function() {
            var notification = document.querySelectorAll(".ignition-modal-friendNotification")[0];
            notification.parentElement.removeChild(notification);
        }, 4500);

    },

    /* Achievement Unlocked
    -------------------------------------------------- */
    achievementUnlocked: function(parameters) {

        var _ltime = new Date().valueOf();

        var aObj = {
            Software: JSON.parse(parameters).title,
            Type: "Achievement",
            Info: null,
            Local: _ltime
        };

        var Obj = {
            database: "activities",
            values: aObj
        };

        api.emit('request', { request: 'storeData', param: Obj });
        api.emit('request', { request: 'storeActivity', param: Obj.values });

        dialog.uiNotification(parameters);

        setTimeout(function() {
            var notification = document.querySelectorAll(".ignition-modal-achievement")[0];
            notification.parentElement.removeChild(notification);
        }, 3500);

    },

    /* Toggle Right Sidebar in in-game UserSpace
    -------------------------------------------------- */
    toggleUserSpaceSidebar: function() {

        // Get nodeList of user-space-right class(es)
        var userSpaceExists = document.querySelectorAll(".user-space-right");

        // Get SessionStorage for current running process
        var processObj = sessionStorage.getItem("processStorage");

        console.log(processObj);

        if (processObj) {
            processObj = JSON.parse(processObj);

            processObj = processObj.processStorage;
        }

        // If there is no user-space-right window open
        if (!userSpaceExists.length) {


            if (processObj) {
                // Constuct Object to pause process
                processObj = {
                    processname: processObj.name,
                    pid: processObj.pid,
                    signal: "SIGSTOP"
                };

                // Send a Request to Node to Pause Process
                api.emit('request', { request: 'processSignal', param: processObj });

            }


        // Open Window
            dialog.userSpaceRight();

            events.resumeSessionNavigation();

            events.navigationState("pause");

        }

        // if there IS a user-space-right window open
        else {

            events.pauseSessionNavigation();

            // Constuct Object to resume process
            if (processObj) {
                processObj = {
                    processname: processObj.name,
                    pid: processObj.pid,
                    signal: "SIGCONT"
                };

                // Send a Request to Node to Resume Process
                api.emit('request', { request: 'processSignal', param: processObj });

            }


            // Close the Window
            userSpaceExists[0].remove();
        }

    },

    /* Launch selected game
    -------------------------------------------------- */
    launchGame: function(parameters) {

        if (helpers.isJSON(parameters)) {

            var _ltime = new Date().valueOf();

            var aObj = {
                Software: JSON.parse(parameters).title,
                Type: "Gameplay",
                Info: null,
                Local: _ltime
            };

            var Obj = {
                database: "activities",
                values: aObj
            };

            api.emit('request', { request: 'storeData', param: Obj });
            api.emit('request', { request: 'storeActivity', param: Obj.values });

            if (parameters) {

                // Pause all UI Navigation
                events.pauseSessionNavigation();

                // Hide the UI
                var _doc = document.getElementById("main");
                document.body.style.background = "transparent";
                _doc.style.display = "none";

                // Remove Navigational Hooks
                navigationInit.navigationDeinit(function() {});

                // Open User Space
                dialog.userSpace();

                // Bind Navigation
                navigationEventBinds.navigationEventListeners.bindPlaySessionNavigation();


                // Emit to Launc Game
                api.emit('request', { request: 'launchGame', param: JSON.parse(parameters) });
            }

        }

        else {
            console.log("Launch called, but no parameters specified");
        }

    },

    /* See game Profile
    -------------------------------------------------- */
    largeProfile: function(parameters) {

        var platform = document.querySelectorAll(".platform.selected")[0].getAttribute("data-title"),
            shortname = document.querySelectorAll(".platform.selected")[0].getAttribute("data-parameters");

        var _launchContext = {
            platform: platform,
            filepath: parameters,
            shortname: shortname
        };

        eventDispatcher.launchContext(_launchContext);

        KeyEvent(221);

    },

    /*  Favorite Shortcut
    -------------------------------------------------- */
    favoriteCut: function(parameters) {
        // TODO: Create widget for favorites instead of passing them to profile

        var JSONified = JSON.parse(parameters);

        eventDispatcher.launchContext(JSONified);

        KeyEvent(221);
        KeyEvent(221);

    },

	/*  Resume Client
	-------------------------------------------------- */
    resumeClient: function() {

        // Show the UI
        var _doc = document.getElementById("main");
        document.body.style.background = "#000000";
        _doc.style.display = "block";

        // Close User Space
        dialog.closeAll(function() {

            // Get Process Object
            var processObj = sessionStorage.getItem("processStorage");

                if (processObj) {
                    processObj = JSON.parse(processObj);

                    processObj = processObj.processStorage;

                    // Exit the Process
                    api.emit('request', { request: 'kill', param: processObj.pid });


                    // Constuct Object to resume process
                    processObj = {
                        processname: processObj.name,
                        pid: processObj.pid,
                        signal: "SIGCONT"
                    };

                // Send a Request to Node to Resume Process
                api.emit('request', { request: 'processSignal', param: processObj });
            }

            // Add needed navigation hooks
            var _ndoc = document.getElementById("Profile");
                _ndoc.classList.add("parent");

            // ReBind UI Navigation
            events.resumeSessionNavigation();

            // UnBind Navigation for Play Session
            window.removeEventListener('keydown', navigationEventBinds.navigationEventListeners.passSessionKeyEvent);


        });


    },

	/*  Software Options
	-------------------------------------------------- */
    softwareOptions: function(parameters) {

        var options = JSON.parse(parameters);

        dialog.show("SoftwareOptions", options);

    },

	/*  Select Box UI for options
	-------------------------------------------------- */
    selectBox: function(parameters) {

        var doc     = document.getElementById(parameters);
        var input     = document.getElementById("input-"+parameters);

        if (!doc.classList.contains("required")) {
            doc.classList.toggle("label-selected");
            if (input) { input.classList.toggle("disabled"); }
        }

        eventDispatcher.selectBox(input, doc.classList.contains("label-selected"));

    },

	/*  Choice Box (radio) for Options
	-------------------------------------------------- */
    choiceBox: function(parameters) {

        var doc = document.getElementById(parameters),
            parent = doc.parentNode;

            _.each(parent.childNodes, function(el) {
                el.classList.remove("label-selected");
            });

            doc.classList.add("label-selected");

            api.emit('request', { request: 'getSpecificCommandLineConfig', param: doc.innerHTML });

    },

};


/* Exports
-------------------------------------------------- */
exports.events = events;
