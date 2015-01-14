/* Dialogs and Modals interface
-------------------------------------------------- */

var systemNotify            = require('./notification.init.js')
,   api                     = require('socket.io-client')('/api')
,   events                  = require('./events.js')
,   React                   = require('react/addons')
,   Modal                   = require('../interface/Modal.jsx')
,   Message                 = require('../interface/Message.jsx')
,   Messages                = require('../interface/Messages.jsx')
,   Friends                 = require('../interface/Friends.jsx')
,   Friend                  = require('../interface/Friend.jsx')
,   AchievementUnlocked     = require('../interface/AchievementUnlocked.jsx')
,   FriendLarge             = require('../interface/FriendLarge.jsx')
,   Popup                   = require('../interface/Popup.jsx')
,   Prompt                  = require('../interface/Prompt.jsx')
,   Terminal                = require('../interface/Terminal.jsx')
,   WebBrowser              = require('../interface/WebBrowser.jsx')
,   SignUp                  = require('../interface/forms/SignUp.jsx')
,   AddFriend               = require('../interface/forms/AddFriend.jsx')
,   PassMessage             = require('../interface/forms/PassMessage.jsx')
,   CommunityInfo           = require('../interface/CommunityInfo.jsx')
,   navigationInit          = require("./navigation.init.js")
,   Keyboard                = require("../interface/OnScreenKeyboard.jsx")
,   GeneralDialog           = require("../interface/GeneralDialog.jsx")
,   _                       = require('lodash');

var _div;


/* Prompt Dialog
-------------------------------------------------- */
var prompt = function(callback) {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-popup");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: Prompt(null)}), div);

}

/* General Message Dialog
-------------------------------------------------- */
var popup = function(obj, callback) {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-popup");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: SignUp(null)}), div);
}

/* Show General/Error Modal
-------------------------------------------------- */
var general = function(input, _type, body, dataFunction, dataParameters, button) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    if (!_type) { _type = 1 }

    var _index = document.querySelectorAll(".ignition-modal");

    var fragment = document.createDocumentFragment();

    _div = document.createElement("div");
    _div.classList.add("ignition-modal");

    _div.style.zIndex = _index.length+150;

    fragment.appendChild(_div);

    document.body.insertBefore(fragment, document.body.firstChild);

    React.renderComponent(Modal({backdrop: true, children: GeneralDialog({type: _type, body: body, dataFunction: dataFunction, dataParameters: dataParameters, button: button })}), _div);

}

/* Show Content Modal
-------------------------------------------------- */
var show = function(parent, parameters, arg) {

     // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index      = document.querySelectorAll(".ignition-modal"),
        fragment    = document.createDocumentFragment(),
        properties  = {}

    _div = document.createElement("div");
    _div.classList.add("ignition-modal-parent");

    _notification = document.createElement("div");
    _notification.classList.add("ignition-modal-notification");
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
        default: Child = AddFriend({});
    }


    React.renderComponent(Modal(properties, Child), _div);

}

/* Close Modal
-------------------------------------------------- */
var close = function(modal, callback, exception) {

    // UnPause screen switching in background
    sessionStorage.setItem("navigationState", "");

     var opacits = document.querySelectorAll(".opacity-50");
     var opacits_ = document.querySelectorAll(".opacity-0");

     _(opacits).forEach(function(el) {
            el.classList.remove("opacity-50");
     });


     if (_.first(opacits_)) {
         _.first(opacits_).classList.remove("opacity-0");
     }

    // if (!modal) {
    //
    //     var modal = document.querySelectorAll(".ignition-modal");
    //
    //     modal = _.first(modal);
    //
    // }

    var modal = document.querySelectorAll(".ignition-modal-parent");

    // Re-render dashboard
    if (modal.length == 1) {

        events.renderScreenComponents("Dashboard");

    }

    modal = _.first(modal);

    modal.parentNode.removeChild(modal);

    if (!exception) {
        navigationInit.navigationInit();
    }

    if (callback || typeof callback === "function") {
        callback();
    }

}


/* Show Keyboard
-------------------------------------------------- */
var keyboard = function(input, callback) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index = document.querySelectorAll(".ignition-modal-");

    var div = document.createElement("div");
    div.classList.add("ignition-modal-parent", "ignition-keyboard");
    div.style.zIndex = _index.length+150;

    document.body.insertBefore(div,  document.body.firstChild);

    var activeInputs = document.querySelectorAll(".activeInput")[0];

    if (activeInputs) {
        activeInputs.classList.remove("activeInput");
    }

    input.classList.add("activeInput");

    // FIX ME: take styles from ignition modal, remov class name
    React.renderComponent(Modal({backdrop: true, classList: "container ignition-modal systemNotificationContent keyboard-modal"}, Keyboard({input: input.type, value:input.value, type:"alpha", tabIndex: 0})), div);

}

/* Show Keyboard
-------------------------------------------------- */
var uiNotification = function(input, callback) {

    var _index = document.querySelectorAll(".ignition-modal-");

    var div = document.createElement("div");
    div.classList.add("ignition-modal-parent");
    div.style.zIndex = _index.length+150;

    document.body.insertBefore(div,  document.getElementById("ui-notifications"));

    React.renderComponent(Modal({backdrop: false, classList: "container ignition-modal ignition-modal-achievement systemNotificationContent"}, AchievementUnlocked({message: "lorem"})), div);

}

/* Exports
-------------------------------------------------- */
exports.prompt              = prompt;
exports.show                = show;
exports.close               = close;
exports.keyboard            = keyboard;
exports.popup               = popup;
exports.general             = general;
exports.uiNotification      = uiNotification;
