/* Dialogs and Modals interface
-------------------------------------------------- */

var systemNotify    = require('./notification.init.js')
,   api             = require('socket.io-client')('/api')
,   React           = require('react/addons')
,   Modal           = require('../interface/Modal.jsx')
,   Messages        = require('../interface/Messages.jsx')
,   SignUp          = require('../interface/forms/SignUp.jsx')
,   _               = require('lodash')
,   navigationInit  = require("./navigation.init.js");


/* Show Modal
-------------------------------------------------- */
var show = function(title, content) {
    React.renderComponent(Modal({children: SignUp(null)}), document.getElementById("appendices"));
}

/* Exports
-------------------------------------------------- */
exports.show = show;

