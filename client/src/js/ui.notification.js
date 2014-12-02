/* Simple UI-Only Notifications
-------------------------------------------------- */

var React           = require('react/addons')
,	UINotification 	= require('../interface/UINotification.jsx');

/* Blocked UI Action
-------------------------------------------------- */
var blocked = function() {

	var fragment = document.createDocumentFragment();
    div = document.createElement("div");
    fragment.appendChild(div);

    document.body.insertBefore(fragment, document.body.firstChild);

	React.renderComponent(UINotification({}), div);
}

/* Exports
-------------------------------------------------- */
exports.blocked = blocked;