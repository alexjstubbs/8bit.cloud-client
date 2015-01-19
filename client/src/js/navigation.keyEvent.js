/* Translates Gamepad button events into keyboard events
-------------------------------------------------- */

module.exports = function(k) {

    var eventObj = document.createEventObject ?
    document.createEventObject() : document.createEvent("Events");

    if(eventObj.initEvent){
        eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = k;
    eventObj.which = k;

    document.dispatchEvent ? document.dispatchEvent(eventObj) : document.fireEvent("onkeydown", eventObj);

    // Below is for Pi's old version of Chromium (not ignitions custom compiled version).
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
