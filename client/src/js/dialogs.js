/* jslint node: true */
"use strict";

/* Dialogs and Modals interface
-------------------------------------------------- */

var events              = require('./events.js'),
    React               = require('react/addons'),
    Modal               = require('../interface/Modal.jsx'),
    Message             = require('../interface/Message.jsx'),
    Messages            = require('../interface/Messages.jsx'),
    Friends             = require('../interface/Friends.jsx'),
    SoftwareOptions     = require('../interface/SoftwareOptions.jsx'),
    FriendNotification  = require('../interface/FriendNotification.jsx'),
    AchievementNodes    = require("../interface/AchievementNodes.jsx"),
    AchievementUnlocked = require('../interface/AchievementUnlocked.jsx'),
    FriendLarge         = require('../interface/FriendLarge.jsx'),
    Prompt              = require('../interface/Prompt.jsx'),
    Confirm             = require('../interface/Confirm.jsx'),
    Terminal            = require('../interface/Terminal.jsx'),
    WebBrowser          = require('../interface/WebBrowser.jsx'),
    SignUp              = require('../interface/forms/SignUp.jsx'),
    LogIn               = require('../interface/forms/LogIn.jsx'),
    SignUpSync          = require('../interface/SignUpSync.jsx'),
    AddFriend           = require('../interface/forms/AddFriend.jsx'),
    PassMessage         = require('../interface/forms/PassMessage.jsx'),
    CommunityInfo       = require('../interface/CommunityInfo.jsx'),
    Settings            = require('../interface/Settings.jsx'),
    navigationInit      = require("./navigation.init.js"),
    Keyboard            = require("../interface/OnScreenKeyboard.jsx"),
    GeneralDialog       = require("../interface/GeneralDialog.jsx"),
    UserSpace           = require("../interface/UserSpace.jsx"),
    UserSpaceRight      = require("../interface/UserSpaceRight.jsx"),
    _                   = require('lodash');

    var _div;



/*  Child Objects
-------------------------------------------------- */
var children = function(props) {

    return {
        "Terminal"         : {
            child          : new Terminal(props)
        },
        "WebBrowser"       : {
            child          : new WebBrowser(props)
        },
        "Prompt"           : {
            child          : new Prompt(props)
        },
        "Confirm"          : {
            child          : new Confirm(props)
        },
        "SignUp"           : {
            child          : new SignUp(props)
        },
        "SignUpSync"       : {
            child          : new SignUpSync(props)
        },
        "LogIn"            : {
            child          : new LogIn(props)
        },
        "Friends"          : {
            child          : new Friends(props)
        },
        "FriendLarge"      : {
            child          : new FriendLarge(props)
        },
        "AddFriend"        : {
            child          : new AddFriend(props)
        },
        "PassMessage"      : {
            child          : new PassMessage(props)
        },
        "Settings"         : {
            child          : new Settings(props)
        },
        "AchievementNodes" : {
            child          : new AchievementNodes({control: true})
        },
        "SoftwareOptions"  : {
            child          : new SoftwareOptions(props)
        },
        "Message"          : {
            child          : new Message(props)
        },
        "Messages"         : {
            child          : new Messages(props)
        },
        "Community"        : {
            child          : new CommunityInfo({classList: "container ignition-modal systemNotificationContent community-modal"})
        }
    };

};

/**
 * Construct a new DOM Mount
 */

function constructMount() {

    var _index   = document.querySelectorAll(".ignition-modal"),
        fragment = document.createDocumentFragment(),
        div      = document.createElement("div");

    var mountPoint = document.createElement("div");
    fragment.appendChild(mountPoint);

    mountPoint.classList.add("ignition-modal-notification", "ui-window");
    div.classList.add("ignition-modal-parent");
    div.style.zIndex = _index.length+150;

    fragment.appendChild(div);

    document.body.insertBefore(fragment, document.body.firstChild);

    return div;
}

/**
 * Construct a new Dialog object
 *
 * @param type [string] the type of dialog. e.g. 'modal'
 * @param child [string] the child of dialog. e.g. 'Invitation'
 * @param compProps [object] an object containing needed component Propertes e.g. '{backdrop: true}'
 * @param classList [array] an array of class names. e.g. 'ignition-modal, achievement-window'
 *
 */

function Dialog(type, child, compProps, classList) {
    this.type       = type;
    this.child      = child;
    this.compProps  = compProps;
    this.classList  = classList;
}

Dialog.prototype = {

    // Display Dialog
    display: function() {

        var mount = constructMount();

        if (typeof mount === "object") {
            sessionStorage.setItem("navigationState", "pause");
            React.renderComponent(new Modal({}, children(this.compProps)[this.child]), mount);
        }

        else {
            throw "Failed to construct window. Constructor did not return an Object";
        }

    },

    // Close top-most (current) Dialog
    close: function(modal, callback, exception) {

        sessionStorage.removeItem("navigationState");

        var container = document.getElementById("main");
            modal     = document.querySelectorAll(".ignition-modal-parent")[0];

        // Re-render dashboard
        if (modal.length == 1 && container.getAttribute("data-screen") == "Dashboard") {
            events.renderScreenComponents("Dashboard");
        }

        modal.parentNode.removeChild(modal);

        if (!exception) {
            navigationInit.navigationInit();
        }

        if (callback || typeof callback === "function") {
            callback();
        }

    },

    // Close all Dialogs
    closeAll: function(callback) {

        var allDialogs = document.querySelectorAll(".ui-window");

        _(allDialogs).forEach(function(element) {
            element.remove();
        }).value();

        if (callback || typeof callback === "function") callback();

    }

};

