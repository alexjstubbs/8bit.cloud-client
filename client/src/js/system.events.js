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
    systemSettings          = require('./system.settings').settings,
    Screens             	= require('../interface/Screens.jsx'),
    Dialog                  = require('./dialogs').Dialog,
    Prompt                  = require('./notifications').Prompt;

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

    /*  Resume Navigation post Play Session
    -------------------------------------------------- */
    pauseBindingNavigation: function() {

        window.removeEventListener('gamepadEvent', navigationEventBinds.navigationEventListeners.passMappingKeyEvent);


    },

    /*  Resume Navigation post Play Session
    -------------------------------------------------- */
    resumeBindingNavigation: function() {

        navigationEventBinds.navigationEventListeners.bindMappingNavigation();

    },


    /*  Map gamepad button
    -------------------------------------------------- */
    gamepadMap: function(parameter) {

        var selected = document.querySelectorAll(".selectedNav")[0];

        if (!parameter) {

            if (selected) {
                var selectedPre = document.querySelectorAll("#" + selected.getAttribute("id") + " .input-group-addon")[0];
                selectedPre.classList.add("blue-bg");

                events.pauseSessionNavigation();
                events.resumeBindingNavigation();

            }
        }

        else {

            if (selected) {

                var selectedPre = document.querySelectorAll("#" + selected.getAttribute("id") + " .input-group-addon")[0];
                selectedPre.classList.remove("blue-bg");

                events.resumeSessionNavigation();
                events.pauseBindingNavigation();

            }

        }

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

    /*  Trigger nextRow in navigation
    -------------------------------------------------- */
    navigationNextRow: function() {

        var parent = document.querySelectorAll(".parent");
        var _parent = document.querySelectorAll("._parent");

        parent[0].classList.remove("parent");
        parent[0].classList.add("_parent");

        _parent[0].classList.remove("_parent");
        _parent[0].classList.add("parent");

        navigationInit.navigationInit();

    },

    /*  Changes views children
    -------------------------------------------------- */
    showChildren: function(parameters) {

        eventDispatcher.changeView(parameters);

    },

    /*  Trigger prevRow in navigation
    -------------------------------------------------- */
    navigationPrevRow: function() {

        var parent = document.querySelectorAll(".parent");
        var _parent = document.querySelectorAll("._parent");

        parent[0].classList.remove("parent");
        parent[0].classList.add("_parent");

        _parent[0].classList.remove("_parent");
        _parent[0].classList.add("parent");

        navigationInit.navigationInit();

        eventDispatcher.changeView("Paths");

    },

    /*  Trigger Dialog (via api)
    -------------------------------------------------- */
    dialogShow: function(parameters) {
        var dialog            = new Dialog("Dialog");
            dialog.child      = parameters;
            dialog.display();
    },

    /*  Show Settings
    -------------------------------------------------- */
    settingsShow: function() {
        eventDispatcher.switchScreen("Settings");
    },

    /*  Prompt Show (via api)
    -------------------------------------------------- */
    promptShow: function(parameters) {
        if (helpers.isJSON(JSON.parse(parameters))) {
            var json = JSON.parse(parameters);

            var prompt            = new Prompt();
                prompt.message    = json.message;
                prompt.agree      = json.agree;
                prompt.disagree   = json.disagree;
                prompt.params     = json.parameters;

                prompt.display();
        }

        else {
            throw "Could not open Prompt window. Parameter returned was not an Object";
        }
    },

    /*  Confirm Show (via api)
    -------------------------------------------------- */
    confirmShow: function(parameters) {
        var prompt            = new Prompt();
            prompt.message    = parameters;

            prompt.display();
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
        var dialog = new Dialog();
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

    /*  Restore default Config
    -------------------------------------------------- */
    restoreConfig: function() {
        systemSettings.restore();
        systemSettings.refresh();
        events.navigationPrevRow();
    },
    /*  Update Main Config
    -------------------------------------------------- */
    updateConfig: function(parameters) {
        var form = document.forms[parameters].elements;

        var obj  = {},
            nobj = {};

        _.each(form, function(input) {
            if (input.name && input.value) {
               obj[input.name] = input.value;
            }
        });

        var title = parameters.toLowerCase();


         nobj[title] = obj;

         nobj.path = "/config/";
         nobj.filename = "config.json";

        api.emit('request', { request: 'writeJSONSync', param: nobj });
        events.navigationPrevRow();

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
    signUpSubmit: function() {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "SignUpSync";
            dialog.display();
    },

    /*  Log In Dialog
    -------------------------------------------------- */
    logInDialog: function() {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "LogIn";
            dialog.display();
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
        var dialog            = new Dialog();
            dialog.child      = "Community";
            dialog.display();
    },

    /* Web Browser
    -------------------------------------------------- */
    launchBrowser: function(parameters) {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "WebBrowser";
            dialog.compProps  = {url: parameters};
            dialog.display();
    },

    /* Web Browser
    -------------------------------------------------- */
    browserFocus: function(parameters) {
        var prompt            = new Prompt();
            prompt.message    = "Enabling Control of the Browser will enable your mouse. This requires a mouse to navigate and exit control of the browser. Do not proceed without a mouse. Are you sure you want to continue?";
            prompt.agree      = "browserFocusAgree";
            prompt.disagree   = "closeDialog";
            prompt.params     = parameters;

            prompt.display();
    },

    /* Focus Agreement
    -------------------------------------------------- */
    browserFocusAgree: function() {

        // Enable Mouse Control
        events.mouseControlEnable();

        // Close the Dialog
        Dialog.close();

        // Focus (hack delay) the iFrame
        setTimeout(function() {
            document.getElementsByTagName("iframe")[0].focus();
        }, 500);
    },

    /* Terminal
    -------------------------------------------------- */
    showTerminal: function() {
        var dialog            = new Dialog();
            dialog.child      = "Terminal";
            dialog.display();
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
        var prompt            = new Prompt();
            prompt.message    = "Are you sure you want to delete this message?";
            prompt.agree      = "deleteMessageConfirmed";
            prompt.disagree   = "closeDialog";
            prompt.params     = parameters;

            prompt.display();
    },

    /* Delete Message
    -------------------------------------------------- */
    deleteMessageConfirmed: function(parameters) {

        api.emit('request', { request: 'deleteMessage', param: parameters });
        api.emit('request', { request: 'messages', param: null });

        Dialog.close();
        Dialog.close();

    },

    /* View Messages event
    -------------------------------------------------- */
    viewMessages: function() {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "Messages";
            dialog.display();

    },

    /*  View Single Message
    -------------------------------------------------- */
    viewMessage: function(parameters) {
        api.emit('request', { request: 'messages', param: null });


        var dialog            = new Dialog("Dialog");
            dialog.child      = "Message";
            dialog.compProps  = JSON.parse(parameters);
            dialog.display();
    },

    /* Send Message
    -------------------------------------------------- */
    passMessage: function(parameters) {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "PassMessage";
            dialog.compProps  = parameters;
            dialog.display();
    },

    /* View Friends
    -------------------------------------------------- */
    viewFriends: function(parameters) {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "Friends";
            dialog.compProps   = parameters;
            dialog.display();
    },

    /* View Friends
    -------------------------------------------------- */
    viewFriend: function(parameters) {

        console.log(parameters);

        var dialog            = new Dialog("Dialog");
            dialog.child      = "FriendLarge";
            dialog.compProps  = parameters;
            dialog.display();
    },

    /* Add a Friend(Request)
    -------------------------------------------------- */
    addFriend: function() {
        var dialog            = new Dialog("Dialog");
            dialog.child      = "AddFriend";
            dialog.display();
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
                if (typeof systemSettings.get.gameplay != "undefined") {
                    if (systemSettings.get.gameplay.show_userspace != "false") {
                        dialog.userSpace();
                    }
                }


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

        var dialog            = new Dialog("Dialog");
            dialog.child      = "SoftwareOptions";
            dialog.compProps  = { payload: options };
            dialog.display();

    },

	/*  Go to Setup Wizard
	-------------------------------------------------- */
    setupWizard: function() {

        window.location = 'http://127.0.0.1:1210/welcome';

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

    /*  Radio button type select
    -------------------------------------------------- */
    radioBox: function(parameters) {

         var radio = document.getElementById(parameters);
         var group = document.getElementById(parameters).getAttribute('data-group');;

         var groupEls = document.querySelectorAll('[data-group='+group+']');
         var input    = document.getElementById("input-"+group);


         if (groupEls.length >= 2) {
             _.each(groupEls, function (item) {

                item.classList.toggle("label-selected");
                item.classList.toggle("label-unselected");

                if (input && item.classList.contains("label-selected")) {
                    input.value = item.getAttribute("data-name");
                }
        });

        }

        else {

            groupEls[0].classList.toggle("label-selected");
            groupEls[0].classList.toggle("label-unselected");

            if (input && groupEls[0].classList.contains("label-selected")) {
                input.value = "true";
            }

            else {
                input.value = "false";
            }
        }

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

    /*  Take software screenshot
    -------------------------------------------------- */
    takeScreenshot: function(parameters) {

            var process = sessionStorage.getItem("processStorage");
            if (helpers.isJSON(process)) {

                process = JSON.parse(process);
                var name = process.processStorage.name;

                switch (name) {

                    case "retroarch":
                        parameters = 'echo -n SCREENSHOT >/dev/udp/localhost/55355';
                        api.emit('request', { request: 'execute', param: parameters });
                        break;

                    default:
                        break;

                    }
                events.toggleUserSpaceSidebar();
            }

    },

    /*  Save current state
    -------------------------------------------------- */
    saveState: function(parameters) {

            var process = sessionStorage.getItem("processStorage");
            if (helpers.isJSON(process)) {

                process = JSON.parse(process);
                var name = process.processStorage.name;

                switch (name) {

                    case "retroarch":
                        parameters = 'echo -n SAVE_STATE >/dev/udp/localhost/55355';
                        api.emit('request', { request: 'execute', param: parameters });
                        break;

                    default:
                        break;

                    }

                events.toggleUserSpaceSidebar();
            }

    },


    /*  Save current state
    -------------------------------------------------- */
    loadState: function(parameters) {

            var process = sessionStorage.getItem("processStorage");
            if (helpers.isJSON(process)) {

                process = JSON.parse(process);
                var name = process.processStorage.name;

                switch (name) {

                    case "retroarch":
                        parameters = 'echo -n LOAD_STATE >/dev/udp/localhost/55355';
                        api.emit('request', { request: 'execute', param: parameters });
                        break;

                    default:
                        break;

                    }

                events.toggleUserSpaceSidebar();
            }

    },

    rebootOS: function(parameters) {
        parameters = "reboot";
        api.emit('request', { request: 'execute', param: parameters });

    }


};


/* Exports
-------------------------------------------------- */
exports.events      = events;
