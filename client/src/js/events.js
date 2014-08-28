/* Custom Events
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


exports.screenTransition = screenTransition;