/**
 * Construct a new System-wide notification object
 *
 * @param type [string] the type of dialog. e.g. 'game'
 */

var Notification = function(type) {
    this.type = type;
};

Notification.prototype = new Dialog();

Notification.prototype = {
     display: function() {

         var achievementObj;

         if (this.params.hasOwnProperty('achievementObj')) {
             achievementObj = JSON.parse(this.params.achievementObj);
            }

         var _index = document.querySelectorAll(".ignition-modal-");

         var div = document.createElement("div");
         div.classList.add("ignition-modal-parent");
         div.classList.add("ui-window");
         div.style.zIndex = _index.length+250;

         document.body.insertBefore(div, document.getElementById("ui-notifications"));

         React.renderComponent(new Modal({backdrop: false, classList: "container ignition-modal ignition-modal-achievement systemNotificationContent"}, new AchievementUnlocked({achievement: achievementObj})), div);

     }
};


/* Show General/Error Modal
-------------------------------------------------- */
var general = function(input, _type, body, dataFunction, dataParameters, button) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    if (!_type) { _type = 1; }

    var _index = document.querySelectorAll(".ignition-modal");

    var fragment = document.createDocumentFragment();

    _div = document.createElement("div");
    _div.classList.add("ignition-modal-parent");

    _div.style.zIndex = _index.length+150;

    fragment.appendChild(_div);

    document.body.insertBefore(fragment, document.body.firstChild);

    React.renderComponent(new Modal({backdrop: true, children: new GeneralDialog({type: _type, body: body, dataFunction: dataFunction, dataParameters: dataParameters, button: button })}), _div);

};


/* Show Keyboard
-------------------------------------------------- */
var keyboard = function(input) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index = document.querySelectorAll(".ui-window");

    var div = document.createElement("div");
    div.classList.add("ignition-modal-parent", "ignition-keyboard", "ui-window");
    div.style.zIndex = _index.length+150;

    document.body.insertBefore(div, document.body.firstChild);

    var activeInputs = document.querySelectorAll(".activeInput")[0];

    if (activeInputs) {
        activeInputs.classList.remove("activeInput");
    }

    input.classList.add("activeInput");

    // FIX ME: take styles from ignition modal, remov class name
    React.renderComponent(new Modal({backdrop: false, classList: "container ignition-modal systemNotificationContent keyboard-modal"}, new Keyboard({input: input.type, value:input.value, type:"alpha", tabIndex: 0})), div);

};

/* Show Notification outside of Wrapper
-------------------------------------------------- */
var friendNotification = function(friendObj) {

    if (friendObj) friendObj = JSON.parse(friendObj);

    var _index = document.querySelectorAll(".ignition-modal-");

    var div = document.createElement("div");
    div.classList.add("ignition-modal-parent");
    div.classList.add("ui-window");
    div.style.zIndex = _index.length+250;

    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(new Modal({backdrop: false, classList: "container ignition-modal ignition-modal-friendNotification systemNotificationContent"}, new FriendNotification({friend: friendObj})), div);

};

/* Show Notification outside of Wrapper
-------------------------------------------------- */
var uiNotification = function(achievementObj) {

    if (achievementObj) achievementObj = JSON.parse(achievementObj);

    var _index = document.querySelectorAll(".ignition-modal-");

    var div = document.createElement("div");
    div.classList.add("ignition-modal-parent");
    div.classList.add("ui-window");
    div.style.zIndex = _index.length+250;

    document.body.insertBefore(div, document.getElementById("ui-notifications"));

    React.renderComponent(new Modal({backdrop: false, classList: "container ignition-modal ignition-modal-achievement systemNotificationContent"}, new AchievementUnlocked({achievement: achievementObj})), div);

};

/*  User Space (Sidebars, usually shown during gameplay)
-------------------------------------------------- */
var userSpace = function() {

    var div = document.createElement("div");
    div.classList.add("user-space-left", "ui-window");
    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(new UserSpace({}), div);

};

/*  User Space Right (Right Menu Sidebar, usually shown during gameplay)
-------------------------------------------------- */
var userSpaceRight = function() {

    var div = document.createElement("div");
    div.classList.add("user-space-right", "ui-window");

    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(new UserSpaceRight({}), div);

};

/* Exports
-------------------------------------------------- */
exports.keyboard            = keyboard;
exports.general             = general;
exports.friendNotification  = friendNotification;
exports.uiNotification      = uiNotification;
exports.userSpace           = userSpace;
exports.userSpaceRight      = userSpaceRight;
exports.Dialog              = Dialog;
exports.Notification        = Notification;
