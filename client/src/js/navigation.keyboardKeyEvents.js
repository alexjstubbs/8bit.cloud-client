/* On Screen Keyboard translations
-------------------------------------------------- */
var events = require("./events");

var keypress = function(parameters) {

 var upper, 
        keys 			= document.getElementsByClassName("_key"),
        activeInput 	= document.getElementById("keyboard-input-area"),
        recentInput 	= document.getElementsByClassName("activeInput")[0],
        _value 			= activeInput.value,
        type 			= document.querySelectorAll("[data-inputtype]")[0].getAttribute("data-inputtype"),
        kbType 			= document.querySelectorAll("[data-keyboardtype]")[0].getAttribute("data-keyboardtype"),
        cursor 			= document.querySelectorAll(".cursor");

    
    // Key is Uppercase
    if (document.getElementsByClassName("uppercase")[0]) {
        upper = true;
    }

    // Shift is active: unactivate
    if (document.getElementsByClassName("temp-uppercase")[0]) {

        _(keys).forEach(function(key, i) {
            key.classList.toggle("uppercase");
            key.classList.toggle("temp-uppercase");
        });
    }


    // Switch for keypress 
    switch (parameters) {

	// Symbols
	case "<i class='ion-code-working'></i>":

		if (kbType == 'alpha') {
			var event = new CustomEvent('updateKeyboard', { 
			    'detail': {
			        type: "symbols",
			    }
			});
		}

		else {
			var event = new CustomEvent('updateKeyboard', { 
			    'detail': {
			        type: "alpha",
			    }
			});
		}

		window.dispatchEvent(event);

		return;

    // Cursor Left
    case "<i class='ion-arrow-left-b opacity-20'></i>":

        
    	// = 8 or 9 ???
        // console.log(cursor[0].offsetLeft);
        // console.log(cursor[0].style.left);
        
        // activeInput.innerHTML = activeInput.innerHTML.slice(0,-1);

        // console.log(cursor[0].offsetLeft);
        // cursor[0].style.left = cursor[0].offsetLeft;


		// if (cursor[0].offsetLeft != 28) {

		// 		cursor[0].style.left = 7 + "px";
		// }

        return;

    // Cursor Right
    case "<i class='ion-arrow-right-b opacity-20'></i>":

        console.log(cursor[0].offsetLeft);
        
        if (cursor[0].offsetRight != 0) {
	        cursor[0].style.left = cursor[0].offsetLeft - 7 + "px";
        }

        return;
    
    // Accept
    case "<i class='ion-checkmark'></i>":
        // dialog.close();
        events.dialog(null, "close");
    return;

    // Space
    case "__":
        activeInput.innerHTML += " ";

        cursor[0].scrollIntoView(true);
        recentInput.scrollTop = cursor[0].offsetTop;

        return;

    // @
    case "<i class='ion-at'></i>": 
        activeInput.innerHTML += "@";

        cursor[0].scrollIntoView(true);
        recentInput.scrollTop = cursor[0].offsetTop;
        return; 

    // Return
    case "<i class='ion-arrow-return-left'></i>":

    	if (type != 'text') { 
			activeInput.innerHTML +="<br />";
			recentInput.value = activeInput.innerHTML.replace(/<br>/g, '\r\n');

            cursor[0].scrollIntoView(true);
            recentInput.scrollTop = cursor[0].offsetTop;
        }

        return;

    // Delete
    case "<i class='ion-arrow-left-a'></i>":
        activeInput.innerHTML = activeInput.innerHTML.slice(0,-1);
        recentInput.value = activeInput.innerHTML;

        return;

    // Caps 
    case "<i class='ion-arrow-up-a'></i>":
        
        _(keys).forEach(function(key, i) { 
            key.classList.toggle("uppercase");
        });

        return;

    // Shift (Temp Caps)
    case "<i class='ion-ios7-arrow-thin-up'></i>": {
        
        _(keys).forEach(function(key, i) { 
            key.classList.toggle("uppercase");
            key.classList.toggle("temp-uppercase");
        });

        return;
    }

    // Letter / Alpha
    default:
        
        if (upper) { 
            parameters = parameters.toUpperCase(); 
            upper = false;
        }
        
        activeInput.innerHTML +=parameters;
        recentInput.value = activeInput.innerHTML.replace(/<br>/g, '\r\n');

        cursor[0].scrollIntoView(true);
        recentInput.scrollTop = cursor[0].offsetTop;
    }
}

/* Exports
-------------------------------------------------- */

exports.keypress = keypress;