/* Dialogs and Modals interface
-------------------------------------------------- */

var events                  = require('./events.js'),
    React                   = require('react/addons'),
    Modal                   = require('../interface/Modal.jsx'),
    Message                 = require('../interface/Message.jsx'),
    Messages                = require('../interface/Messages.jsx'),
    Friends                 = require('../interface/Friends.jsx'),
    SoftwareOptions         = require('../interface/SoftwareOptions.jsx'),
    AchievementUnlocked     = require('../interface/AchievementUnlocked.jsx'),
    FriendLarge             = require('../interface/FriendLarge.jsx'),
    Prompt                  = require('../interface/Prompt.jsx'),
    Terminal                = require('../interface/Terminal.jsx'),
    WebBrowser              = require('../interface/WebBrowser.jsx'),
    SignUp                  = require('../interface/forms/SignUp.jsx'),
    LogIn                   = require('../interface/forms/LogIn.jsx'),
    SignUpSync              = require('../interface/SignUpSync.jsx'),
    AddFriend               = require('../interface/forms/AddFriend.jsx'),
    PassMessage             = require('../interface/forms/PassMessage.jsx'),
    CommunityInfo           = require('../interface/CommunityInfo.jsx'),
    navigationInit          = require("./navigation.init.js"),
    Keyboard                = require("../interface/OnScreenKeyboard.jsx"),
    GeneralDialog           = require("../interface/GeneralDialog.jsx"),
    UserSpace               = require("../interface/UserSpace.jsx"),
    UserSpaceRight          = require("../interface/UserSpaceRight.jsx"),
    _                       = require('lodash');

    var _div;


/*  Close all Dialogs
-------------------------------------------------- */
var closeAll = function(callback) {

        var allDialogs = document.querySelectorAll(".ui-window");
        _(allDialogs).forEach(function(el) { el.remove(); }).value();

        callback();
};

/* Prompt Dialog
-------------------------------------------------- */
var prompt = function() {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-popup");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: Prompt(null)}), div);

};

/* General Message Dialog
-------------------------------------------------- */
var popup = function() {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-popup");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: SignUp(null)}), div);
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

    React.renderComponent(Modal({backdrop: true, children: GeneralDialog({type: _type, body: body, dataFunction: dataFunction, dataParameters: dataParameters, button: button })}), _div);

};

/* Show Content Modal
-------------------------------------------------- */
var show = function(parent, parameters, arg) {

    var Child;

     // Pause screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index      = document.querySelectorAll(".ignition-modal"),
        fragment    = document.createDocumentFragment(),
        properties  = {};

        // var lastWindow = _.last(_index);
        // if (lastWindow) { lastWindow.classList.add("opacity-50") }

    _div = document.createElement("div");
    _div.classList.add("ignition-modal-parent");

    _notification = document.createElement("div");
    _notification.classList.add("ignition-modal-notification", "ui-window");
    fragment.appendChild(_notification);

    _div.style.zIndex = _index.length+150;

    fragment.appendChild(_div);

    document.body.insertBefore(fragment, document.body.firstChild);

    // TODO: Use another method.
    switch(parent) {
        case "WebBrowser":
            properties = {backdrop: true};
            Child = WebBrowser({url: parameters});
            break;
        case "Terminal":
            properties = {backdrop: true};
            Child = Terminal();
            break;
        case "Prompt":
            properties = {backdrop: true};
            Child = Prompt({message: arg.message, agree: arg.agree, disagree: arg.disagree, parameters: arg.parameters});
            break;
        case "SignUp":
            Child = SignUp({});
            break;
        case "LogIn":
            Child = LogIn({});
            break;
        case "SignUpSync":
            Child = SignUpSync({});
            break;
        case "Friends":
            Child = Friends({});
            break;
        case "FriendLarge":
            Child = FriendLarge({friend: parameters});
            break;
        case "AddFriend":
            Child = AddFriend({});
            break;
        case "PassMessage":
            properties = {backdrop: true};
            Child = PassMessage({To: parameters});
            break;
        case "SoftwareOptions":
            properties = {backdrop: true};
            Child = SoftwareOptions({payload: parameters });
            break;
        case "Messages":
            Child = Messages({});
            break;
        case "Message":
            properties = {backdrop: true};
            Child = Message({message: parameters});
            break;
        case "Community":
            properties = {backdrop: true};
            properties = {classList: "container ignition-modal systemNotificationContent community-modal"};
            Child = CommunityInfo({});
            break;
        default:
            Child = AddFriend({});
            break;
    }


    React.renderComponent(Modal(properties, Child), _div);

    _div.classList.add("animateUp");

};

/* Close Modal
-------------------------------------------------- */
var close = function(modal, callback, exception) {

    var container = document.getElementById("main");

    // UnPause screen switching in background
    sessionStorage.setItem("navigationState", "");


    // Rpi1 runs out of memory:
    //  var opacits = document.querySelectorAll(".opacity-50");
    //  var opacits_ = document.querySelectorAll(".opacity-0");
     //
    //  _(opacits).forEach(function(el) {
    //         el.classList.remove("opacity-50");
    //  }).value();
     //
     //
    //  if (_.first(opacits_)) {
    //      _.first(opacits_).classList.remove("opacity-0");
    //  }

    var _index      = document.querySelectorAll(".ignition-modal");

    // var lastWindow = _.last(_index);
    // if (lastWindow) { lastWindow.classList.remove("opacity-50") }
    //
    // console.log(lastWindow);

    modal = document.querySelectorAll(".ignition-modal-parent")[0];

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
    React.renderComponent(Modal({backdrop: false, classList: "container ignition-modal systemNotificationContent keyboard-modal"}, Keyboard({input: input.type, value:input.value, type:"alpha", tabIndex: 0})), div);

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

    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(Modal({backdrop: false, classList: "container ignition-modal ignition-modal-achievement systemNotificationContent"}, AchievementUnlocked({achievement: achievementObj})), div);

};

/*  User Space (Sidebars, usually shown during gameplay)
-------------------------------------------------- */
var userSpace = function() {


    var div = document.createElement("div");
    div.classList.add("user-space-left", "ui-window");
    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(UserSpace({}), div);

};

/*  User Space Right (Right Menu Sidebar, usually shown during gameplay)
-------------------------------------------------- */
var userSpaceRight = function() {

    var div = document.createElement("div");
    div.classList.add("user-space-right", "ui-window");

    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(UserSpaceRight({}), div);

};

/* Exports
-------------------------------------------------- */
exports.closeAll            = closeAll;
exports.prompt              = prompt;
exports.show                = show;
exports.close               = close;
exports.keyboard            = keyboard;
exports.popup               = popup;
exports.general             = general;
exports.uiNotification      = uiNotification;
exports.userSpace           = userSpace;
exports.userSpaceRight      = userSpaceRight;
