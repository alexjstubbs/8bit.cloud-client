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

var updateGame = function(results, callback) {

   var event = new CustomEvent('updateGame', { 
        'detail': {
            title: results[0].title,
            description: results[0].description,
            rating: results[0].rating,
            ersb_rating: results[0].rating,
            genre: results[0].genre,
            id: results[0].id,
            developer: results[0].developer
        }
    });
  
    window.dispatchEvent(event);

}


exports.screenTransition = screenTransition;
exports.updateGame = updateGame;
