/* Translates Gamepad button events into keyboard events (chromium renderer workaround)
-------------------------------------------------- */

module.exports = function(k) {


    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


    keyboardEvent[initMethod](
        "keydown", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        k, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    
    document.dispatchEvent(keyboardEvent);


    //
    // Podium = {};
    //
    // Podium.keydown = function(k) {
    //     var oEvent = document.createEvent('KeyboardEvent');
    //
    //     // Chromium Hack.. DOES NOT WORK IN WEBKIT (qtbrowser).
    //     Object.defineProperty(oEvent, 'keyCode', {
    //                 get : function() {
    //                     return this.keyCodeVal;
    //                 }
    //     });
    //     Object.defineProperty(oEvent, 'which', {
    //                 get : function() {
    //                     return this.keyCodeVal;
    //                 }
    //     });
    //
    //     if (oEvent.initKeyboardEvent) {
    //         oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    //     } else {
    //         oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    //     }
    //
    //     oEvent.keyCodeVal = k;
    //
    //     if (oEvent.keyCode !== k) {
    //         alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    //     }
    //
    //     document.dispatchEvent(oEvent);
    //
    // }
    //     Podium.keydown(k);

};
