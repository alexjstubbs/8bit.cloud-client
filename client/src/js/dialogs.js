/* Dialogs and Modals interface
-------------------------------------------------- */

var systemNotify    = require('./notification.init.js')
,   api             = require('socket.io-client')('/api')
,   React           = require('react/addons')
,   Modal           = require('../interface/Modal.jsx')
,   Messages        = require('../interface/Messages.jsx')
,   Popup           = require('../interface/Popup.jsx')
,   SignUp          = require('../interface/forms/SignUp.jsx')
,   AddFriend       = require('../interface/forms/AddFriend.jsx')
,   _               = require('lodash')
,   navigationInit  = require("./navigation.init.js")
,   Keyboard        = require("../interface/OnScreenKeyboard.jsx")
,   GeneralDialog   = require("../interface/GeneralDialog.jsx");

var _div;

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
var show = function(parent) {

     // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index = document.querySelectorAll(".ignition-modal");

    var fragment = document.createDocumentFragment();

    _div = document.createElement("div");
    _div.classList.add("ignition-modal");

    _div.style.zIndex = _index.length+150;

    fragment.appendChild(_div);

    document.body.insertBefore(fragment, document.body.firstChild);

    // document.body.appendChild(fragment);

    console.log(parent);

    // TODO: Use another method.
    switch(parent) {
        case "SignUp":
            Child = SignUp({});
            break;
        case "AddFriend":
            Child = AddFriend({});
            break;
        default: Child = AddFriend({});
    }

    React.renderComponent(Modal({}, Child), _div);
}

/* Close Modal
-------------------------------------------------- */
var close = function(modal, callback) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "");

     var main = document.getElementById("main");
     main.classList.remove("opacity-50");

    if (!modal) {

        var modal = document.querySelectorAll(".ignition-modal");

        modal = _.first(modal);

    }

    modal.parentNode.removeChild(modal);

    navigationInit.navigationInit();

    if (callback || typeof callback === "function") {
        callback();
    }

}


/* Show Keyboard
-------------------------------------------------- */
var keyboard = function(input, callback) {

    // Pase screen switching in background
    sessionStorage.setItem("navigationState", "pause");

    var _index = document.querySelectorAll(".ignition-modal");

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-keyboard");
    div.style.zIndex = _index.length+150;

    document.body.insertBefore(div,  document.body.firstChild);

    var activeInputs = document.querySelectorAll(".activeInput")[0];

    if (activeInputs) {
        activeInputs.classList.remove("activeInput");
    }

    input.classList.add("activeInput");

    React.renderComponent(Modal({backdrop: true}, Keyboard({input: input.type, value:input.value, type:"alpha", tabIndex: 0})), div);

}

/* Exports
-------------------------------------------------- */
exports.show                = show;
exports.close               = close;
exports.keyboard            = keyboard;
exports.popup               = popup;
exports.general             = general;
