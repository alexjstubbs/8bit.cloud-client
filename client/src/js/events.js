/* Custom Events
-------------------------------------------------- */
var api     = require('socket.io-client')('/api');

/* Legacy Screen Transition
-------------------------------------------------- */
var renderScreenComponents = function(screen) {


    var event = new CustomEvent('renderScreenComponents', {
        'detail': {
            screen: screen
        }
    });

    window.dispatchEvent(event);

};

/* Legacy Screen Transition
-------------------------------------------------- */
var screenTransition = function(screen, hidden, parent) {


    var event = new CustomEvent('screenTransition', {
        'detail': {
            screen: screen,
            hidden: hidden,
            parent: parent

        }
    });

    window.dispatchEvent(event);

};

/* Change view of screen (render child)
-------------------------------------------------- */
var changeView = function(view) {

	var event = new CustomEvent('changeView', {
	    'detail': {
	        view: view
	    }
	});

	window.dispatchEvent(event);

}

/* Dialogs (circular hack)
-------------------------------------------------- */
var dialog = function(input, action) {

    var event = new CustomEvent('dialog', {
        'detail': {
            input: input,
            action: action
        }
    });

    window.dispatchEvent(event);

};

/* UI Action Notification
-------------------------------------------------- */
var uiActionNotification = function(action) {

    var event = new CustomEvent('uiActionNotification', {
        'detail': {
            action: action
        }
    });

    window.dispatchEvent(event);

};

/* Server Response
-------------------------------------------------- */
var serverResponse = function(response) {

	var event = new CustomEvent('serverResponse', {
        'detail': {
            response: response
        }
    });

    window.dispatchEvent(event);
}

/* Update Game
-------------------------------------------------- */
var updateGame = function(results, filepath, callback) {
    if (results[0]) {


    api.emit('request', { request: 'crc32', param: filepath });

       var event = new CustomEvent('updateGame', {
            'detail': {
                title: results[0].title,
                description: results[0].description,
                rating: results[0].rating,
                ersb_rating: results[0].rating,
                genre: results[0].genre,
                id: results[0].id,
                developer: results[0].developer,
                image: "http://127.0.0.1:1210/games/"+results[0].system+"/"+results[0].title,
                filepath: filepath
            }
        });
    }
    window.dispatchEvent(event);

}

/* Exports
-------------------------------------------------- */
exports.renderScreenComponents  = renderScreenComponents;
exports.screenTransition 		= screenTransition;
exports.dialog 			 		= dialog;
exports.updateGame 		 		= updateGame;
exports.changeView 		 		= changeView;
exports.uiActionNotification 	= uiActionNotification;
