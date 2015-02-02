/* Simple UI-Only Notifications
-------------------------------------------------- */

var React           = require('react/addons'),
	UINotification 	= require('../interface/UINotification.jsx');

/* Blocked UI Action
-------------------------------------------------- */
var blocked = function() {

	var fragment 	= document.createDocumentFragment(),
    	div 		= document.createElement("div");

    fragment.appendChild(div);

    document.body.insertBefore(fragment, document.body.firstChild);

	React.renderComponent(UINotification({icon: "ion-close-circled", effect: "fadeInOut"}), div);
};

/*  Loading UI Action
-------------------------------------------------- */
var loading = function() {

	var fragment = document.createDocumentFragment(),
		div 	 = document.createElement("div");

	fragment.appendChild(div);

	document.body.insertBefore(fragment, document.body.firstChild);

	React.renderComponent(UINotification({ classes: "ui-alert-alt", icon: "fa fa-spin ion-ios-loop-strong", effect: "no-fffect"}), div);
};

/* Exports
-------------------------------------------------- */
exports.blocked = blocked;
exports.loading = loading;
