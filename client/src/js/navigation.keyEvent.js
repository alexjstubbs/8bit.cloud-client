/* Translates Gamepad button events into keyboard events
-------------------------------------------------- */

module.exports = function(k) {

    var eventObj = document.createEventObject ?
    document.createEventObject() : document.createEvent("Events");

    if (eventObj.initEvent){
        eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = k;
    eventObj.which = k;

    document.dispatchEvent ? document.dispatchEvent(eventObj) : document.fireEvent("onkeydown", eventObj);

};
