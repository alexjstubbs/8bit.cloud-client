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
var show = function(title, content, callback) {

    var div = document.createElement("div");
    div.classList.add("ignition-modal");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: SignUp(null)}), div);
}

/* Close Modal
-------------------------------------------------- */
var close = function(modal, callback) {

    if (!modal) {
        var modal = document.querySelectorAll(".ignition-modal");
        console.log(modal);


        console.log(modal.length);
        modal = modal[2];
        
    }


    document.body.removeChild(modal);
    
    navigationInit.navigationInit();

    callback();

}


/* Show Keyboard
-------------------------------------------------- */
var keyboard = function(input, callback) {

    var div = document.createElement("div");
    div.classList.add("ignition-modal", "ignition-keyboard");
    document.body.appendChild(div);

    React.renderComponent(Modal({children: Keyboard(null)}), div);
    
    var activeInputs = document.querySelectorAll(".activeInput")[0];
    activeInputs.classList.remove("activeInput");
    input.classList.add("activeInput");
}

/* Exports
-------------------------------------------------- */
exports.show = show;
exports.close = close;
exports.keyboard = keyboard;
exports.popup = popup;

