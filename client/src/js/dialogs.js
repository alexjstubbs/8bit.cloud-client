/* Dialogs and Modals interface
-------------------------------------------------- */

var systemNotify    = require('./notification.init.js')
,   api             = require('socket.io-client')('/api')
,   React           = require('react/addons')
,   Modal           = require('../interface/Modal.jsx')
,   Messages        = require('../interface/Messages.jsx')
,   Popup           = require('../interface/Popup.jsx')
,   SignUp          = require('../interface/forms/SignUp.jsx')
,   _               = require('lodash')
,   navigationInit  = require("./navigation.init.js")
,   Keyboard        = require("../interface/OnScreenKeyboard.jsx");

var _div;

/* General Message Dialog
-------------------------------------------------- */
var popup = function(obj, callback) {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-popup");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: SignUp(null)}), div);
}

/* Show Modal
-------------------------------------------------- */
var show = function(title, content) {

    _div = document.createElement("div"); // Garbage Collection isn't optimized on Webkit. Please fix me. Slow on Pi
    _div.classList.add("ignition-modal");
    document.body.appendChild(_div);

    React.renderComponent(Modal({children: SignUp(null)}), _div);
}

/* Close Modal
-------------------------------------------------- */
var close = function(modal, callback) {

    if (!modal) {
    
        var modal = document.querySelectorAll(".ignition-modal");

        console.log(modal.length);
        modal = modal[2];
    
    }

    document.body.removeChild(modal);
    
    navigationInit.navigationInit();

    if (callback) {
        callback();
    }

}


/* Show Keyboard
-------------------------------------------------- */
var keyboard = function(input, callback) {

    console.log(input);

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-keyboard");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: Keyboard(null)}), div);
    
    var activeInputs = document.querySelectorAll(".activeInput")[0];
    
    if (activeInputs) {
        activeInputs.classList.remove("activeInput");
    }

    input.classList.add("activeInput");

}

/* Exports
-------------------------------------------------- */
exports.show = show;
exports.close = close;
exports.keyboard = keyboard;
exports.popup = popup;

